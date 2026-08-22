// 百年中环 - 应用主逻辑
class App {
  constructor() {
    this.currentView = null;
    this.currentSite = null;
    this.viewer = null;
    this.bgm = null;
    this.bgmPlaying = true;
    this.audio = null;
    this.isTransitioning = false;
    
    this.views = {
      home: document.getElementById('view-home'),
      detail: null
    };
    
    this.init();
  }

  init() {
    // 初始化多语言（幂等，i18n.js 已自动初始化过则跳过）
    if (window.I18N) window.I18N.init();

    // this.initMapMarkers(); // 暂时移除热感应点
    this.initBuildingHotspots();
    this.initRouting();
    this.initBackButton();
    this.initBGM();
    this.initAboutModal();
    this.initGuideTip();
    this.initLoadingScreen();
    this.initSplashScreen();
    this.initPopup();
    this.initMapScrollZoom();
  }

  // ========== 初始加载画面 ==========
  initLoadingScreen() {
    // 预加载首页地图
    const mapImg = document.getElementById('map-image');
    if (mapImg && mapImg.complete) {
      this.hideLoading();
    } else {
      mapImg?.addEventListener('load', () => this.hideLoading());
      mapImg?.addEventListener('error', () => this.hideLoading());
    }
    
    // 超时强制隐藏
    setTimeout(() => this.hideLoading(), 3000);
  }

  hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
      setTimeout(() => overlay.remove(), 500);
    }
  }

  // ========== 入场画面 ==========
  initSplashScreen() {
    const splash = document.getElementById('splash-screen');
    if (!splash) return;

    splash.addEventListener('click', () => {
      splash.classList.add('fade-out');
      setTimeout(() => splash.remove(), 800);
    });
  }

  // ========== 移动端地图滚动 + 双指缩放 ==========
  initMapScrollZoom() {
    const scrollView = document.getElementById('map-scroll-view');
    const mapContainer = document.getElementById('map-container');
    if (!scrollView || !mapContainer) return;

    // --- 滚动提示 ---
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      this.showMapScrollHint();
    }

    // --- 双指缩放 ---
    let scale = 1;
    let lastDist = 0;
    let isPinching = false;
    const MIN_SCALE = 0.5;
    const MAX_SCALE = 2.5;

    const getTouchDist = (touches) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.hypot(dx, dy);
    };

    let zoomPauseTimer = null;
    const applyTransform = () => {
      mapContainer.style.transform = `scale(${scale})`;
      // 缩放期间暂停 SVG 光晕/标签动画，降低滤镜重算开销
      mapContainer.classList.add('zooming');
      clearTimeout(zoomPauseTimer);
      zoomPauseTimer = setTimeout(() => mapContainer.classList.remove('zooming'), 350);
    };

    scrollView.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        isPinching = true;
        lastDist = getTouchDist(e.touches);
        e.preventDefault();
      }
    }, { passive: false });

    scrollView.addEventListener('touchmove', (e) => {
      if (!isPinching || e.touches.length !== 2) return;

      const dist = getTouchDist(e.touches);
      if (lastDist > 0) {
        scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale * (dist / lastDist)));
        applyTransform();
      }
      lastDist = dist;
      e.preventDefault();
    }, { passive: false });

    const endPinch = () => {
      isPinching = false;
      lastDist = 0;
    };

    scrollView.addEventListener('touchend', endPinch);
    scrollView.addEventListener('touchcancel', endPinch);

    // --- 鼠标滚轮缩放（桌面端 debug） ---
    scrollView.addEventListener('wheel', (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.92 : 1.08;
        scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale * delta));
        applyTransform();
      }
    }, { passive: false });
  }

  showMapScrollHint() {
    const existing = document.querySelector('.map-scroll-hint');
    if (existing) return;

    const hint = document.createElement('div');
    hint.className = 'map-scroll-hint';
    hint.textContent = window.I18N ? I18N.t('drag-hint') : '← 拖动地图 · 双指缩放 →';
    const mapView = document.querySelector('.map-view');
    if (mapView) {
      mapView.appendChild(hint);
      setTimeout(() => hint.remove(), 3200);
    }
  }

  // ========== SVG 建筑热点点击 ==========
  initBuildingHotspots() {
    const hotspots = document.querySelectorAll('.building-hotspot');
    hotspots.forEach(hotspot => {
      hotspot.addEventListener('click', () => {
        const siteId = parseInt(hotspot.dataset.site);
        if (!isNaN(siteId)) {
          this.navigateToSite(siteId);

          // 隐藏引导提示
          const guideTip = document.getElementById('guide-tip');
          if (guideTip) guideTip.classList.add('hidden');
        }
      });
    });
  }

  // ========== 地图标记 ==========
  initMapMarkers() {
    const container = document.getElementById('map-markers');
    if (!container) return;

    SITES.forEach((site, index) => {
      const marker = document.createElement('div');
      marker.className = 'map-marker';
      marker.style.left = site.mapX + '%';
      marker.style.top = site.mapY + '%';
      marker.innerHTML = `
        <div class="marker-ring" style="animation-delay:${index * 0.3}s"></div>
        <div class="marker-dot"></div>
        <div class="marker-label">${site.name}</div>
      `;
      
      marker.addEventListener('click', () => this.navigateToSite(index));
      container.appendChild(marker);
    });
  }

  // ========== 路由 ==========
  initRouting() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }

  handleRoute() {
    const hash = window.location.hash || '#home';
    if (hash === '#home') {
      this.showHome();
    } else if (hash.startsWith('#detail-')) {
      const siteId = parseInt(hash.replace('#detail-', ''));
      if (!isNaN(siteId) && siteId >= 0 && siteId < SITES.length) {
        this.showDetail(siteId);
      } else {
        this.navigateToHome();
      }
    } else {
      this.navigateToHome();
    }
  }

  navigateToSite(id) {
    if (this.isTransitioning) return;
    // 都爹利街煤气灯 (1) / 皇后像广场 (2) / 终审法院大楼 (3) / 中银大厦 (4) / 圣约翰座堂 (0) 使用弹出窗口
    if (id === 0 || id === 1 || id === 2 || id === 3 || id === 4) {
      this.showPopup(id);
      return;
    }
    window.location.hash = `detail-${id}`;
  }

  navigateToHome() {
    if (this.isTransitioning) return;
    window.location.hash = 'home';
  }

  // ========== 首页 ==========
  async showHome() {
    if (this.currentView === 'home') return;
    this.isTransitioning = true;

    // 清理详情页
    if (this.viewer) {
      this.viewer.dispose();
      this.viewer = null;
    }
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }

    const homeView = this.views.home;

    // 首页显示
    homeView.classList.remove('view-hidden');
    homeView.classList.add('view-visible');
    
    this.currentView = 'home';
    this.isTransitioning = false;
  }

  // ========== 详情页（待重构） ==========
  async showDetail(siteId) {
    // 自动回首页，详情页尚未重建
    this.navigateToHome();
  }

  // ========== 3D查看器 ==========
  initViewer(siteId) {
    const container = document.getElementById('model-container');
    const modelError = document.getElementById('model-error');
    const errorImg = document.getElementById('model-error-img');
    
    // 清理旧viewer
    if (this.viewer) {
      this.viewer.dispose();
      this.viewer = null;
    }

    // 显示容器，隐藏错误
    container.style.display = 'block';
    modelError.style.display = 'none';

    // 创建新viewer
    this.viewer = new ThreeViewer(container);
    this.viewer.init();

    const modelPath = `assets/models/site${siteId}.glb`;
    this.viewer.loadModel(modelPath)
      .catch(() => {
        // 加载失败，显示静态图
        if (this.viewer) {
          this.viewer.dispose();
          this.viewer = null;
        }
        container.style.display = 'none';
        modelError.style.display = 'flex';
        errorImg.src = `assets/images/site${siteId}.png`;
      });
  }

  // ========== 音频 ==========
  initAudio(siteId) {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }

    const playBtn = document.getElementById('audio-play-btn');
    const progressBar = document.getElementById('audio-progress-bar');
    const timeDisplay = document.getElementById('audio-time');

    // 重置UI
    playBtn.classList.remove('playing');
    playBtn.textContent = '▶';
    progressBar.style.width = '0%';
    timeDisplay.textContent = '';

    const audioPath = `assets/audios/site${siteId}.mp3`;
    
    this.audio = new Audio();
    this.audio.preload = 'none';
    this.audio.src = audioPath;

    // 事件
    const onPlay = () => {
      playBtn.classList.add('playing');
      playBtn.textContent = '⏸';
    };

    const onPause = () => {
      playBtn.classList.remove('playing');
      playBtn.textContent = '▶';
    };

    const onTimeUpdate = () => {
      if (this.audio && this.audio.duration) {
        const pct = (this.audio.currentTime / this.audio.duration) * 100;
        progressBar.style.width = pct + '%';
        
        const mins = Math.floor(this.audio.currentTime / 60);
        const secs = Math.floor(this.audio.currentTime % 60);
        timeDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
      }
    };

    const onEnded = () => {
      onPause();
      progressBar.style.width = '0%';
      timeDisplay.textContent = '';
    };

    const onError = () => {
      onPause();
      timeDisplay.textContent = window.I18N ? I18N.t('error-title') : '错误';
    };

    this.audio.addEventListener('play', onPlay);
    this.audio.addEventListener('pause', onPause);
    this.audio.addEventListener('timeupdate', onTimeUpdate);
    this.audio.addEventListener('ended', onEnded);
    this.audio.addEventListener('error', onError);

    // 播放按钮
    const togglePlay = () => {
      if (!this.audio) return;
      if (this.audio.paused) {
        this.audio.play().catch(() => {
          timeDisplay.textContent = window.I18N ? I18N.t('play-fail') : '无法播放';
        });
      } else {
        this.audio.pause();
      }
    };

    playBtn.onclick = togglePlay;

    // 进度条点击
    const progressContainer = document.getElementById('audio-progress');
    progressContainer.onclick = (e) => {
      if (!this.audio || !this.audio.duration) return;
      const rect = progressContainer.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      this.audio.currentTime = pct * this.audio.duration;
    };
  }

  // ========== 返回按钮 ==========
  initBackButton() {
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.navigateToHome();
      });
    }
  }

  // ========== BGM ==========
  initBGM() {
    const bgmToggle = document.getElementById('bgm-toggle');
    this.bgm = new Audio('assets/audios/bgm.mp3');
    this.bgm.loop = true;
    this.bgm.volume = 0.3;
    
    // 首次需要用户交互才能播放
    bgmToggle.addEventListener('click', () => {
      if (this.bgm.paused) {
        this.bgm.play().then(() => {
          this.bgmPlaying = true;
          bgmToggle.classList.remove('muted');
        }).catch(() => {});
      } else {
        this.bgm.pause();
        this.bgmPlaying = false;
        bgmToggle.classList.add('muted');
      }
    });

    // 用户首次点击页面时尝试自动播放BGM
    const autoPlay = () => {
      if (this.bgmPlaying && this.bgm.paused) {
        this.bgm.play().catch(() => {});
      }
      document.removeEventListener('click', autoPlay);
      document.removeEventListener('touchstart', autoPlay);
    };
    document.addEventListener('click', autoPlay);
    document.addEventListener('touchstart', autoPlay);
  }

  // ========== 关于弹窗 ==========
  initAboutModal() {
    const aboutBtn = document.getElementById('about-btn');
    const modal = document.getElementById('about-modal');
    const closeBtn = document.getElementById('about-close-btn');

    aboutBtn.addEventListener('click', () => {
      modal.classList.add('visible');
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('visible');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('visible');
      }
    });
  }

  // ========== 建筑弹出窗口 ==========
  initPopup() {
    this.popupOverlay = document.getElementById('popup-overlay');
    if (!this.popupOverlay) return;

    this.popupPanelIndex = 0;
    this.popupTotalPanels = 5;
    this.popupCurrentSite = null;
    this.popupViewer = null;
    this.popupTrack = document.getElementById('popup-slider-track');
    this.popupArrowLeft = document.getElementById('popup-arrow-left');
    this.popupArrowRight = document.getElementById('popup-arrow-right');
    this.popupDots = document.querySelectorAll('.popup-dot');

    // 模型路径映射
    this.popupModelPaths = {
      0: 'assets/models/sjc.glb',
      1: 'assets/models/duddell.glb',
      2: 'assets/models/sq.glb',
      3: 'assets/models/cfa.glb',
      4: 'assets/models/boc.glb'
    };
    
    // 关闭按钮
    const closeBtn = document.getElementById('popup-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hidePopup());
    }

    // 点击遮罩关闭
    this.popupOverlay.addEventListener('click', (e) => {
      if (e.target === this.popupOverlay) {
        this.hidePopup();
      }
    });

    // 左右箭头
    if (this.popupArrowLeft) {
      this.popupArrowLeft.addEventListener('click', () => this.navigatePopupPanel(-1));
    }
    if (this.popupArrowRight) {
      this.popupArrowRight.addEventListener('click', () => this.navigatePopupPanel(1));
    }

    // 指示点点击
    this.popupDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.dot);
        if (!isNaN(idx)) this.goToPopupPanel(idx);
      });
    });

    // 触摸滑动支持
    this.popupTouchStartX = 0;
    if (this.popupOverlay) {
      this.popupOverlay.addEventListener('touchstart', (e) => this.popupTouchStart(e));
      this.popupOverlay.addEventListener('touchend', (e) => this.popupTouchEnd(e));
    }

    // 音频播放
    this.popupAudio = document.getElementById('popup-audio');
    this.popupAudioBtn = document.getElementById('popup-audio-btn');
    this.popupAudioPaths = {
      0: 'assets/audio/sjc.mp3',
      1: 'assets/audio/duddell.mp3',
      2: 'assets/audio/sq.mp3',
      3: 'assets/audio/cfa.mp3',
      4: 'assets/audio/boc.mp3'
    };
    if (this.popupAudioBtn) {
      this.popupAudioBtn.addEventListener('click', () => this.togglePopupAudio());
    }
  }

  showPopup(siteId) {
    if (!this.popupOverlay) return;
    
    this.popupCurrentSite = siteId;
    this.popupPanelIndex = 0;
    this.popupOverlay.classList.add('visible');
    // 弹窗打开时暂停底层地图光晕动画，集中渲染资源给弹窗
    document.body.classList.add('popup-open');
    this.updatePopupUI();
    this.populatePopupContent(siteId);

    // 加载音频源
    this.loadPopupAudio(siteId);

    // 等待过渡动画完成后初始化 3D 查看器（约 350ms）
    setTimeout(() => this.initPopupViewer(siteId), 400);
  }

  hidePopup() {
    if (!this.popupOverlay) return;

    // 停止音频
    this.stopPopupAudio();

    // 销毁 3D 查看器
    if (this.popupViewer) {
      this.popupViewer.dispose();
      this.popupViewer = null;
    }

    this.popupOverlay.classList.remove('visible');
    this.popupCurrentSite = null;
    document.body.classList.remove('popup-open');
  }

  // ========== 弹窗音频 ==========
  loadPopupAudio(siteId) {
    const audio = this.popupAudio;
    if (!audio) return;

    const path = this.popupAudioPaths[siteId];
    if (!path) return;

    audio.src = path;
    audio.load();
  }

  togglePopupAudio() {
    const audio = this.popupAudio;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(err => console.warn('音频播放失败:', err));
      this.popupAudioBtn.classList.add('playing');
    } else {
      audio.pause();
      this.popupAudioBtn.classList.remove('playing');
    }
  }

  stopPopupAudio() {
    const audio = this.popupAudio;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    if (this.popupAudioBtn) {
      this.popupAudioBtn.classList.remove('playing');
    }
  }

  // 初始化弹出窗口内的 3D 查看器
  initPopupViewer(siteId) {
    const container = document.getElementById('popup-model-container');
    if (!container) {
      console.error('[Popup] 找不到模型容器 #popup-model-container');
      return;
    }

    console.log('[Popup] 容器尺寸:', container.getBoundingClientRect().width, 'x', container.getBoundingClientRect().height);

    // 清理旧viewer
    if (this.popupViewer) {
      this.popupViewer.dispose();
      this.popupViewer = null;
    }

    // 清空容器（移除旧canvas）
    container.innerHTML = '';

    // 创建新viewer，透明背景（由弹窗 CSS 背景提供深棕色），文字可置于模型图层下方
    this.popupViewer = new ThreeViewer(container, {
      backgroundColor: '#3A2E24',
      transparentBackground: true,
      enableFog: false,
      autoRotate: true,
      toneMappingExposure: 1.8
    });
    this.popupViewer.init();

    const modelPath = this.popupModelPaths[siteId];
    if (!modelPath) {
      console.error('[Popup] 站点', siteId, '无对应模型路径');
      return;
    }

    console.log('[Popup] 开始加载模型:', modelPath);
    // 重置加载文字状态：移除 is-hidden，恢复默认文案
    const loadingText = document.getElementById('model-loading-text');
    if (loadingText) {
      loadingText.classList.remove('is-hidden');
      loadingText.textContent = window.I18N ? I18N.t('model-loading') : '3D 模型加载中，请稍后';
    }

    this.popupViewer.loadModel(modelPath)
      .then(() => {
        console.log('[Popup] 模型加载成功');
        if (loadingText) loadingText.classList.add('is-hidden');
      })
      .catch((err) => {
        console.error('[Popup] 模型加载失败:', err);
        if (loadingText) loadingText.textContent = window.I18N ? I18N.t('model-error') : '3D 模型加载失败，请重试';
      });
  }

  // 根据站点数据填充弹窗面板内容
  populatePopupContent(siteId) {
    console.log('[Popup] populatePopupContent, siteId:', siteId);
    const site = window.SITES && window.SITES[siteId];
    if (!site) {
      console.warn('[Popup] SITES 数据未找到, siteId:', siteId, 'SITES:', typeof window.SITES);
      return;
    }

    console.log('[Popup] 建筑数据:', site.name, '|', site.nameEn);

    // 面板1 — 基本介绍
    const elTitle = document.getElementById('popup-intro-title');
    const elSubtitle = document.getElementById('popup-intro-subtitle');
    const elP1 = document.getElementById('popup-intro-p1');
    const elP2 = document.getElementById('popup-intro-p2');

    console.log('[Popup] DOM元素:', !!elTitle, !!elSubtitle, !!elP1, !!elP2);

    const getSiteText = (field) => (window.I18N ? I18N.siteText(site, field) : site[field]);

    if (elTitle) elTitle.textContent = getSiteText('name') || '';
    if (elSubtitle) elSubtitle.textContent = site.nameEn || '';
    if (elP1) elP1.textContent = getSiteText('intro') || '';
    if (elP2) elP2.textContent = getSiteText('intro2') || '';

    // 面板2 — 冷知识 ①
    const elF1Title = document.getElementById('popup-fact1-title');
    const elF1Text = document.getElementById('popup-fact1-text');
    const f1 = getSiteText('funFact1');
    if (f1) {
      if (elF1Title) elF1Title.textContent = f1.title || '';
      if (elF1Text) elF1Text.textContent = f1.text || '';
    }

    // 面板3 — 冷知识 ②
    const elF2Title = document.getElementById('popup-fact2-title');
    const elF2Text = document.getElementById('popup-fact2-text');
    const f2 = getSiteText('funFact2');
    if (f2) {
      if (elF2Title) elF2Title.textContent = f2.title || '';
      if (elF2Text) elF2Text.textContent = f2.text || '';
    }

    // 面板4 — 隐藏机位
    const elPhotoText = document.getElementById('popup-photo-text');
    if (elPhotoText) elPhotoText.textContent = getSiteText('photoTip') || '';

    console.log('[Popup] 面板1 填充完成:', elTitle?.textContent?.substring(0, 10) + '...');
  }

  // 语言切换时刷新界面文案
  onLanguageChanged() {
    // 若弹窗已打开，重新填充内容
    if (this.popupCurrentSite !== undefined && this.popupCurrentSite !== null) {
      this.populatePopupContent(this.popupCurrentSite);
    }
    // 刷新 3D 加载文字（若仍在加载中）
    const loadingText = document.getElementById('model-loading-text');
    if (loadingText && !loadingText.classList.contains('is-hidden')) {
      loadingText.textContent = window.I18N ? I18N.t('model-loading') : '3D 模型加载中，请稍后';
    }
  }

  navigatePopupPanel(dir) {
    const newIndex = this.popupPanelIndex + dir;
    if (newIndex < 0 || newIndex >= this.popupTotalPanels) return;
    this.popupPanelIndex = newIndex;
    this.updatePopupUI();
  }

  goToPopupPanel(index) {
    if (index < 0 || index >= this.popupTotalPanels) return;
    this.popupPanelIndex = index;
    this.updatePopupUI();
  }

  updatePopupUI() {
    // 滑动轨道
    if (this.popupTrack) {
      const offset = -(this.popupPanelIndex * 20);
      this.popupTrack.style.transform = `translateX(${offset}%)`;
    }

    // 左右箭头显隐
    if (this.popupArrowLeft) {
      this.popupArrowLeft.classList.toggle('hidden', this.popupPanelIndex === 0);
    }
    if (this.popupArrowRight) {
      this.popupArrowRight.classList.toggle('hidden', this.popupPanelIndex === this.popupTotalPanels - 1);
    }

    // 指示点状态
    this.popupDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.popupPanelIndex);
    });
  }

  // 触摸滑动手势
  popupTouchStart(e) {
    this.popupTouchStartX = e.touches[0].clientX;
  }

  popupTouchEnd(e) {
    const diff = this.popupTouchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      this.navigatePopupPanel(diff > 0 ? 1 : -1);
    }
  }

  // ========== 引导提示 ==========
  initGuideTip() {
    const guideTip = document.getElementById('guide-tip');
    if (!guideTip) return;

    // 点击地图标记或5秒后隐藏
    const hideTip = () => {
      guideTip.classList.add('hidden');
    };

    document.querySelectorAll('.building-hotspot').forEach(m => {
      m.addEventListener('click', hideTip);
    });
    
    setTimeout(hideTip, 8000);
  }

  // ========== 工具 ==========
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 启动应用 - 等待Three.js加载完成
function startApp() {
  window.app = new App();
}

if (window.THREE && window.OrbitControls && window.GLTFLoader) {
  startApp();
} else {
  window.addEventListener('three-ready', startApp);
}

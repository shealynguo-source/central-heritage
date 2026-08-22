// 百年中环 - 多语言支持（简体 / 繁体 / English）
// 负责：界面文案字典、语言切换、建筑标签/弹窗内容更新、localStorage 记忆

const UI_TEXT = {
  'zh-CN': {
    'app-name': '百年中环',
    'loading-text': '百年中环',
    'splash-title': '点击进入百年中环',
    'splash-btn': '轻触屏幕继续',
    'map-title': '百年中环',
    'map-subtitle': 'Central: A Century of History',
    'map-alt': '百年中环水彩地图',
    'map-fallback': '百年中环 · 水彩地图',
    'guide-tip': '点击建筑，探索百年中环',
    'about-btn': '关于 · About',
    'audio-title': '播放介绍音频',
    'bgm-label': '背景音乐开关',
    'model-loading': '3D 模型加载中，请稍后',
    'model-hint': '↔ 拖拽旋转  |  滚轮缩放',
    'model-error': '3D 模型加载失败，请重试',
    'model-error-prefix': '模型加载失败',
    'fact-badge-1': '冷知识 ①',
    'fact-badge-2': '冷知识 ②',
    'photo-badge': '隐藏机位',
    'photo-icon-alt': '相机',
    'drag-hint': '← 拖动地图 · 双指缩放 →',
    'error-title': '错误',
    'play-fail': '无法播放',
    'about-title': '关于百年中环',
    'about-body': '这是一款水彩手绘风格的中环历史导览网页，串联五座地标建筑，带你走进香港百年的城市记忆。',
    'about-credit-line1': '内容来源于实地考察与公开史料',
    'about-credit-line2': '3D模型：Meshy生成',
    'about-credit-line3': '语音：MINIMAX语音',
    'about-credit-line4': '网站搭建：CodeBuddy',
    'about-copyright': '© 2026 百年中环',
    'close': '关闭',
    'lang-zh-cn': '简体中文',
    'lang-zh-tw': '繁體中文',
    'lang-en': 'English'
  },
  'zh-TW': {
    'app-name': '百年中環',
    'loading-text': '百年中環',
    'splash-title': '點擊進入百年中環',
    'splash-btn': '輕觸屏幕繼續',
    'map-title': '百年中環',
    'map-subtitle': 'Central: A Century of History',
    'map-alt': '百年中環水彩地圖',
    'map-fallback': '百年中環 · 水彩地圖',
    'guide-tip': '點擊建築，探索百年中環',
    'about-btn': '關於 · About',
    'audio-title': '播放介紹音頻',
    'bgm-label': '背景音樂開關',
    'model-loading': '3D 模型載入中，請稍後',
    'model-hint': '↔ 拖拽旋轉  |  滾輪縮放',
    'model-error': '3D 模型載入失敗，請重試',
    'model-error-prefix': '模型載入失敗',
    'fact-badge-1': '冷知識 ①',
    'fact-badge-2': '冷知識 ②',
    'photo-badge': '隱藏機位',
    'photo-icon-alt': '相機',
    'drag-hint': '← 拖動地圖 · 雙指縮放 →',
    'error-title': '錯誤',
    'play-fail': '無法播放',
    'about-title': '關於百年中環',
    'about-body': '這是一款水彩手繪風格的中環歷史導覽網頁，串聯五座地標建築，帶你走進香港百年的城市記憶。',
    'about-credit-line1': '內容來源於實地考察與公開史料',
    'about-credit-line2': '3D模型：Meshy生成',
    'about-credit-line3': '語音：MINIMAX語音',
    'about-credit-line4': '網站搭建：CodeBuddy',
    'about-copyright': '© 2026 百年中環',
    'close': '關閉',
    'lang-zh-cn': '简体中文',
    'lang-zh-tw': '繁體中文',
    'lang-en': 'English'
  },
  'en': {
    'app-name': 'Central Heritage',
    'loading-text': 'Central Heritage',
    'splash-title': 'Tap to Enter Central Heritage',
    'splash-btn': 'Touch to Continue',
    'map-title': 'Central Heritage',
    'map-subtitle': 'A Century of History in Central',
    'map-alt': 'Watercolor Map of Central Heritage',
    'map-fallback': 'Central Heritage · Watercolor Map',
    'guide-tip': 'Tap a building to explore Central\'s history',
    'about-btn': 'About',
    'audio-title': 'Play audio introduction',
    'bgm-label': 'Toggle background music',
    'model-loading': 'Loading 3D model, please wait',
    'model-hint': '↔ Drag to rotate  |  Scroll to zoom',
    'model-error': 'Failed to load 3D model. Please try again.',
    'model-error-prefix': 'Failed to load model',
    'fact-badge-1': 'Did You Know? ①',
    'fact-badge-2': 'Did You Know? ②',
    'photo-badge': 'Photo Spot',
    'photo-icon-alt': 'camera',
    'drag-hint': '← Drag map · Pinch to zoom →',
    'error-title': 'Error',
    'play-fail': 'Playback failed',
    'about-title': 'About Central Heritage',
    'about-body': 'A watercolor guide to the history of Central, connecting five landmark buildings and a century of Hong Kong\'s urban memories.',
    'about-credit-line1': 'Content based on field research and public records',
    'about-credit-line2': '3D models: Meshy',
    'about-credit-line3': 'Voice: MINIMAX',
    'about-credit-line4': 'Website built with CodeBuddy',
    'about-copyright': '© 2026 Central Heritage',
    'close': 'Close',
    'lang-zh-cn': 'Simplified Chinese',
    'lang-zh-tw': 'Traditional Chinese',
    'lang-en': 'English'
  }
};

const I18N = {
  current: 'zh-CN',

  t(key) {
    const dict = UI_TEXT[this.current] || {};
    if (dict[key] !== undefined) return dict[key];
    if (UI_TEXT['zh-CN'][key] !== undefined) return UI_TEXT['zh-CN'][key];
    return key;
  },

  // 获取建筑内容字段在当前语言下的文本
  siteText(site, field) {
    if (!site) return '';
    if (this.current === 'zh-CN') {
      if (field === 'name') return site.name;
      return site[field] !== undefined ? site[field] : '';
    }
    const langData = (window.SITES_I18N && window.SITES_I18N[site.id] && window.SITES_I18N[site.id][this.current]) || {};
    if (field === 'name') return langData.name || site.name;
    if (langData[field] !== undefined) return langData[field];
    return site[field] !== undefined ? site[field] : '';
  },

  setLanguage(lang) {
    if (!UI_TEXT[lang]) return;
    this.current = lang;

    // 更新 <html lang>
    const htmlLang = lang === 'zh-TW' ? 'zh-Hant' : (lang === 'en' ? 'en' : 'zh-CN');
    document.documentElement.lang = htmlLang;

    // 更新页面标题
    document.title = this.t('app-name') + ' · ' + (lang === 'en' ? 'Watercolor Guide' : (lang === 'zh-TW' ? '水彩導覽' : '水彩导览'));

    // 遍历 data-i18n 文本元素
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const text = this.t(el.dataset.i18n);
      if (text !== undefined) el.textContent = text;
    });

    // title / aria-label / alt 属性
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const text = this.t(el.dataset.i18nTitle);
      if (text !== undefined) el.setAttribute('title', text);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const text = this.t(el.dataset.i18nAria);
      if (text !== undefined) el.setAttribute('aria-label', text);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const text = this.t(el.dataset.i18nAlt);
      if (text !== undefined) el.setAttribute('alt', text);
    });

    // 更新 SVG 建筑标签与地图 fallback
    this.updateSiteLabels();

    // 更新语言按钮高亮
    this.updateLangButtons();

    // 通知 app 刷新当前弹窗内容
    if (window.App && typeof window.App.onLanguageChanged === 'function') {
      window.App.onLanguageChanged();
    }

    // 记忆选择
    try { localStorage.setItem('bnzh-lang', lang); } catch (e) {}
  },

  updateSiteLabels() {
    document.querySelectorAll('.building-label').forEach(el => {
      const g = el.closest('.building-hotspot');
      if (!g) return;
      const siteId = parseInt(g.dataset.site, 10);
      const site = (window.SITES || [])[siteId];
      if (!site) return;
      el.textContent = this.siteText(site, 'name');
    });
  },

  updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.current);
      btn.setAttribute('title', this.t('lang-' + btn.dataset.lang));
    });
  },

  init() {
    // 防重入：i18n.js 自动初始化 + app.js 双保险，只执行一次
    if (this._initialized) return;
    this._initialized = true;

    let saved = null;
    try { saved = localStorage.getItem('bnzh-lang'); } catch (e) {}
    if (UI_TEXT[saved]) {
      this.setLanguage(saved);
    } else {
      this.setLanguage('zh-CN');
    }

    // 绑定语言按钮事件（事件委托）
    const switcher = document.getElementById('lang-switcher');
    if (switcher) {
      switcher.addEventListener('click', (e) => {
        const btn = e.target.closest('.lang-btn');
        if (!btn) return;
        this.setLanguage(btn.dataset.lang);
      });
    }

    // 地图图片加载失败时，按当前语言显示 fallback
    window.__mapFallback = function (img) {
      img.onerror = null;
      const text = I18N.t('map-fallback');
      img.src = 'data:image/svg+xml,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="506">' +
        '<rect fill="#F5F0E8" width="900" height="506"/>' +
        '<text x="450" y="253" text-anchor="middle" fill="#4A7B9D" font-family="serif" font-size="22">' + text + '</text></svg>'
      );
    };
  }
};

window.I18N = I18N;
window.UI_TEXT = UI_TEXT;

// 自动初始化：DOM 就绪后立即启用语言切换（不依赖 Three.js 加载完成）
// 若 three.js CDN 加载失败，语言按钮依然可用
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => I18N.init(), { once: true });
} else {
  I18N.init();
}

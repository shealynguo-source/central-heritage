// 百年中环 - Three.js 3D模型查看器
class ThreeViewer {
  constructor(container, options = {}) {
    this.container = container;
    this.options = Object.assign({
      backgroundColor: '#F5F0E8',
      enableFog: true,
      autoRotate: true,
      toneMappingExposure: 1.2,
    }, options);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.model = null;
    this.animationId = null;
    this.isDisposed = false;
    console.log('[ThreeViewer] 构造完成, options:', this.options);
  }

  init() {
    // 场景
    this.scene = new THREE.Scene();
    
    // 背景色
    this.scene.background = new THREE.Color(this.options.backgroundColor);
    if (this.options.enableFog) {
      this.scene.fog = new THREE.Fog(this.options.backgroundColor, 5, 20);
    }

    // 相机
    const rect = this.container.getBoundingClientRect();
    this.camera = new THREE.PerspectiveCamera(45, rect.width / rect.height, 0.1, 100);
    this.camera.position.set(3, 2, 5);

    // 渲染器
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    this.renderer.setSize(rect.width, rect.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = this.options.toneMappingExposure;
    this.container.appendChild(this.renderer.domElement);
    console.log('[ThreeViewer] 渲染器初始化, 尺寸:', rect.width, 'x', rect.height);

    // OrbitControls
    this.controls = new window.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.minDistance = 2;
    this.controls.maxDistance = 10;
    this.controls.maxPolarAngle = Math.PI * 0.7;
    this.controls.autoRotate = this.options.autoRotate;
    this.controls.autoRotateSpeed = 0.5;
    this.controls.target.set(0, 0.5, 0);

    // 光源
    this.setupLights();

    // 加载动画指示器
    this.showLoadingIndicator();

    // 响应式调整
    this.onResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.onResize);

    // 开始渲染循环
    this.animate();
  }

  setupLights() {
    // 环境光
    const ambient = new THREE.AmbientLight('#E8DCC8', 2.5);
    this.scene.add(ambient);

    // 半球光 (天空/地面)
    const hemi = new THREE.HemisphereLight('#C9D6E8', '#C9A96E', 1.5);
    this.scene.add(hemi);

    // 主方向光 (带阴影)
    const keyLight = new THREE.DirectionalLight('#FFFFFF', 4);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 50;
    keyLight.shadow.camera.left = -10;
    keyLight.shadow.camera.right = 10;
    keyLight.shadow.camera.top = 10;
    keyLight.shadow.camera.bottom = -10;
    keyLight.shadow.bias = -0.0001;
    this.scene.add(keyLight);

    // 补光
    const fillLight = new THREE.DirectionalLight('#A8C8E0', 1.5);
    fillLight.position.set(-3, 2, -2);
    this.scene.add(fillLight);

    // 底部补光 (减少暗面)
    const rimLight = new THREE.DirectionalLight('#D4B896', 1);
    rimLight.position.set(0, -1, 0);
    this.scene.add(rimLight);
  }

  showLoadingIndicator() {
    // 在地面上放一个金色圆环作为加载指示
    const ringGeom = new THREE.TorusGeometry(0.6, 0.03, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: '#C9A96E',
      roughness: 0.3,
      metalness: 0.6
    });
    this.loadingRing = new THREE.Mesh(ringGeom, ringMat);
    this.loadingRing.rotation.x = -Math.PI / 2;
    this.loadingRing.position.y = -0.5;
    this.scene.add(this.loadingRing);

    // 地面阴影接收面
    const groundGeom = new THREE.PlaneGeometry(20, 20);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.15 });
    this.ground = new THREE.Mesh(groundGeom, groundMat);
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.position.y = -1;
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);
  }

  loadModel(modelPath) {
    console.log('[ThreeViewer] 开始加载模型:', modelPath);
    return new Promise((resolve, reject) => {
      this.isDisposed ? reject('disposed') : null;

      const loader = new window.GLTFLoader();

      // 配置 Draco 解码器（支持 Draco 压缩的 GLB 模型）
      if (window.DRACOLoader) {
        const dracoLoader = new window.DRACOLoader();
        dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/');
        loader.setDRACOLoader(dracoLoader);
        console.log('[ThreeViewer] 已配置 Draco 解码器');
      }

      // 配置 MeshoptDecoder（支持 EXT_meshopt_compression 压缩的 GLB 模型）
      if (window.MeshoptDecoder) {
        loader.setMeshoptDecoder(window.MeshoptDecoder);
        console.log('[ThreeViewer] 已配置 MeshoptDecoder');
      }

      loader.load(
        modelPath,
        (gltf) => {
          if (this.isDisposed) return;
          console.log('[ThreeViewer] 模型文件已加载, 解析中...');

          // 移除加载环
          if (this.loadingRing) {
            this.scene.remove(this.loadingRing);
            this.loadingRing.geometry.dispose();
            this.loadingRing.material.dispose();
            this.loadingRing = null;
          }

          this.model = gltf.scene;

          // 计算包围盒并居中
          const box = new THREE.Box3().setFromObject(this.model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 2.5 / maxDim;

          this.model.scale.setScalar(scale);
          this.model.position.sub(center.multiplyScalar(scale));
          this.model.position.y += 0.3;

          // 设置材质属性
          this.model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;

              if (child.material) {
                child.material.roughness = Math.min(child.material.roughness || 0.5, 0.8);
                child.material.metalness = Math.max(child.material.metalness || 0, 0.1);

                // 统一色调
                if (child.material.color) {
                  const hsl = {};
                  child.material.color.getHSL(hsl);
                  if (hsl.s < 0.1) {
                    child.material.color.setHSL(hsl.h, 0.05, Math.min(hsl.l + 0.1, 0.9));
                  }
                }
              }
            }
          });

          this.scene.add(this.model);
          this.controls.target.set(0, 0.3, 0);
          this.controls.update();

          resolve();
        },
        (progress) => {
          if (this.isDisposed) return;
          if (this.loadingRing && progress.total > 0) {
            const pct = progress.loaded / progress.total;
            this.loadingRing.scale.setScalar(1 + pct * 0.5);
          }
        },
        (error) => {
          if (this.isDisposed) return;
          console.error('[ThreeViewer] 模型加载失败:', error);
          // 移除加载环
          if (this.loadingRing) {
            this.scene.remove(this.loadingRing);
            this.loadingRing.geometry.dispose();
            this.loadingRing.material.dispose();
            this.loadingRing = null;
          }
          // 显示可见的错误提示
          this.showErrorOverlay('模型加载失败：' + (error && error.message ? error.message : '未知错误'));
          reject(error);
        }
      );
    });
  }

  // 在容器中显示错误提示
  showErrorOverlay(message) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#E8C99B;background:rgba(0,0,0,0.6);padding:16px 24px;border-radius:8px;font-family:sans-serif;font-size:14px;max-width:80%;text-align:center;line-height:1.6;z-index:10;';
    overlay.textContent = message;
    if (this.container.style.position !== 'relative' && this.container.style.position !== 'absolute' && this.container.style.position !== 'fixed') {
      this.container.style.position = 'relative';
    }
    this.container.appendChild(overlay);
  }

  handleResize() {
    if (this.isDisposed) return;
    const rect = this.container.getBoundingClientRect();
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(rect.width, rect.height);
  }

  animate() {
    if (this.isDisposed) return;
    
    this.animationId = requestAnimationFrame(() => this.animate());
    
    // 加载环旋转动画
    if (this.loadingRing) {
      this.loadingRing.rotation.z += 0.03;
    }
    
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.isDisposed = true;
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    window.removeEventListener('resize', this.onResize);
    
    if (this.controls) {
      this.controls.dispose();
      this.controls = null;
    }
    
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
      this.renderer = null;
    }
    
    if (this.scene) {
      this.disposeScene(this.scene);
      this.scene = null;
    }
  }

  disposeScene(obj) {
    if (!obj) return;
    obj.traverse((child) => {
      if (child.geometry && child.geometry !== this.loadingRing?.geometry) {
        child.geometry.dispose();
      }
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(m => this.disposeMaterial(m));
        } else {
          this.disposeMaterial(child.material);
        }
      }
    });
  }

  disposeMaterial(mat) {
    for (const key of Object.keys(mat)) {
      const val = mat[key];
      if (val && val.isTexture) {
        val.dispose();
      }
    }
    mat.dispose();
  }
}

// 使用全局变量暴露给其他模块
window.ThreeViewer = ThreeViewer;

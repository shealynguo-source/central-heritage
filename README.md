# 百年中環 · 水彩導覽

一款水彩手繪風格的手機網頁導覽工具，探索香港中環五大歷史地標建築。

## 快速開始

### 方式一：直接打開
雙擊 `index.html` 即可在瀏覽器中查看（須有網絡，因為 Three.js 從 CDN 加載）。

### 方式二：本地服務器（推薦）
```bash
cd 百年中環-web
python -m http.server 8080
# 然後打開 http://localhost:8080
```

## 部署到 GitHub Pages

1. 在 GitHub 創建一個新倉庫（例如 `central-heritage`）
2. 將 `百年中環-web` 文件夾內的全部文件上傳到倉庫根目錄
3. Settings → Pages → Source: `main` branch → Save
4. 幾分鐘後，你的網頁會出現在 `https://你的用戶名.github.io/central-heritage/`

## 項目結構

```
├── index.html          # 主頁面 (SPA)
├── css/
│   └── style.css       # 全局樣式
├── js/
│   ├── app.js          # 應用主邏輯、路由、音頻控制
│   ├── content.js      # 五個建築的文案數據
│   └── three-viewer.js # Three.js 3D模型查看器
├── assets/
│   ├── images/         # 水彩地圖 + 建築透明底圖
│   ├── models/         # GLB 3D模型
│   └── audios/         # 語音導覽 MP3 + BGM
└── README.md
```

## 五大地標

| # | 建築 | 年代 | 風格 |
|---|------|------|------|
| 1 | 聖約翰座堂 | 1847-1849 | 哥德復興式 |
| 2 | 都爹利街煤氣燈 | ~1875 | 殖民時期市政設施 |
| 3 | 皇后像廣場 | ~1890s | 殖民時期公共廣場 |
| 4 | 終審法院大樓 | 1912 | 新古典主義 |
| 5 | 中銀大廈 | 1990 | 現代主義 (貝聿銘) |

## 技術棧

- **前端**: 純原生 HTML5 + CSS3 + JavaScript (零框架)
- **3D渲染**: Three.js (GLTFLoader + OrbitControls)
- **路由**: Hash路由 (#home / #detail-{id})
- **音頻**: HTML5 Audio API
- **托管**: GitHub Pages

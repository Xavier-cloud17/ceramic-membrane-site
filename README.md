# 陶瓷纤管膜多页静态官网

这是一个面向环保工程客户的 B2B 多页静态官网第一版，适合承接社媒推广流量、展示产品参数、说明应用场景、沉淀案例并引导询盘。

## 想让所有电脑都能打开

本地双击 `index.html` 只能在当前电脑打开。要让客户、同事或任意电脑打开，需要把整个文件夹发布到公网静态托管平台。

已经为常见平台补好部署文件：

- `.nojekyll`：GitHub Pages 静态站点配置
- `publish-to-github-pages.ps1`：把本地网站提交并推送到 GitHub 的辅助脚本
- `netlify.toml`：Netlify 静态发布配置
- `vercel.json`：Vercel 静态发布配置
- `404.html`：公网访问错误地址时显示的页面

详细步骤见 `DEPLOY.md`。

## 如何打开

直接双击 `index.html` 即可在浏览器打开首页。也可以用浏览器打开以下页面：

- `index.html`：首页
- `products.html`：产品参数
- `applications.html`：应用场景
- `cases.html`：案例模板
- `about.html`：关于我们
- `contact.html`：联系我们

## 先改哪些内容

建议按这个顺序替换真实资料：

1. 在所有页面中把“陶瓷纤管膜”换成你的正式品牌名或公司简称。
2. 在 `contact.html` 中替换手机号、微信、邮箱、地址和二维码。
3. 在 `products.html` 中把“待补充真实参数”替换为真实产品参数。
4. 在 `cases.html` 中把案例模板替换为真实项目数据。
5. 把真实图片放进 `assets/img/`，再替换页面里的占位说明。

## 文件结构

```text
.
├── index.html
├── products.html
├── applications.html
├── cases.html
├── about.html
├── contact.html
├── 404.html
├── DEPLOY.md
├── publish-to-github-pages.ps1
├── netlify.toml
├── vercel.json
└── assets
    ├── css
    │   └── style.css
    ├── js
    │   └── main.js
    └── img
        └── README.md
```

## 上线方式

这是纯静态网页，不需要数据库或后端。可以部署到 GitHub Pages、Netlify、Vercel、对象存储静态网站，或直接放到普通服务器的网站目录。

当前 GitHub Pages 公网地址：

```text
https://xavier-cloud17.github.io/ceramic-membrane-site/
```

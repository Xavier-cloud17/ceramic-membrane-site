# 陶瓷膜多页静态官网

这是一个面向环保工程、化工、食品发酵、新能源材料和水回用项目的 B2B 多页静态官网。新版结构对标成熟工业品牌官网，覆盖首页、产品中心、应用场景、项目案例、服务支持、资料中心、关于我们和联系询盘。

## 当前页面

- `index.html`：首页，包含品牌定位、产品入口、应用矩阵、流程和询盘 CTA。
- `products.html`：产品中心，覆盖陶瓷膜元件、膜组件、实验/中试/成套装置。
- `applications.html`：应用场景，覆盖含油废水、化工废水、食品发酵、水回用、新能源材料和矿山冶金。
- `cases.html`：项目案例模板，用于后续替换真实项目数据。
- `support.html`：服务支持，覆盖水样评估、小试、中试、工艺包、调试和运维。
- `resources.html`：资料中心，覆盖样册、选型问卷、小试记录、FAQ 和资料清单。
- `about.html`：关于我们，展示研发、制造、实验验证和工程配合能力。
- `contact.html`：联系我们，包含静态询盘表单和资料提交清单。
- `404.html`：GitHub Pages 访问错误地址时显示的页面。

## 已完成的升级

- 重写整站视觉系统：深色工业首屏、陶瓷/青绿色/陶土色搭配、响应式导航和统一页脚。
- 新增本地视觉资产：`hero-membrane.svg`、`product-cutaway.svg`、`process-system.svg`，避免依赖外链图片。
- 增加服务支持页和资料中心，让网站从展示型变成“产品 + 应用 + 案例 + 服务 + 资料 + 询盘”的完整转化链路。
- 联系页表单会生成邮件询盘内容；正式上线可替换为企业邮箱、CRM、企业微信或表单服务。
- 增加 `robots.txt` 和 `sitemap.xml`，方便搜索引擎识别 GitHub Pages 站点结构。

## 如何打开

直接双击 `index.html` 可以本地预览。也可以部署到 GitHub Pages 后通过公网访问。

当前 GitHub Pages 公网地址：

```text
https://xavier-cloud17.github.io/ceramic-membrane-site/
```

## 发布方式

项目是纯静态网页，不需要数据库或后端，支持 GitHub Pages、Netlify、Vercel、对象存储静态网站或普通服务器。

已包含常见部署文件：

- `.nojekyll`：GitHub Pages 静态站点配置。
- `publish-to-github-pages.ps1`：提交并推送 GitHub Pages 的辅助脚本。
- `netlify.toml`：Netlify 静态发布配置。
- `vercel.json`：Vercel 静态发布配置。
- `robots.txt`：搜索引擎爬取规则。
- `sitemap.xml`：站点地图。
- `DEPLOY.md`：更详细的发布说明。

## 上线前建议替换

1. 把“陶瓷膜科技”替换为正式公司名或品牌名。
2. 在 `contact.html` 中替换电话、微信、邮箱、地址和二维码。
3. 在 `products.html` 中用真实样册替换参数字段和型号信息。
4. 在 `cases.html` 中用真实项目替换案例模板。
5. 在 `resources.html` 中把占位下载卡片替换为真实 PDF、问卷和测试模板。
6. 在 `about.html` 中补充公司资质、专利、检测报告、工厂照片和团队信息。
7. 将真实产品、工厂、实验和工程现场图片放入 `assets/img/` 并替换 SVG 示意资产。

## 文件结构

```text
.
├── index.html
├── products.html
├── applications.html
├── cases.html
├── support.html
├── resources.html
├── about.html
├── contact.html
├── 404.html
├── DEPLOY.md
├── publish-to-github-pages.ps1
├── netlify.toml
├── vercel.json
├── robots.txt
├── sitemap.xml
└── assets
    ├── css
    │   └── style.css
    ├── js
    │   └── main.js
    └── img
        ├── README.md
        ├── hero-membrane.svg
        ├── product-cutaway.svg
        └── process-system.svg
```

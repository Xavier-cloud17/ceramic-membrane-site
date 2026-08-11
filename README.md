# 陶瓷膜企业官网

这是一个面向陶瓷膜、工业废水处理、流体澄清、水回用和工程服务的多页面静态企业官网。当前版本参考雅瓷官网的企业站框架，补齐了多级导航、关于我们栏目组、产品中心、行业应用、新闻资源、人才招聘、联系询盘和完整搭建流程文档。

线上地址：

```text
https://xavier-cloud17.github.io/ceramic-membrane-site/
```

## 页面结构

- `index.html`：首页，覆盖品牌定位、产品入口、应用矩阵、项目流程、案例和询盘 CTA。
- `about.html`：公司简介，展示研发、制造、工程配合和服务能力。
- `founder.html`：创始人寄语，用于放置负责人讲话和长期愿景。
- `culture.html`：企业文化，用于展示使命、价值观和质量理念。
- `rd.html`：研发实力，覆盖材料、膜层制备、测试评价和中试放大。
- `honor.html`：资质荣誉，用于承载认证、专利、检测报告和合作证明。
- `products.html`：产品中心，覆盖陶瓷膜元件、膜组件、实验/中试/成套装置。
- `product-detail.html`：陶瓷管式膜产品详情页，覆盖参数字段、应用场景、小试中试和询价转化。
- `applications.html`：行业应用，覆盖含油废水、化工废水、食品发酵、水回用等场景。
- `cases.html`：项目案例，用于替换真实项目数据。
- `support.html`：服务支持，覆盖水样评估、小试、中试、工艺包、调试和运维。
- `resources.html`：资料中心，覆盖样册、选型问卷、小试记录和资料清单。
- `news.html`：新闻资讯，覆盖公司新闻、行业资讯和技术文章。
- `faq.html`：常见问题，回答选型、小试、清洗、交付等客户高频问题。
- `jobs.html`：人才招聘，覆盖人才理念和招聘职位。
- `contact.html`：联系我们，包含项目询盘表单。
- `site-process.html`：网页化搭建流程摘要。
- `SITE_BUILD_PROCESS.md`：完整搭建流程与 3 个 Codex 分工文档。
- `404.html`：GitHub Pages 错误页。

## 已完成能力

- 多级导航：对标成熟企业站的“关于我们 / 产品中心 / 行业应用 / 新闻资源 / 人才招聘 / 联系我们”结构。
- 响应式布局：支持桌面端和移动端菜单。
- 询盘转化：联系页表单可生成邮件询盘内容。
- 产品详情：新增面向搜索和销售转发的产品详情页，用于承接型号参数、应用、测试和报价。
- SEO 基础：每页包含标题、描述；已配置 `robots.txt` 和 `sitemap.xml`。
- 视觉资产：使用本地 SVG 示意图，避免外链图片失效。
- 文档沉淀：新增 `SITE_BUILD_PROCESS.md`，说明完整搭建流程、后续服务器部署和团队分工。

## 上线前必须替换

1. 把“陶瓷膜科技”替换为正式公司名或品牌名。
2. 替换 Logo、电话、邮箱、地址、微信二维码和地图。
3. 用真实产品型号、参数、图片和样册替换占位内容。
4. 用真实案例替换 `cases.html` 中的案例模板。
5. 把资质、专利、检测报告和合作证明补入 `honor.html` 与 `resources.html`。
6. 把招聘岗位和 HR 邮箱补入 `jobs.html`。
7. 根据正式域名更新 `sitemap.xml`、`robots.txt` 和页面 canonical 信息。

## GitHub 发布

```powershell
cd "D:\Users\Lenovo\Documents\网页\ceramic-membrane-site"
git status --short --branch
git add .
git commit -m "Expand corporate website framework"
git push origin main
git push origin main:gh-pages
```

## 未来服务器部署

租用服务器后建议使用：

- Ubuntu LTS
- Nginx
- Certbot / Let’s Encrypt HTTPS
- 域名解析到服务器公网 IP
- 表单接入企业邮箱、CRM、企业微信或后端接口

详细步骤见 `SITE_BUILD_PROCESS.md`。

## 文件结构

```text
.
├── index.html
├── about.html
├── founder.html
├── culture.html
├── rd.html
├── honor.html
├── products.html
├── product-detail.html
├── applications.html
├── cases.html
├── support.html
├── resources.html
├── news.html
├── faq.html
├── jobs.html
├── contact.html
├── site-process.html
├── SITE_BUILD_PROCESS.md
├── DEPLOY.md
├── sitemap.xml
├── robots.txt
└── assets
    ├── css/style.css
    ├── js/main.js
    └── img/
```

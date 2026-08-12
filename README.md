# 陶瓷膜企业官网

这是一个面向陶瓷膜、工业废水处理、流体澄清、水回用和工程服务的多页面静态企业官网。当前版本已经补齐首页、关于我们、产品中心、行业应用、项目案例、服务支持、资料中心、新闻资讯、人才招聘、联系询盘和部署运维文档。

当前 GitHub Pages 预发布地址：

```text
https://xavier-cloud17.github.io/ceramic-membrane-site/
```

> 说明：本仓库目前适合作为静态官网和预发布环境使用。正式绑定独立域名、备案、SSL、Nginx、表单后端和回滚流程见 `DEPLOY.md`。

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
- `YACI_REFERENCE_FRAMEWORK.md`：对标雅瓷公开框架后的企业站拆解、三路 Codex 分工和完整执行流程。
- `404.html`：错误页。

## 已完成能力

- 多级导航：覆盖“关于我们 / 产品中心 / 行业应用 / 新闻资源 / 人才招聘 / 联系我们”结构。
- 首页框架：已补充企业站常见的全屏轮播首屏、透明固定导航、品牌能力说明、产品入口和询盘 CTA。
- 响应式布局：支持桌面端和移动端菜单。
- 询盘转化：联系页表单当前通过 `mailto:` 生成邮件询盘内容。
- 产品详情：新增面向搜索和销售转发的产品详情页，用于承接型号参数、应用、测试和报价。
- SEO 基础：每页包含标题、描述，并已配置 `robots.txt` 和 `sitemap.xml`。
- 视觉资产：使用本地 SVG 示意图，避免外链图片失效。
- 部署文档：`DEPLOY.md` 覆盖 GitHub Pages、`gh-pages`、独立服务器、备案、SSL、Nginx、表单后端、回滚和上线检查。
- 流程文档：`SITE_BUILD_PROCESS.md` 说明从静态站到正式官网的构建、上线和维护节奏，并明确“总控 + 3 个 Codex”的协作分工。
- 对标框架：新增 `YACI_REFERENCE_FRAMEWORK.md`，单独沉淀参考站公开栏目、首页节奏、转化路径、服务器阶段和上线清单。

## Codex 协作分工

本项目按三个专项 Codex 拆解，最后由总控合并、检查、提交和推送：

- Codex A：内容与信息架构，负责页面树、栏目、SEO、CTA、真实资料替换清单。
- Codex B：前端视觉与交互，负责首页轮播、导航、响应式、产品/案例/FAQ/表单体验。
- Codex C：部署运维，负责 GitHub Pages、`gh-pages`、服务器、备案、SSL、Nginx、表单后端、检查和回滚。
- 总控：负责审查三方建议、保持文件一致性、本地验收、提交到 `main` 并同步发布到 `gh-pages`。

详细任务包见 `YACI_REFERENCE_FRAMEWORK.md`，该文档可直接作为后续继续派发给 3 个 Codex 的工作说明。

## 本地预览

该站点没有构建步骤，直接用静态服务器预览即可：

```powershell
cd "D:\Users\Lenovo\Documents\网页\ceramic-membrane-site"
python -m http.server 8080
```

浏览器访问：

```text
http://localhost:8080/
```

上线前建议逐页检查首页、产品、产品详情、应用、案例、新闻、FAQ、招聘、联系页和 `404.html`。

## GitHub Pages 发布策略

当前建议把 GitHub Pages 作为预发布或轻量线上环境：

- `main`：保存网站源文件和运维文档。
- `gh-pages`：作为 GitHub Pages 发布分支，内容与本静态站根目录一致。
- `.nojekyll`：确保 GitHub Pages 按普通静态文件提供服务。
- GitHub 仓库设置：`Settings -> Pages -> Deploy from a branch -> gh-pages -> / (root)`。

手工发布命令见 `DEPLOY.md`。发布前务必先完成本地预览、链接检查和表单检查。

## 独立服务器生产策略

正式企业官网建议迁移到独立服务器，推荐路线：

- 域名先完成 ICP 备案；如果服务器在中国大陆，还需要按服务商和所在地要求完成接入备案。
- DNS 解析到服务器公网 IP，开放 80 和 443 端口。
- Ubuntu LTS + Nginx 托管静态文件。
- Certbot / Let's Encrypt 配置 HTTPS，并启用自动续期检查。
- 使用 `releases/` + `current` 软链接管理版本，实现秒级回滚。
- 表单从 `mailto:` 升级为后端 API、CRM、企业邮箱 SMTP 或第三方表单服务。
- 每次上线记录提交哈希、发布时间、检查人、回滚点和验证结果。

## 上线前必须替换

1. 把“陶瓷膜科技”替换为正式公司名或品牌名。
2. 替换 Logo、电话、邮箱、地址、微信二维码和地图。
3. 用真实产品型号、参数、图片和样册替换占位内容。
4. 用真实案例替换 `cases.html` 中的案例模板。
5. 把资质、专利、检测报告和合作证明补入 `honor.html` 与 `resources.html`。
6. 把招聘岗位和 HR 邮箱补入 `jobs.html`。
7. 增加备案号、隐私政策、表单授权声明和必要的版权信息。
8. 根据正式域名更新 `sitemap.xml`、`robots.txt`、页面 canonical 信息和 GitHub Pages 的 `CNAME` 文件。
9. 将 `contact.html` 的 `data-mailto="contact@example.com"` 替换为正式收件邮箱，或改接后端表单接口。

## 文件结构

```text
.
|-- index.html
|-- about.html
|-- founder.html
|-- culture.html
|-- rd.html
|-- honor.html
|-- products.html
|-- product-detail.html
|-- applications.html
|-- cases.html
|-- support.html
|-- resources.html
|-- news.html
|-- faq.html
|-- jobs.html
|-- contact.html
|-- site-process.html
|-- SITE_BUILD_PROCESS.md
|-- DEPLOY.md
|-- sitemap.xml
|-- robots.txt
`-- assets
    |-- css/style.css
    |-- js/main.js
    `-- img/
```

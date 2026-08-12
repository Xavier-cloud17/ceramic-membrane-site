# 陶瓷膜企业网站搭建流程

本文档用于把当前静态站持续升级为可正式上线的企业官网，并明确内容、前端、部署运维三条工作线的交付边界。参考对象为成熟 B2B 企业站的信息架构和转化路径，不复制任何第三方代码、素材或文案。

## 1. 当前阶段定位

当前仓库已经具备静态官网原型能力：

- 首页、关于我们、产品中心、产品详情、行业应用、案例、支持、资料、新闻、FAQ、招聘和联系页已建立。
- `sitemap.xml` 和 `robots.txt` 已包含当前 GitHub Pages 预发布地址。
- `contact.html` 具备询盘表单，但仍是 `mailto:` 临时方案。
- GitHub Pages 可作为预发布环境，独立服务器作为正式生产环境。

后续重点不是继续堆页面，而是替换真实内容、确定正式域名、完成备案/SSL、接入表单后端并建立上线检查和回滚机制。

## 2. 参考站框架拆解

成熟陶瓷膜/B2B 工业企业站通常包含：

- 顶部信息条：品牌口号、电话、邮箱。
- 固定头部：Logo、多级导航、移动端菜单。
- 首页模块：多屏首屏轮播、公司简介、能力数据、产品展示、研发实力、应用场景、资质荣誉、新闻动态、FAQ、询价表单和底部联系。
- 关于我们：创始人寄语、公司简介、企业文化、研发实力、资质荣誉。
- 产品中心：产品大类、产品详情、关键参数、应用场景、询价入口。
- 产品详情页：产品结构图、参数表、适用行业、资料下载、小试中试、报价 CTA。
- 行业应用：按场景解释客户问题、解决方案和应用价值。
- 新闻资讯：公司新闻、行业资讯、技术文章、常见问题。
- 人才招聘：人才理念、招聘职位。
- 联系我们：联系方式、地图/二维码、项目询盘表单。

本次对标雅瓷公开官网后，额外沉淀了独立文档 `YACI_REFERENCE_FRAMEWORK.md`，用于记录参考站顶部信息条、多级栏目、首页轮播、数字背书、产品展示、研发实力、行业应用、荣誉证书、新闻 FAQ、页脚联系和产品询价表单的完整框架。该文档同时给出“总控 + 3 个 Codex”的任务包，后续可以直接继续派发。

本项目对标参考站时，学习其框架逻辑而不复制代码、图片或文案：

- 首屏以 3-4 组轮播承接品牌定位、核心产品、系统能力和实验验证能力。
- 导航保持“关于我们 / 产品中心 / 行业应用 / 新闻资源 / 人才招聘 / 联系我们”的多级结构。
- 首页按“信任建立 -> 产品理解 -> 技术能力 -> 应用场景 -> 荣誉背书 -> 内容更新 -> 问题答疑 -> 询盘转化”排序。
- 产品页按“产品大类 -> 详情页 -> 参数/应用/资料/询价”组织，方便销售转发和搜索收录。
- 联系表单保持短字段优先，生产环境再接入 CRM、企业微信、邮件或自建 API。

## 3. 页面与内容清单

当前仓库页面：

- `index.html`：首页，承接产品、应用、案例、流程和询盘入口。
- `about.html`、`founder.html`、`culture.html`、`rd.html`、`honor.html`：关于我们栏目组。
- `products.html`：产品中心。
- `product-detail.html`：陶瓷管式膜产品详情页，承接产品参数、应用、小试中试和询价。
- `applications.html`：行业应用。
- `cases.html`：项目案例。
- `support.html`：服务支持。
- `resources.html`：资料中心。
- `news.html`：新闻资讯。
- `faq.html`：常见问题。
- `jobs.html`：人才招聘。
- `contact.html`：项目询盘与联系信息。
- `site-process.html`：网页化搭建流程摘要。
- `404.html`：错误页。

上线前必须替换的资料：

- 公司名称、Logo、品牌色、口号。
- 电话、邮箱、微信、地址、地图、二维码。
- 产品型号、孔径、膜面积、材质、通量范围、pH、温度、清洗条件。
- 产品详情页真实型号图、剖面图、参数表、测试条件和资料下载链接。
- 产品照片、设备照片、车间照片、团队照片。
- 真实案例：行业、处理量、水质、工艺、运行周期、客户反馈。
- 资质证书、检测报告、专利、认证、合作证明。
- 新闻文章、招聘岗位、企业文化原文。
- 备案号、隐私政策、表单授权声明。

## 4. 三条工作线

### 4.1 内容与信息架构

负责人关注：

- 页面树、导航层级、面包屑命名和 CTA 路径。
- 每页 SEO 标题、描述、关键词和目标询盘动作。
- 真实产品、案例、资质、新闻、招聘和联系信息替换。
- 表单字段与销售线索字段统一。

交付物：

- 页面内容替换表。
- 产品参数表和资料下载清单。
- 案例素材清单。
- SEO 标题/描述清单。

### 4.2 前端页面与交互

负责人关注：

- HTML/CSS/JS 静态站结构。
- 响应式多级导航、产品卡片、详情页参数表、FAQ、新闻列表和联系表单。
- 移动端可读性和点击区域。
- 所有图片本地化或可靠托管，避免外链失效。

交付物：

- 可本地预览的静态页面。
- 移动端和桌面端检查结果。
- 页面链接和 404 检查结果。

### 4.3 部署运维线

负责人关注：

- GitHub `main` 和 `gh-pages` 的发布流程。
- GitHub Pages 预发布配置。
- `README.md`、`DEPLOY.md`、`SITE_BUILD_PROCESS.md`、`sitemap.xml`、`robots.txt` 持续更新。
- 独立服务器 Nginx、域名、备案、HTTPS、缓存、安全头、日志和备份。
- 表单后端、上线检查、发布记录和回滚演练。

交付物：

- 可执行部署手册。
- 生产服务器 Nginx 配置。
- 上线检查清单。
- 回滚步骤和发布记录模板。

## 5. 三个 Codex 总控分工

本项目采用“1 个总控 + 3 个专项 Codex”的协作方式。总控负责最终判断、合并、验收、提交和发布，专项 Codex 只负责审查和产出可合并建议，避免多人同时覆盖同一文件。

本轮任务分配如下：

- Codex A：内容与信息架构，沉淀 `README.md`、`SITE_BUILD_PROCESS.md`、`YACI_REFERENCE_FRAMEWORK.md` 的页面树、真实资料清单和 SEO/CTA 路径。
- Codex B：前端视觉与交互，负责 `index.html`、`assets/css/style.css`、`assets/js/main.js` 的首页轮播、顶部信息条、悬浮咨询入口和移动端体验。
- Codex C：页面与部署运维，负责产品、应用、案例、联系、资料、流程、sitemap、GitHub Pages 和未来服务器部署路线。
- 总控：统一检查、解决冲突、本地验收、提交 `main` 并同步 `main:gh-pages`。

### 5.1 Codex A：内容与信息架构

任务范围：

- 对照参考站检查页面树、导航层级、栏目命名、SEO 标题/描述和 CTA 路径。
- 梳理需要替换的真实公司资料、产品参数、案例、资质、新闻、招聘和联系方式。
- 输出首页、产品页、应用页、联系页的内容补强建议。

验收标准：

- 每个核心页面都有明确的访问目的和询盘转化动作。
- 文案不照搬参考站，统一转化为本公司陶瓷膜业务表达。
- 必须列出上线前仍需用户补充的真实资料。

### 5.2 Codex B：前端视觉与交互

任务范围：

- 检查首页轮播、固定导航、移动端菜单、产品卡片、FAQ、案例和联系表单体验。
- 补强桌面端与移动端响应式布局、图片占位、按钮状态和无障碍属性。
- 输出需要修改的 HTML/CSS/JS 文件和可验证的本地预览步骤。

验收标准：

- 首页首屏接近成熟企业站的完整视觉结构。
- 核心入口在桌面端和移动端都可点击、可读、不卡版。
- 不引入外链失效风险，图片优先本地化或后续替换为自有素材。

### 5.3 Codex C：部署运维

任务范围：

- 检查 `main`、`gh-pages`、`.nojekyll`、`sitemap.xml`、`robots.txt` 和发布命令。
- 完善 GitHub Pages 预发布、正式域名、备案、SSL、Nginx、表单后端、上线检查和回滚流程。
- 输出每次发布前后的检查清单。

验收标准：

- GitHub Pages 能作为预发布环境。
- 独立服务器上线流程可按版本目录和 `current` 软链接回滚。
- 文档中必须明确哪些事项等后期租服务器、备案和正式域名确定后再执行。

### 5.4 总控合并流程

1. 总控先锁定本地仓库状态，确认没有未识别的用户改动。
2. 三个 Codex 分别审查内容、前端和部署，不直接推送远端。
3. 总控读取三方建议，合并到本地项目文件。
4. 本地检查核心页面、链接、静态资源、文档和 Git 状态。
5. 总控提交到 `main`，再同步推送 `main:gh-pages`。
6. 推送后检查 GitHub Pages 最新提交、首页、产品详情页、联系页、sitemap、robots 和 404。

## 6. GitHub Pages 阶段流程

GitHub Pages 用于预发布和静态验收。

1. 本地完成页面和文档修改。
2. 启动本地静态服务器，逐页检查。
3. 确认 `sitemap.xml` 和 `robots.txt` 仍指向当前预发布地址。
4. 提交到 `main`。
5. 发布负责人推送 `main` 到远端。
6. 发布负责人推送 `main:gh-pages`。
7. 在 GitHub `Settings -> Pages` 确认发布源为 `gh-pages / root`。
8. 访问 GitHub Pages 地址检查首页、产品详情、联系页、sitemap、robots 和 404。

发布命令示例：

```powershell
cd "D:\Users\Lenovo\Documents\网页\ceramic-membrane-site"
git status --short --branch
git add .
git commit -m "Update corporate website"
git push origin main
git push origin main:gh-pages
```

推送后等待 GitHub Pages 缓存刷新，再检查线上首页、产品详情页、联系页、sitemap 和 robots。

## 7. 正式域名与备案流程

正式域名前置事项：

1. 选择主域名，例如 `example.com` 或 `www.example.com`。
2. 完成域名实名认证。
3. 如果使用中国大陆服务器，通过接入服务商提交 ICP 备案。
4. 备案通过后，在网站页脚展示备案号。
5. 如需公安联网备案，按所在地要求继续办理并展示公安备案号。
6. 将正式域名写入 `sitemap.xml`、`robots.txt`、页面 canonical 和站长平台。
7. DNS 解析到生产服务器公网 IP。

注意：

- 备案未完成前，不建议把中国大陆服务器绑定为正式公开域名。
- GitHub Pages 自定义域名应先在 Pages 设置里添加域名，再配置 DNS。
- 自定义域名生效后应开启 HTTPS，避免 HTTP 与 HTTPS 混用。

## 8. 独立服务器上线流程

推荐生产结构：

```text
/var/www/ceramic-membrane-site/
|-- releases/
|   |-- 20260811-1530-<git-sha>/
|   `-- 20260820-1010-<git-sha>/
|-- current -> /var/www/ceramic-membrane-site/releases/20260820-1010-<git-sha>
`-- backups/
```

上线步骤：

1. 购买服务器，安装 Ubuntu LTS。
2. 开放 80/443，限制 SSH 管理来源。
3. 安装 Nginx、Git、rsync、curl。
4. 上传或拉取站点文件到新的 release 目录。
5. 更新 `current` 软链接指向新 release。
6. 配置 Nginx root 到 `/var/www/ceramic-membrane-site/current`。
7. 执行 `sudo nginx -t`。
8. 执行 `sudo systemctl reload nginx`。
9. 配置 Certbot/Let's Encrypt 证书。
10. 执行 `sudo certbot renew --dry-run`。
11. 检查 HTTPS、404、静态资源缓存、安全头和日志。

Nginx 最小配置和 HTTPS 配置见 `DEPLOY.md`。

## 9. 表单后端升级流程

当前 `contact.html` 的 `mailto:` 方案只适合演示。正式上线建议按以下顺序升级：

1. 确认销售线索字段：姓名、公司、电话、邮箱、行业、处理量、需求描述、附件需求、来源页面。
2. 选择承接系统：企业邮箱、CRM、企业微信机器人、Serverless 表单或自建 API。
3. 建立后端接口，例如 `POST /api/inquiries`。
4. 前端表单从 `mailto:` 改为 `fetch()` 提交。
5. 后端完成校验、反垃圾、限流、通知和日志。
6. 页面增加隐私授权声明。
7. 上线前测试成功提交、失败提示、重复提交、恶意输入和通知送达。

最低运维要求：

- SMTP/Webhook/CRM Token 只能放后端环境变量。
- 表单日志不记录敏感密钥。
- 失败提交可追踪，重要线索有重试机制。
- 每周抽查表单通知链路。

## 10. 回滚与发布记录

### 9.1 发布记录模板

```text
发布时间：
发布人：
检查人：
Git SHA：
环境：GitHub Pages / 生产服务器
修改范围：
上线前检查结果：
回滚点：
上线后检查结果：
备注：
```

### 9.2 GitHub Pages 回滚

```powershell
git log --oneline --decorate --all -20
git push origin <previous-good-sha>:gh-pages --force-with-lease
```

如果 `main` 也需要回退，优先使用 `git revert` 生成反向提交。

### 9.3 生产服务器回滚

```bash
sudo ln -sfn /var/www/ceramic-membrane-site/releases/<previous-good-release> /var/www/ceramic-membrane-site/current
sudo nginx -t
sudo systemctl reload nginx
```

回滚后检查：首页、产品页、联系页、表单通知、HTTPS、日志和 404。

## 11. 上线检查节奏

每次上线前：

- 运行本地预览。
- 检查所有核心页面和导航。
- 检查移动端布局。
- 检查 `sitemap.xml`、`robots.txt`、canonical 和正式域名。
- 检查备案号、隐私政策和表单授权声明。
- 检查 Nginx 配置、SSL 证书、日志和回滚点。
- 检查表单通知链路。

每次上线后：

- 记录发布信息。
- 检查访问日志和错误日志。
- 访问核心页面确认 200。
- 提交 sitemap 到搜索引擎站长平台。
- 保留本次 release，至少保留最近 3 个可回滚版本。

长期维护：

- 每周检查页面状态、表单和死链。
- 每月检查 SSL、Nginx 日志、sitemap、robots 和页面性能。
- 每季度更新案例、资质、产品参数、新闻和招聘。
- 每次大改先在 GitHub Pages 验收，再生产上线。

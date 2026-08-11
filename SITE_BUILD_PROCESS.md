# 陶瓷膜企业网站搭建流程

本文档用于后续把当前静态站升级为完整企业官网，并在租用服务器后迁移上线。参考对象为雅瓷官网的信息架构和转化路径，但不复制其代码、素材或文案。

## 1. 参考站框架拆解

雅瓷官网的核心不是某个前端框架，而是成熟 B2B 企业站的栏目组织：

- 顶部信息条：品牌口号、电话、邮箱。
- 固定头部：Logo、多级导航、移动端菜单。
- 首页模块：首页首屏、公司简介、产品展示、应用场景、资质荣誉、新闻动态、底部联系。
- 关于我们：创始人寄语、公司简介、企业文化、研发实力、资质荣誉。
- 产品中心：产品大类、产品详情、关键参数、应用场景、询价入口。
- 产品详情页：产品结构图、参数表、适用行业、资料下载、小试中试、报价 CTA。
- 行业应用：按场景解释客户问题、解决方案和应用价值。
- 新闻资讯：公司新闻、行业资讯、常见问题。
- 人才招聘：人才理念、招聘职位。
- 联系我们：联系方式、地图/二维码、产品询价弹窗或表单。

## 2. 当前网站页面清单

当前仓库已建立以下静态页面：

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
- `SITE_BUILD_PROCESS.md`：完整搭建流程文档。

## 3. 3 个 Codex 任务分配

### Codex A：信息架构与内容

- 提取参考站栏目结构，不复制原站内容。
- 整理陶瓷膜企业站页面树、导航层级和 CTA 路径。
- 准备每页真实内容替换清单：公司简介、创始人寄语、产品参数、产品详情、应用场景、案例、资质、新闻、招聘。
- 输出 SEO 标题、描述、关键词和面包屑命名规范。

### Codex B：前端页面与交互

- 维护 HTML/CSS/JS 静态站结构。
- 实现响应式多级导航、首页模块、产品卡片、产品详情页、应用表格、FAQ、新闻列表和联系表单。
- 控制视觉风格：工业感、专业感、清晰参数展示，不使用参考站素材。
- 检查移动端、桌面端和低网速下的可读性。

### Codex C：部署、GitHub 与服务器

- 维护 GitHub `main` 与 `gh-pages` 发布流程。
- 更新 `sitemap.xml`、`robots.txt`、`README.md`、`DEPLOY.md`。
- 当前阶段发布到 GitHub Pages。
- 租服务器后配置 Nginx、域名、HTTPS、缓存、安全头和日志。
- 建立上线检查清单：链接、表单、SEO、证书、备案、性能、备份和回滚。

## 4. 内容替换清单

上线前必须把占位内容替换为真实资料：

- 公司名称、Logo、品牌色、口号。
- 电话、邮箱、微信、地址、地图、二维码。
- 产品型号、孔径、膜面积、材质、通量范围、pH、温度、清洗条件。
- 产品详情页需要补齐真实型号图、剖面图、参数表、测试条件和资料下载链接。
- 产品照片、设备照片、车间照片、团队照片。
- 真实案例：行业、处理量、水质、工艺、运行周期、客户反馈。
- 资质证书、检测报告、专利、认证、合作证明。
- 新闻文章、招聘岗位、企业文化原文。
- 备案号、隐私政策、表单授权声明。

## 5. GitHub Pages 发布流程

```powershell
cd "D:\Users\Lenovo\Documents\网页\ceramic-membrane-site"
git status --short --branch
git add .
git commit -m "Expand corporate website framework"
git push origin main
git push origin main:gh-pages
```

发布后检查：

- `https://xavier-cloud17.github.io/ceramic-membrane-site/`
- 首页、产品、应用、案例、关于、新闻、FAQ、招聘、联系页面是否返回 200。
- `product-detail.html` 是否可以从首页、产品中心、sitemap 进入。
- 移动端菜单是否可展开。
- `contact.html` 表单是否能生成邮件询盘。
- `sitemap.xml` 是否包含新增页面。

## 6. 未来服务器部署流程

1. 购买云服务器，推荐 2C2G 起步，系统使用 Ubuntu LTS。
2. 购买域名并完成备案。
3. 安装 Nginx：

```bash
sudo apt update
sudo apt install nginx
```

4. 上传站点文件到 `/var/www/ceramic-membrane-site`。
5. 配置 Nginx：

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/ceramic-membrane-site;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

6. 使用 Certbot 配置 HTTPS。
7. 增加缓存、安全头、日志轮转和定期备份。
8. 表单接入企业邮箱、表单服务、CRM 或企业微信机器人。
9. 建立回滚策略：保留上一版站点目录或上一版 Git tag，Nginx root 可快速切回。
10. 建立发布记录：记录发布时间、提交哈希、修改范围、检查人和回滚点。

## 7. 维护节奏

- 每周检查表单、链接、页面状态和 GitHub Pages 发布状态。
- 每月发布至少 1 篇行业/技术文章。
- 每季度更新产品参数、案例和资质。
- 每次上线前执行链接检查、移动端检查、SEO 检查和 GitHub 分支检查。
- 每次正式服务器上线前执行 `nginx -t`、证书检查、备份和回滚演练。

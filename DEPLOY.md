# 发布与服务器部署说明

本文档是陶瓷膜企业官网的部署运维手册，覆盖 GitHub Pages、`gh-pages` 分支、独立服务器、域名备案、SSL、Nginx、表单后端、回滚和上线检查流程。

> 使用建议：先在本地预览和 GitHub Pages 完成验收，再把同一版本发布到正式服务器。

## 1. 环境分层

| 环境 | 用途 | 地址/入口 | 发布方式 |
| --- | --- | --- | --- |
| 本地预览 | 编辑后人工检查 | `http://localhost:8080/` | `python -m http.server 8080` |
| GitHub Pages | 预发布或轻量线上展示 | `https://xavier-cloud17.github.io/ceramic-membrane-site/` | `gh-pages` 分支根目录 |
| 独立服务器 | 正式生产官网 | 待定正式域名 | Nginx + HTTPS + 版本目录 |

GitHub Pages 适合先验收静态页面、SEO、移动端和内容；正式企业官网建议使用独立服务器承载备案域名、表单后端、日志、访问控制和回滚能力。

## 2. GitHub Pages 发布流程

### 2.1 仓库分支约定

- `main`：源文件、静态页面、配置和文档。
- `gh-pages`：GitHub Pages 发布分支。
- `.nojekyll`：保留在站点根目录，避免 GitHub Pages 使用 Jekyll 处理静态文件。

### 2.2 GitHub 仓库设置

在 GitHub 仓库中确认：

1. 打开 `Settings -> Pages`。
2. `Source` 选择 `Deploy from a branch`。
3. `Branch` 选择 `gh-pages`。
4. 文件夹选择 `/ (root)`。
5. 保存后等待 Pages 构建完成。

### 2.3 本地预发布检查

```powershell
cd "D:\Users\Lenovo\Documents\网页\ceramic-membrane-site"
git status --short --branch
python -m http.server 8080
```

浏览器检查：

- `/`
- `/products.html`
- `/product-detail.html`
- `/applications.html`
- `/cases.html`
- `/about.html`
- `/news.html`
- `/faq.html`
- `/jobs.html`
- `/contact.html`
- `/sitemap.xml`
- `/robots.txt`
- 一个不存在的地址，例如 `/missing-page.html`，确认能看到 `404.html`。

### 2.4 手工发布命令

确认本地检查通过后，由发布负责人执行：

```powershell
cd "D:\Users\Lenovo\Documents\网页\ceramic-membrane-site"
git status --short --branch
git add .
git commit -m "Update corporate website deployment docs"
git push origin main
git push origin main:gh-pages
```

也可以使用脚本，但发布前先 dry run：

```powershell
.\publish-to-github-pages.ps1 `
  -RemoteUrl "https://github.com/Xavier-cloud17/ceramic-membrane-site.git" `
  -CommitMessage "Update corporate website" `
  -DryRun
```

真实发布时去掉 `-DryRun`，并在推送后检查 `main` 与 `gh-pages` 是否指向同一最新提交。

### 2.5 GitHub Pages 自定义域名

如果短期继续使用 GitHub Pages 承载正式域名：

1. 先在 GitHub Pages 的 `Custom domain` 中添加域名，避免 DNS 先指向导致子域接管风险。
2. 如使用根域名 `example.com`，在 DNS 配置 A/ALIAS/ANAME；如使用 `www.example.com`，配置 CNAME 到 `xavier-cloud17.github.io`，不要带仓库名。
3. 保存后拉取 GitHub 自动生成或更新的 `CNAME` 文件，确保本地仓库同步。
4. DNS 生效后勾选 `Enforce HTTPS`。
5. 更新 `sitemap.xml`、`robots.txt` 和页面 canonical 为正式域名。
6. 不使用通配符 DNS 记录，例如 `*.example.com`。

## 3. 域名备案与上线顺序

如果正式域名解析到中国大陆服务器，应在上线前完成 ICP 备案流程。推荐顺序：

1. 购买域名并完成实名认证。
2. 购买中国大陆云服务器，取得服务商备案服务号或备案码。
3. 通过服务器接入商提交主体信息、网站信息、负责人信息和真实性核验材料。
4. 备案通过后，将备案号加入网站页脚，常见格式如“粤ICP备XXXXXXXX号”。
5. 根据所在地和服务商要求，继续办理公安联网备案，并在页脚展示公安备案号及链接。
6. 备案未完成前，不要把中国大陆服务器绑定为正式公开访问域名；可继续使用 GitHub Pages 或临时测试域名做内部验收。
7. 如果服务器在中国大陆以外，仍需确认目标市场、域名注册商和客户访问地区的合规要求。

备案材料通常包括营业执照、主体负责人证件、网站负责人证件、域名证书、服务器接入信息、网站名称、网站首页地址、服务内容说明和真实性核验资料。最终以接入服务商和工信部系统要求为准。

## 4. 独立服务器部署流程

### 4.1 服务器准备

推荐配置：

- 系统：Ubuntu LTS。
- 规格：企业静态站 2C2G 起步，后续按访问量扩容。
- 端口：安全组开放 80、443；SSH 限制到管理员 IP。
- 用户：创建非 root 运维用户，授予必要 sudo 权限。
- 目录：使用版本化目录，避免直接覆盖生产目录。

目录建议：

```text
/var/www/ceramic-membrane-site/
|-- releases/
|   `-- 20260811-1530-<git-sha>/
|-- current -> /var/www/ceramic-membrane-site/releases/20260811-1530-<git-sha>
`-- backups/
```

### 4.2 安装基础组件

```bash
sudo apt update
sudo apt install -y nginx git rsync curl
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 4.3 首次部署静态文件

方式 A：服务器拉取 Git 仓库。

```bash
sudo mkdir -p /var/www/ceramic-membrane-site/releases
cd /var/www/ceramic-membrane-site/releases
sudo git clone https://github.com/Xavier-cloud17/ceramic-membrane-site.git 20260811-1530-<git-sha>
sudo ln -sfn /var/www/ceramic-membrane-site/releases/20260811-1530-<git-sha> /var/www/ceramic-membrane-site/current
```

方式 B：本地打包后用 `rsync` 上传。

```bash
rsync -avz --delete ./ deploy@example.com:/var/www/ceramic-membrane-site/releases/20260811-1530-<git-sha>/
```

### 4.4 Nginx HTTP 配置

证书申请前先启用 HTTP 配置，确保域名能访问到服务器：

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;

    root /var/www/ceramic-membrane-site/current;
    index index.html;

    access_log /var/log/nginx/ceramic-membrane-site.access.log;
    error_log /var/log/nginx/ceramic-membrane-site.error.log warn;

    location / {
        try_files $uri $uri/ =404;
    }

    error_page 404 /404.html;
}
```

配置文件建议放在：

```text
/etc/nginx/sites-available/ceramic-membrane-site
```

启用并检查：

```bash
sudo ln -s /etc/nginx/sites-available/ceramic-membrane-site /etc/nginx/sites-enabled/ceramic-membrane-site
sudo nginx -t
sudo systemctl reload nginx
```

### 4.5 SSL / HTTPS

确认 DNS 已解析到服务器公网 IP，80 端口可访问后，使用 Certbot：

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
sudo certbot renew --dry-run
```

证书签发后建议把 HTTP 强制跳转到 HTTPS，并保留静态资源缓存、安全头和 404：

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name example.com www.example.com;

    root /var/www/ceramic-membrane-site/current;
    index index.html;

    access_log /var/log/nginx/ceramic-membrane-site.access.log;
    error_log /var/log/nginx/ceramic-membrane-site.error.log warn;

    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    location /assets/ {
        try_files $uri =404;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
    }

    location / {
        try_files $uri $uri/ =404;
        add_header Cache-Control "no-cache";
    }

    error_page 404 /404.html;
}
```

如果页面中出现 `http://` 图片、CSS 或 JS，会造成混合内容问题；上线前用全文搜索确认外链均为 `https://` 或本地相对路径。

## 5. 表单后端方案

当前 `contact.html` 使用：

```html
data-mailto="contact@example.com"
```

这是临时方案，适合早期演示，不适合正式获客。正式上线建议选一条路径：

| 方案 | 适用场景 | 要点 |
| --- | --- | --- |
| 企业邮箱 SMTP 后端 | 希望询盘直接进邮箱 | 后端保存最小数据，发送邮件给销售/客服 |
| CRM 表单 | 已有销售系统 | 表单字段映射到客户、行业、处理量、需求描述 |
| 企业微信机器人 | 希望即时提醒 | 后端校验后推送到企业微信群 |
| Serverless 表单 | 不想维护服务器应用 | 使用云函数或托管表单服务 |
| 自建 API | 需要完整线索库 | 数据库、权限、反垃圾、日志、备份都要配套 |

生产表单最低要求：

- 前端字段校验：姓名、电话/邮箱、行业、处理量、需求描述。
- 后端校验：字段长度、邮箱/手机号格式、非法字符、重复提交。
- 反垃圾：隐藏 honeypot 字段、IP 限速、验证码或 Turnstile。
- 隐私合规：提交按钮附近增加授权声明，说明用途、保存期限和联系方式。
- 通知链路：邮件/企业微信/CRM 至少一条成功；失败要记录日志并可重试。
- 安全：SMTP 密码、Webhook、CRM Token 只放在后端环境变量，不能写进前端 JS。

如使用自建 Node/PHP/Python API，Nginx 可增加反向代理：

```nginx
location /api/inquiries {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## 6. 回滚流程

### 6.1 GitHub Pages 回滚

先查找上一版提交：

```powershell
git log --oneline --decorate --all -20
```

如果只是发布分支异常，可以把 `gh-pages` 回到上一版：

```powershell
git push origin <previous-good-sha>:gh-pages --force-with-lease
```

如果 `main` 也需要回滚，优先使用 `git revert <bad-sha>` 生成反向提交，再按正常流程发布。除非发布负责人确认，不要使用破坏性的历史重写。

### 6.2 独立服务器回滚

每次部署前保留上一版 `current` 指向：

```bash
readlink -f /var/www/ceramic-membrane-site/current
```

回滚到上一版 release：

```bash
sudo ln -sfn /var/www/ceramic-membrane-site/releases/<previous-good-release> /var/www/ceramic-membrane-site/current
sudo nginx -t
sudo systemctl reload nginx
```

如果本次同时修改了 Nginx 配置，先恢复配置备份：

```bash
sudo cp /etc/nginx/sites-available/ceramic-membrane-site.bak /etc/nginx/sites-available/ceramic-membrane-site
sudo nginx -t
sudo systemctl reload nginx
```

回滚后检查首页、产品页、联系页、表单通知、证书和日志。

## 7. 上线检查清单

### 7.1 内容与页面

- 所有占位公司名、电话、邮箱、地址、二维码、地图已替换。
- 产品型号、参数、图片、样册、案例和资质均为真实内容。
- 首页、产品、产品详情、应用、案例、支持、资料、新闻、FAQ、招聘、联系页可访问。
- 桌面端和移动端导航均可使用。
- 404 页面正常显示。

### 7.2 SEO 与索引

- 每页 title、description 与页面内容一致。
- `sitemap.xml` 使用正式域名并包含所有可索引页面。
- `robots.txt` 的 Sitemap 地址指向正式域名。
- 页面 canonical 与正式访问地址一致。
- 正式域名上线后提交 sitemap 到搜索引擎站长平台。

### 7.3 域名、备案与 SSL

- 域名实名认证已完成。
- ICP 备案号已取得，并展示在页脚。
- 中国大陆服务器已完成接入备案；如需公安联网备案，已完成并展示。
- DNS A/CNAME 记录正确，TTL 已确认。
- HTTPS 证书有效，HTTP 自动跳转 HTTPS。
- `certbot renew --dry-run` 通过。

### 7.4 Nginx 与服务器

- `nginx -t` 通过。
- 80、443 端口开放，SSH 仅限管理员来源。
- 静态资源缓存策略已启用。
- 安全响应头已启用。
- access/error 日志路径可写，日志轮转已配置。
- 最近一次发布的 release 目录、Git SHA 和发布时间已记录。

### 7.5 表单与线索

- 表单不再使用 `contact@example.com`。
- 表单提交后销售/客服能收到通知。
- 必填字段、异常输入、重复提交和垃圾提交均已测试。
- 用户授权声明已展示。
- 后端日志不泄露 SMTP 密码、Token 或客户敏感信息。

### 7.6 回滚与发布记录

- 上一版 release 可用。
- GitHub Pages 上一版提交哈希已记录。
- 独立服务器 `current` 软链接可快速切回。
- 本次上线检查人、发布时间、修改范围、回滚点和验证结果已记录。

## 8. 运维节奏

- 每周：检查页面状态、表单通知、404、核心链接和 GitHub Pages 发布状态。
- 每月：检查 SSL 续期、Nginx 日志、sitemap、robots、死链和页面性能。
- 每季度：更新产品参数、案例、资质、新闻和招聘信息。
- 每次大改：先 GitHub Pages 预发布验收，再安排正式域名窗口上线。
- 每次服务器发布：先备份/记录当前 release，再发布，再检查，再保留回滚点。

## 9. 官方参考

- GitHub Pages 发布源和自定义域名：`https://docs.github.com/en/pages`
- 工信部互联网网站备案办事指南：`https://gzca.miit.gov.cn/zwgk/hlwgl/zcfg/art/2017/art_45159685c81c4b6d8df29845abf3fed8.html`
- Certbot Nginx 证书说明：`https://certbot.eff.org/instructions?ws=nginx`

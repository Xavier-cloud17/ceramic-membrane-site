# 发布与服务器部署说明

本文档说明当前 GitHub Pages 发布方式，以及后续租用服务器后的部署路线。

## 当前发布方式：GitHub Pages

当前项目是静态网站，不需要数据库或后端即可运行。仓库使用两个分支：

- `main`：保存网站源文件。
- `gh-pages`：GitHub Pages 发布分支。

线上地址：

```text
https://xavier-cloud17.github.io/ceramic-membrane-site/
```

## 本地发布命令

```powershell
cd "D:\Users\Lenovo\Documents\网页\ceramic-membrane-site"
git status --short --branch
git add .
git commit -m "Update corporate website"
git push origin main
git push origin main:gh-pages
```

推送后等待 GitHub Pages 缓存刷新，通常需要几十秒到数分钟。

## 发布后检查清单

- 首页可访问：`/`
- 核心页面可访问：`products.html`、`applications.html`、`cases.html`、`about.html`、`contact.html`
- 新增页面可访问：`founder.html`、`culture.html`、`rd.html`、`honor.html`、`news.html`、`faq.html`、`jobs.html`、`site-process.html`
- 移动端导航可展开，下拉栏目可点击。
- 联系表单能生成邮件询盘。
- `sitemap.xml` 包含所有新增页面。
- GitHub 远端 `main` 与 `gh-pages` 指向同一最新提交。

## 服务器部署路线

后续租服务器后，建议使用 Nginx 部署静态站。

### 1. 服务器准备

- 云服务器：2C2G 起步即可。
- 系统：Ubuntu LTS。
- 域名：完成备案后解析到服务器公网 IP。
- 安全组：开放 80 和 443 端口。

### 2. 安装 Nginx

```bash
sudo apt update
sudo apt install nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 3. 上传网站文件

推荐路径：

```text
/var/www/ceramic-membrane-site
```

可通过 Git 拉取：

```bash
cd /var/www
sudo git clone https://github.com/Xavier-cloud17/ceramic-membrane-site.git
```

### 4. Nginx 配置示例

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

配置后执行：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 5. HTTPS

建议使用 Certbot：

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
```

### 6. 表单升级

当前 `contact.html` 表单使用 `mailto:` 生成邮件。正式上线后建议接入：

- 企业邮箱 SMTP
- CRM 表单
- 企业微信机器人
- 自建后端 API
- 第三方表单服务

### 7. 运维建议

- 每次上线前先在 GitHub Pages 验证。
- 每月检查链接、表单、证书和 sitemap。
- 每季度更新案例、资质、产品参数和新闻。
- 每次替换真实资料后重新检查移动端展示。

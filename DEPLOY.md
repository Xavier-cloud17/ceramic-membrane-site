# 如何让每台电脑都能打开这个网页

现在这些文件只能在你的电脑本地打开，是因为它们还没有放到公网服务器上。要让任何电脑、手机、客户都能打开，需要把整个文件夹发布到一个“静态网站托管平台”，平台会给你一个网址。

## 推荐方式：GitHub Pages

适合长期维护，也方便以后继续让我帮你改。

1. 注册或登录 GitHub。
2. 新建一个仓库，例如 `ceramic-membrane-site`。
3. 把本文件夹里的所有文件上传到仓库根目录，必须包含 `index.html`。
4. 进入仓库 `Settings` → `Pages`。
5. Source 选择 `Deploy from a branch`。
6. Branch 选择 `gh-pages`，目录选择 `/root`。
7. 保存后等待几分钟，GitHub 会生成一个网址。

发布成功后，别人只要访问这个网址，就可以在任意电脑上打开网页。

## 当前项目的发布方式

当前仓库已经按 `gh-pages` 分支发布。也就是说：

- `main` 分支保存你平时编辑的网站源文件。
- `gh-pages` 分支保存 GitHub Pages 实际发布的网站文件。
- 访问地址是 `https://xavier-cloud17.github.io/ceramic-membrane-site/`。

## 用脚本推送到 GitHub

项目里已经加入 `publish-to-github-pages.ps1`。你只需要先在 GitHub 新建一个空仓库，然后把仓库地址填进去。脚本会同时推送 `main` 分支和 `gh-pages` 发布分支。

示例：

```powershell
.\publish-to-github-pages.ps1 `
  -RemoteUrl "https://github.com/你的用户名/ceramic-membrane-site.git" `
  -AuthorName "你的名字" `
  -AuthorEmail "你的邮箱"
```

如果想先预演，不真正提交或推送，可以加 `-DryRun`：

```powershell
.\publish-to-github-pages.ps1 `
  -RemoteUrl "https://github.com/你的用户名/ceramic-membrane-site.git" `
  -AuthorName "你的名字" `
  -AuthorEmail "你的邮箱" `
  -DryRun
```

如果你使用 SSH 地址，也可以这样写：

```powershell
.\publish-to-github-pages.ps1 `
  -RemoteUrl "git@github.com:你的用户名/ceramic-membrane-site.git" `
  -AuthorName "你的名字" `
  -AuthorEmail "你的用户名@users.noreply.github.com"
```

推送时如果 GitHub 弹出登录或授权窗口，请在浏览器里确认。不要把密码或 Token 发给任何人。

## 更简单方式：Netlify

适合最快看到公网效果。

1. 注册或登录 Netlify。
2. 选择添加新站点。
3. 上传这个网站文件夹，或连接 GitHub 仓库。
4. 构建命令留空，发布目录填写 `.`。
5. 发布后 Netlify 会生成一个临时域名。

项目中已经有 `netlify.toml`，Netlify 会把当前目录当作静态网站发布。

## 另一个方式：Vercel

适合以后升级成 React 或更复杂网站。

1. 注册或登录 Vercel。
2. 导入 GitHub 仓库。
3. Framework 选择 `Other` 或静态项目。
4. 构建命令留空，输出目录填写 `.`。
5. 发布后 Vercel 会生成一个临时域名。

项目中已经有 `vercel.json`，Vercel 会按静态站点处理。

## 绑定自己的域名

如果你希望客户访问类似 `www.yourcompany.com` 的网址，需要：

1. 购买或已有域名。
2. 在托管平台里添加自定义域名。
3. 按平台提示去域名服务商修改 DNS。
4. 等待解析生效。

不要在没有确定域名之前新建 `CNAME` 文件；等域名确定后再添加。

## 发布前最后检查

- 首页文件必须叫 `index.html`。
- 所有页面链接都要使用相对路径，例如 `products.html`，不要写成本机路径。
- 图片需要放在 `assets/img/` 里，再用相对路径引用。
- 联系方式、二维码和真实参数发布前最好替换掉占位内容。

## 当前仓库状态

这个项目已经绑定到 GitHub 仓库：

- 仓库：`git@github.com:Xavier-cloud17/ceramic-membrane-site.git`
- 发布分支：`gh-pages`
- 公网地址：`https://xavier-cloud17.github.io/ceramic-membrane-site/`

只要这个公网地址能访问，客户、同事或其他电脑就不需要本地文件，也能直接打开网站。

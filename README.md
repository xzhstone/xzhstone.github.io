# Stone 的个人博客

用纯 HTML / CSS / JavaScript 搭建的静态博客。

## 本地预览

直接用浏览器打开 `index.html` 即可。

## 添加新文章

1. 在 `posts/` 下创建一个 HTML 文件（参考已有文章的模板）
2. 在 `posts/index.json` 中添加一条对应的元记录

## 部署到 GitHub Pages

### 方式一：GitHub Actions（自动部署）

仓库里已经包含了 `.github/workflows/deploy.yml`，你只需要：

1. 在 GitHub 上创建一个仓库（比如 `xzhstone.github.io`）
2. 把代码推送到 `main` 分支
3. 在仓库 Settings → Pages 中：
   - Source 选择 **GitHub Actions**
4. 以后每次 `git push` 都会自动部署

### 方式二：手动设置

1. 在 GitHub 上创建仓库（`xzhstone.github.io`）
2. 推送到 `main` 分支
3. 在仓库 Settings → Pages 中：
   - Source 选择 **Deploy from a branch**
   - Branch 选择 `main`，目录选 `/ (root)`

## 自定义域名

在仓库 Settings → Pages 中配置自定义域名，然后在 `CNAME` 文件中写入你的域名（可选）。

## 许可

MIT

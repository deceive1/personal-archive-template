# Personal Archive · 个人简历网站模板

冷灰与蓝色的档案式个人主页。纯 HTML / CSS / JavaScript，无需安装依赖或构建，可用于个人简历、作品集和求职介绍页。

内置人物、公司、学校、项目、业绩和荣誉均为虚构演示内容。通用 SVG 图形不包含真实人物照片，仓库不附带真实简历或私人项目地址。

## 快速开始

1. 下载本仓库，直接双击 `index.html` 即可预览。
2. 编辑 **`content.js`**，替换示例资料。保存后刷新浏览器即可看到变化。
3. 将自己的照片放进 `assets/`，修改 `profile.portrait` 与 `profile.avatar`。
4. 如需提供简历，将 PDF 放进 `resumes/`，按下方示例配置。

也可以在本目录启动本地预览服务（需要 Python）：

```sh
python -m http.server 4173 --bind 127.0.0.1
```

然后访问 <http://127.0.0.1:4173>。复制功能需要 HTTPS 或 localhost 及浏览器剪贴板权限；直接打开文件时若复制失败，页面会提示手动选择复制。

## 替换内容

`content.js` 使用普通 JavaScript 对象，不需要学习前端框架。保留键名，修改引号中的内容即可。文本不解析 HTML；需要换行时使用 `\n`。文本中的单引号应写为 `\'`，也可以用双引号包裹该段文字。

| 配置项 | 内容 |
| --- | --- |
| `profile` | 姓名、英文名、网页标题与摘要、标志、照片、自我介绍、标签、页脚 |
| `overview` | 首页下方的概览入口 |
| `facts` | 成果数字及其说明 |
| `skills` | 能力卡片、说明与技能列表 |
| `categories` | 项目筛选分类，数量不限 |
| `projects` | 项目卡片、详情弹窗、技术标签、演示与源代码链接 |
| `experience` | 工作 / 实习 / 实践经历 |
| `education` | 学校、专业、时间及校园活动 |
| `honors` | 重点荣誉与其他认证 |
| `contact` | 联系文案、邮箱、电话、GitHub、PDF 简历 |

增删项目或经历时，复制或删除数组中的完整对象。各数组可以为空；项目数量和筛选结果会自动计算。概览默认以三张卡片设计，技能与成果默认以四列设计，增加条目会换行。姓名和段落长度不同可能需要微调版式。

项目的 `id` 应保持唯一，`category` 必须对应 `categories` 中的一个 `id`，不要使用保留分类名 `all`。修改分类后，无需再修改交互代码。`art` 可选 `oa`、`timer`、`home`、`lock`，只是四种抽象封面背景的样式名。

添加项目链接：

```js
links: [
  ['在线演示', 'https://example.com'],
  ['源代码', 'https://github.com/YOUR_USERNAME/YOUR_PROJECT']
]
```

`example.com` 和 `YOUR_USERNAME` 等仅为文档占位值，请换成自己的地址；没有链接时保持 `links: []`，不会显示虚假按钮。普通网页链接支持 HTTP(S)、站内锚点或相对路径。

添加 PDF 简历（只需在 `contact` 中修改）：

```js
resumes: [
  {
    title: '通用简历',
    description: '个人经历与项目精选',
    file: 'resumes/resume.pdf',
    downloadName: 'resume.pdf'
  }
]
```

支持多份简历。默认 `resumes: []` 不会生成失效的下载链接。路径应与实际文件大小写一致，建议使用英文文件名和相对路径，这样部署到 GitHub Pages 子目录也能正常访问。同源文件可下载，外站 PDF 的下载行为由浏览器决定。

邮箱、电话、GitHub 留空会隐藏对应入口；`honors.featured: null` 可隐藏重点荣誉，配合 `honors.items: []` 可隐藏整个荣誉区域。无需展示的其他章节可在 `index.html` 中添加 `hidden`，并同步删除对应导航链接和概览入口。

首页个人简介与教育区是两个展示位置：修改学校、专业时，请同时更新 `profile` 的对应字段和 `education`。`profile.logo` 控制导航及浏览器图标，`assets/logo.svg` 是通用标志。

## 文件结构

```text
index.html          页面骨架与通用栏目标题
content.js          所有简历资料、个人文案与项目内容
script.js           内容渲染、筛选、弹窗、导航、复制
styles.css          配色、布局与响应式样式
assets/logo.svg     通用图标
assets/portrait.svg 通用头像占位图
resumes/README.md   PDF 放置说明
LICENSE             MIT 开源许可证
```

通用栏目标题可在 `index.html` 中修改。配色从 `styles.css` 顶部的 `:root` 变量入手，例如 `--blue`、`--paper`、`--ink`。页面包含移动导航、键盘焦点、原生 dialog、减少动态效果支持和筛选状态播报。支持现代 Chrome、Edge、Firefox、Safari；内容渲染依赖 JavaScript，禁用时会显示提示。社交预览与部分搜索抓取器可能只读取静态 HTML，正式上线前可将 `index.html` 中的 `<title>` 和 description 同步改成自己的内容。

## 上传 GitHub

**只把本模板目录里的文件放进新仓库根目录。** 不要把模板所在的上级工作目录一起上传。

在 GitHub 创建一个新仓库后，可选择上传本目录的文件；也可以在本目录执行：

```sh
git init
git add .
git commit -m "Initial resume template"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

如果希望直接发布为网站，可按 [GitHub Pages 官方文档](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)配置仓库的发布来源，发布包含本模板文件的分支根目录。本项目无需 npm、构建命令、服务器或数据库。

## 发布前检查

- 所有虚构内容、`20XX`、占位邮箱和图片已替换成你希望公开的资料。
- 项目卡片与弹窗一致，分类正确，所有演示链接属于你要展示的项目。
- PDF 确实存在且内容可公开；手机号不是必填项。
- 用手机查看布局，并测试导航、筛选、弹窗与联系入口。
- 公共仓库只包含希望公开的文件，避免加入原始简历 DOCX、照片备份、账号信息或环境变量文件。

`.gitignore` 默认排除编辑用文档、环境变量、缓存、截图验证目录与压缩包；放进 `resumes/` 的 PDF 和 `assets/` 的照片会进入仓库，这是展示它们所必需的。

## 许可证

采用 [MIT License](LICENSE)，允许使用、修改、分发和商业使用，请保留许可证声明。模板附带的通用 SVG 也按 MIT 提供；使用者自行加入的照片、简历和第三方素材需自行确认使用权限。

---
layout: page
title: Todo
---
{% include JB/setup %}

**Done**

- 首页添加侧边，提供文章分类、标签、回首页的功能，参考[这个博客](http://dclick.fourdesire.com/2013/09/18/space-between?ref=article-author)
- 生成最近20篇博客列表（现在的index.md中限制文章列举数目即可）
已完成，参考：https://github.com/Shopify/liquid/wiki/Liquid-for-Designers
- 待文章数增加后，开启评论功能
  Disqus 语言不是英语，能否改为英文或中文, _config.xml 中将disqus_shortname 设置为自己的 disqus 账户名，然后在disqus网站设置language为中文即可。
- 博客底部的标签之前有中文字，需要解决一下
- 首页博客列表中无摘要：参考第一篇博客
 代码高亮插件配色方案可定制，尽可能将插件代码下载到本地目录，而非引用google code上的代码：assets/google-code-prettify/
- 在Google/Baidu上提交：yangqiang.me
- 搜索功能无效，考虑关闭此功能： `vi _includes/themes/bootstrap-3/default.html`
  也可以替换为google或百度搜索。
- Markdown for vim, Markdown plain text
- 为博客页面根据 h1，h2 这类标签添加页内导航功能，[参考](http://prof.ict.ac.cn/BigDataBench/)
- textile 中如何缩进？使用“行首使用 p(((. 前缀，括号数量代表缩进级数，[参考](http://txstyle.org/doc/25/indentation)
- textile 绘制出的表格无边框。需要为 table 指定类，参考[W3C School: Bootstrap tables](http://www.w3cschool.cc/bootstrap/bootstrap-tables.html)

**ToDo**

- 在宿舍的电脑里，使用 opera 和 chrome 浏览器时，导航功能即 toc 中的链接无法点击，使用 IE 浏览器则可以点击。猜测可能是 jQuery 版本的问题，需要检查一下所有使用的 jQuery 的版本是否都是 1.x，换成1.10.2依然无效。朱玮觉得是浏览器版本问题，更新 opera 至最新版本23.0后，实验室 opera 工作正常；另外，实验室 chrome 版本是：36.0.1985.125 m。
- 这个 toc  在宿舍的电脑里功能有问题，其内容被主内容覆盖，而且使用了绝对定位，缩放窗口时会造成页面布局混乱。所有 js 都已经本地化，下面是一个示例图片。(应该是屏幕分辨率问题，实验室为1600x1200，宿舍为1440x900，估计 1) 使用相对定位可以解决此问题；2) 或者使用淡入淡出特效来加强导航栏的使用效果，减少给正文带来的影响 3) 使用 toTop 小按钮，然后将导航栏放在顶部；4) 使用小按钮，点击出现面板，点击面板后，面板自动隐藏。)

<img src="/pics/blog-bookmark-overwrite.png" />

## 功能开关

- 博客的书签：/home/jonny/Documents/yangqiang.github.io/_includes/themes/bootstrap-3/post.html 中修改。

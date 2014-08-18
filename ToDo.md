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
- textile 中如何缩进？使用“行首使用 p(((. 前缀，括号数量代表缩进级数”[参考文档](http://txstyle.org/doc/25/indentation)

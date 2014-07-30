---
layout: post
title: "我的日常工作方法盘点"
description: ""
category: "Method"
tags: [Project, Method]
---
{% include JB/setup %}
###目标

工作最好是目标驱动，否则会导致效率低下。


###方法

####迭代（ Angile 即敏捷开发）
不要等所有东西都准备好了才开始做，先做个小板凳，然后在上面雕刻花纹。

####备忘
好记性不如烂笔头，记录一些重要的心得体会，计算机的 Memory 肯定比自己的 Memory 靠谱，毕竟人家有云。（画外音：请问，您何年何月何日买了第一台电脑？）

###问题

####编码问题

以编程为例，如果遇到语言类问题，可以直接使用google搜索引擎搜索，或者查权威的文档（如 Java 类问题可以找 Javadoc）。应该避免直接问前辈，因为这种细节类问题，他们未必记得很清楚，这个时候，搜索引擎永远是最好的老师。

####设计问题

以Hadoop编程为例，如果要写一个KMeans算法。大致的步骤应该如下：

1. 画出MapReduce处理流程，确定应该实现哪些Stage，每个Stage里面如何些Map和Reduce
2. 确定输入和输出
3. 确认技术细节都已掌握

这里面的第1步，便属于一个设计的问题。

###沟通

当陷入困境时，如果绞尽脑汁仍然没有取得太好的进展，就要考虑向小伙伴们求救了。先问周围的同学或同事，仍没有进展，就得上国内外技术论坛了（参考**工具**小节）

###工具

* 技术问答网站：Stackoverflow
* Mindmap （心智图）： FreePlane, XMind, FreeMind
* 笔记管理：有道云笔记、印象笔记
* 番茄闹钟：[Pomodairo](http://code.google.com/p/pomodairo), [focus booster](http://www.focusboosterapp.com)
* 电子书下载：皮皮书屋、China-pub
* 专业论坛：以 spark 为例，一些通过 google 无法搜索到的问题可以使用 spark 官方论坛查找资料或发布问题。
* 流程图、框图：Dia, XMind
* 技术博客
  - [ChinaUnix](http://blog.chinaunix.net/)
  - [酷壳](http://coolshell.cn/)
  - [阮一峰博客](http://www.ruanyifeng.com/blog/)

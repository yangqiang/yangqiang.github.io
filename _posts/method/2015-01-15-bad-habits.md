---
layout: post
title: "工作中的几个坏习惯"
description: ""
category: "method"
tags: []
summary: 一些工作中的见闻。
---
{% include JB/setup %}
{:toc}

坏的习惯，让人失去热情。

## 背字典

在面对需要使用自己不熟练的语言编程来解决的问题之时，很多人会习惯性地选择捧起一本《XX编程入门》的书，仔仔细细地开始看，一周之后，他/她说：“我学会用XX语言了！”可是，那个问题呢，还没解决。工程实践的原则是快速原型，这种背完康熙字典再研读古籍的工作方式未免过于低效。

比如，在不了解 bash 语法的情况下，解决“用 bash 编程实现一个定期同步系统时间”的问题。拿到这个问题后，倒不必先去看书，而应先理清程序到逻辑，然后查询每块逻辑对应的 bash 代码，最后组合成最终程序即可。毕竟，实现这个程序并不需要了解 bash 编程的全部内容。

程序逻辑如下：

* bash 如何定期执行某条命令或脚本？
* bash 如何同步网络时钟？

## 我不知道

在遇到问题时，习惯性反应是焦虑：“怎么回事，怎么又出问题，什么原因？我不知道。”于是，选择求助，求助时又不能将问题描述清楚。描述问题是软件工程师的基本素养，现在有很多网络问答网站，IT领域在内也不例外：Stackoverflow、Segmentfault、知乎这类网站都能用来解决技术问题。在搜索或提交问题之前，必须将问题描述清楚，提供的细节越多，被解决的概率也就越大。

## 盲目搜索

遇到一个技术问题时，应当先分析可能的原因及解决思路，尝试无效时再进行搜索，以提高解决问题到效率。

比如因为版本问题引发到错误，应直接去软件官方网站查看其依赖的软件版本。如果用搜索引擎搜索，得到的结果多半是张三的一篇讲解该软件的过程，其版本未必与当前问题中的软件版本一致。

## 不懂休息

即使是个经验丰富的程序员，可能也经常会重演这样的经历：被一个“神奇”的 Bug 绊住，试过很多方法都不管用，一段时间之后（一个小时，一天，或者一周）做了一个很小的改动，问题解决了。这中间的过程是很累人的：思考各种可能的原因，修改，验证，不断重复。从我自己的工作经验看，这个过程中很多尝试完全没用，纯粹是浪费精力。当尝试受挫之后，不妨先停下来，喝杯凉开水，给过热的大脑将降温，或者听听舒缓神经的音乐。情绪平定之后，思考一下代码的思路，再认真检视一遍代码，说不定就把这只虫子揪出来了。这种休息，是无价的。

## 要做什么

这个习惯往往是过忙导致：任务 A 引发了问题 B，解决 B 的时候引入了问题 C，最后碰到了问题 Z。于是，慢慢解决吧，Z、Y、X……可是，解决这些问题是为了什么，由于忙于这些琐碎的问题，很可能就把最初的任务 A 给忘了。勿忘初心，就是对这种情况的最好忠告。做事情的时候，目的性强一点；休息的时候，随意一些。
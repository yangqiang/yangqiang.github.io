---
layout: post
title: "优雅地提交：git commit"
description: ""
category: "Method"
tags: [git]
summary: 不能一时图省事使用 `git add *'，而引发后续的 diff 灾难。
---
{% include JB/setup %}
{:toc}
###git 工作机制

文件交由 git 管理之后，其所有的更新（修改、删除）都会被一丝不苟地记录下来。当文件过大、过多时，git 的性能将急剧下降；因此，应尽量减少被托管文件的数量。


###代码提交的风险

一次粗心的代码提交，可能会增加组员工作的麻烦。比如组员A写好了代码，并在本地编译并测试，产生大量 .o, .a, .so, .lib, .txt, .log, .out 之类文件。测试结束后，A 忘了删除这些非代码文件，直接执行这些代码：

<pre>
git add *
git commit -m 'finish #174'
git push origin jack-174
</pre>

然后，代码库文件 size 急剧膨胀！这条`git add *`真是罪魁祸首。

###优雅地提交

为了减少灾祸，大致有以下几种应对之策。

####编写 .gitignore

一般而言，前面提到的 .o, .a, .so, .lib, .txt, .log 文件，可以写入仓库的“黑名单”物品列表中，他们都属于“高危物品”。.gitignore 文件的编写规范可参考其[官方文档](http://git-scm.com/docs/gitignore)。

####make clean

代码提交时，使用 `git status` 命令查看文件更新情况，如果没用合理编写 .gitignore 文件（比如，很多可执行文件的名字不以 .out 结尾），可能会有一个长长的文件列表。此时，可以执行 `make clean` 类的命令来删除测试产生的大量文件，以避免将这些文件提交。

####少吃多餐

一次工作量较大的代码开发工作，应该拆分成多个子过程进行提交，这样使自己的工作更容易被同事理解，也方便排错。即把这种提交方式：

<pre>
git add A.c B.c C.c
git commit -m 'finish #174'
</pre>

变成

<pre>
git add A.c
git commit -m 'finish #174-1'
git add B.c
git commit -m 'finish #174-2'
git add C.c
git commit -m 'finish #174-3 & #174'
</pre>

主流的做法似乎并不采用这种提交方式，相反，[`git squash`](https://ariejan.net/2011/07/05/git-squash-your-latests-commits-into-one/) 将连续的多个 commit 合并为一个却是常见做法。

####转移大文件

如果程序依赖其他的较大的库文件或者测试数据，应该只提供获取这些数据的方法（文档或者脚本程序）。

####清理之难

从 git 历史中删除已经添加进去的垃圾文件，是一件让人十分头疼的事情，就好像要从记忆里完全抹掉一个人。

<pre>
git rm A.o B.o C.o
git commit -m 'delete .o files'
</pre>

这种方式只能保证今后检出的代码中不再有 A.o B.o C.o 这些文件，**但是 git 的底层数据依然保留着那些文件**。要彻底删除记忆，可参考[这篇文章](http://stackoverflow.com/questions/2100907/how-to-remove-delete-a-large-file-from-commit-history-in-git-repository)。所以说，与其熟练地灭火，不如提高防火意识。



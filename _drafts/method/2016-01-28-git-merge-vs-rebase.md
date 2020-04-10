---
layout: post
title: "Git协同开发：合并分支的选择，merge还是rebase？"
description: ""
category: "Method"
tags: [Git]
summary: 介绍 git 命令 merge 和 rebase 的异同及各自适用的场景。
---
{% include JB/setup %}


## 问题的由来：合并
git 开发过程中，主分支放稳定代码，功能分支，参考 github 模式，以功能点（issue）为单元建立分支。（见：[git协同开发的二三法则](/method/2015/01/13/git-principle)）

假设甲乙基于当前工作的 master 分支进行协同开发，各准备完成1号功能和2号功能。主分支现在的状态是：

    0

甲创建分支 issue-1，乙创建分支 issue-2。甲在 issue-1 分支完成了1号功能，提交分支，被管理员 merge 到 master 分支，主分支现在的状态是：

    0  <--  1

乙在分支 issue-2 上完成了2号功能，issue-2 分支状态变成了：

    0  <--  2

但是，其本地主分支还是未融入1号功能的主分支：

    0

此时执行命令：

`git pull origin master:master`

把本地master同步到最新状态：

    0  <--  1

与此同时，git 会提示输入 merge commit 信息，之后乙的 issue-2 分支会自动合并更新后的 master（如有冲突，会提示先解决）。此时，issue-2  分支状态变成了：

    0  <--  1  <--  2  <--  [merge  master  to  issue-2]

对于有commit“洁癖”的人，[merge  master  to  issue-2]这条merge commit会显得很刺眼，能不能删掉呢？

`git  reset  --merge  ORIG_HEAD`

或者

`git  reset  --hard  [2所在的commit sha值]`

问题出现了：如果此时乙在 merge 后的 issue-2 基础上创建新分支 issue-3，并提交了改动：

    0  <--  1  <--  2  <--  [merge  master  to  issue-2]  <--  3

此时，还能不能吃后悔药，删掉那条突兀的 merge commit？答案是可以：
    
`git  rebase  -i  [1所在的commit sha值]`

执行名录后，issue-3 变成了：

    0 <-- 1 <-- 2 <--3

## 改变pull操作
默认情况下，pull 操作会自动执行 merge 操作，如果要关闭自动 merge，可执行命令：

`git pull  --no-commit  origin master:master`

此时，主分支为：

    0  <--  1

而issue-2分支还是：

    0  <--  2

此时，执行命令：

`git  reabse  master`

issue-2  状态变为：

    0  <--  1  <--  2

与  merge  后的

    0  <--  1  <--  2  <--  [merge  master  to  issue-2]

相比，少了一条  merge  commit，使commit信息更清晰自然。以上操作也可简化为一条命令：

`git pull --rebase origin master:master`

## rebase vs merge
对于rebase操作，可理解为主分支有升级，2号功能可能依赖这些升级的部分，所以【把改动建立在新代码基础上】。rebase拆成re-base，重新建立基石，即把改动的起始点从0移动到1。而merge操作的适用场景是：【两人各自完成一个功能块中的两个小功能，后完成的人希望合并前面已完成的功能到自己的代码，以协同完成该功能】。如果分支改动较为频繁，推荐使用rebase，可以使commit tree结构清晰，但【rebase操作会改写所有新 commit】，因此[切忌在公共分支上执行rebase][2]；至于merge操作，会清晰地记录代码合并的过程，并且【不改变分支原来的提交信息】，所以公共分支上多数情况下会使用merge操作。

附赠一条神奇命令，修改第一条commit信息：：

`git  rebase  -i  --root`
    
## 参考资料

[Git: Remove merge commit from history](http://stackoverflow.com/questions/17577409/git-remove-merge-commit-from-history)

**merge  vs  rebase**

- [merging vs rebasing][2]
- [Git team workflows: merge or rebase](https://www.atlassian.com/git/articles/git-team-workflows-merge-or-rebase/)
- [When do you use git rebase intead of git merge](http://stackoverflow.com/questions/804115/when-do-you-use-git-rebase-instead-of-git-merge)
- [Pro Git Book：分支衍合](https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E8%A1%8D%E5%90%88)
- [Git：rebase还是merge](http://www.cnblogs.com/iammatthew/archive/2011/12/06/2277383.html)

[2]: https://www.atlassian.com/git/tutorials/merging-vs-rebasing/conceptual-overview

---
layout: post
title: "git 协同开发的二三法则"
description: ""
category: "Method"
tags: [Project, Method]
summary: 为了减少协同开发带来的麻烦，必须遵守既定的原则来管理代码。
---
{% include JB/setup %}
{:toc}
###原则

一切的规则，都是为了减少协同开发引发的混乱。


###一种简单的方法

####保护主分支

主分支是目前最可靠的代码，组员的代码进入主分支之前必须经过测试，只有指定的用户拥有主分支的修改权限。

####一个问题，一个分支

协同开发时，应该每次先检出（clone, checkout 或 pull）最新的 master 分支。再按要解决的问题或新增的功能，以及作者姓名创建新分支并切换到该分支下编写代码。

比如，小组使用了 Redmine, BugZilla, JIRA, Git Issue 这样的工具；组员 Jack 被分配到 335 号任务，那么，Jack 可以创建名为 335-jack 的分支。

当 Jack 完成 335 号问题时，可以在 commit 信息里标记此问题的完成情况：

`git commit -m 'fix #335'` （对于 bug/错误类型的任务）

或者

`git commit -m 'finish #335'` （对于 function/功能类型的任务）

Jack 把此分支上传到远端代码库：

`git push origin 335-jack`

master 分支管理员确认代码可用之后，就可以将 335-jack 分支 merge 到 master 分支，然后删除远端的 335-jack 分支。

#### 有效的提交

有时候，组员在解决新问题时，忘了基于最新的 master 分支创建新分支，而是在旧分支上继续修改代码。比如 jack 在解决 336 号任务时，没有创建 336-jack 分支，而是继续在 335-jack 分支上修改代码，这样当 master 管理员 merge 336-jack 任务相关代码时可能会有冲突：master 分支里 merge 的其它分支（如 337-mary）与 336-jack 任务修改了同一个文件。

为了解决这个问题，组员在 push 自己的分支之前，必须先保证自己的代码能成功 merge 到 master 分支，相关操作如下：

<pre>
git checkout master
git pull
git checkout 335-jack
git merge master
</pre>

此时，如果提示有冲突，可在解决冲突之后（为了解决冲突，jack 可能要找 mary 聊聊～）再次 merge 并将分支 push 到远端。

####保持精简

应当保持项目代码的精简，依赖的第三方工具、编译产生的文件不要提交到代码库，也可以使用 .gitignore 文件指定不需跟踪的文件。

###参考资料

* [GIT分支管理是一门艺术](http://roclinux.cn/?p=2129)
* [segmentfault: 请推荐一个适合4-6人小团队的git代码管理模式](http://segmentfault.com/q/1010000000349610)
* [感谢@朱玮](http://blog.zuuii.com/)


---
layout: post
title: "Hadoop编程入门：使用Idea + Maven"
description: ""
category: BigData
tags: [Hadoop, Maven]
summary: Hello, Hadoop!
---
{% include JB/setup %}
{:toc}

## 安装 idea IDE
下载网址：http://www.jetbrains.com/idea/
进入下列步骤之前，请先阅读资料： "140604-Maven初探-v2.pdf":/attachs/140604-Maven-intro-v2.pdf

## 使用 Maven 创建 Hadoop 项目
使用Idea 创建 Maven 类型的项目

## 编写程序
- 配置 pom.xml，添加如下代码：
<pre class="prettyprint xml">
<dependencies>
        <dependency>
            <groupId>org.apache.hadoop</groupId>
            <artifactId>hadoop-client</artifactId>
            <version>2.8.4</version>
        </dependency>
    </dependencies>
</pre>

- 编写 Hadoop 程序，如 [WordCount 程序](http://hadoop.apache.org/docs/r2.8.4/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html#Source_Code)

## 打包运行
0. 打开 Maven 操作面板：View -> Tool Windows -> Maven Projects
0. 点击 Execute Maven Goal 按钮（有个M字母的按钮），Command Line 输入：compile
0. 再次点击 Execute Maven Goal 按钮，Command Line 输入：package
0. 测试 Hadoop 程序，在项目目录下的 target 目录中找到 jar 文件，执行命令：hadoop jar target-xx.jar org.xx.yy.MRWordCount input_dir output_dir


## 参考资料

* [MapReduce Tutorial](http://hadoop.apache.org/docs/r2.8.4/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html)

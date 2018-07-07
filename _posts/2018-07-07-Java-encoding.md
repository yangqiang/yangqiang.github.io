---
layout: post
title: "Java 字符编码"
description: ""
category: "Java"
tags: []
summary: 字符编码，转码，乱码
---
{% include JB/setup %}
{:toc}

JVM 在处理字符串时，底层统一使用 unicode 字符集。写代码时，字符串表示为 char[] 或 String，隐藏了底层的编码细节。从文件或网络读取数据时，则需要注意数据的编码方式，处理不当则会发生乱码。

## 源代码的编码

源代码存放在文件中，代码文件本身具有编码格式，Windows 系统一般为 GBK，Linux 环境一般为 utf8。Java 编译器编译时默认使用 utf8 编码方式解析源代码，如果源代码文件是其他格式，如 GBK，且含有非 ASCII 字符，编译时可能报错：

```bash
error: unmappable character for encoding UTF8
```

解决方法是，指定参数 encoding 为 GBK：

```bash
javac TestCn.java -encoding gbk
```

主流的 IDE（如 eclipse 或 jetbrains idea）一般会根据代码文件的编码方式自动添加对应的 encoding 参数，如在命令行中编译代码，则需要自行指定参数。

## 字符串和字节数组

<pre class="prettyprint java">
String cnWords = "中国cn";
byte[] utf8Bytes;

try {
  utf8Bytes = cnWords.getBytes("UTF-8");
}  catch (java.io.UnsupportedEncodingException e) {
  e.printStackTrace();
}
</pre>

以上代码中，cnWords 包含中、国、c、n 四个字符，utf8Bytes 则对应 utf8 的编码字节：

0xe4, 0xb8, 0xad, 0xe5, 0x9b, 0xbd, 0x63, 0x6e

四个字符分别对应
```bash
中：0xe4, 0xb8, 0xad
国：0xe5, 0x9b, 0xbd
c：0x63
n：0x6e
```

## 流

Java 将输入或输出抽象为流，如：控制台、文件、网络。从流中读取或写入数据时，默认按 utf8 编码方式进行解析，如果数据的编码方式不为 utf8 则需要显式声明。否则读入的数据会发生编码错误，即产生乱码。

以下代码是按指定编码格式写入数据到文件：
<pre class="prettyprint java">
    public void writeStrWithEncoding(String file_path, String str, String encoding) {
        try {
            FileOutputStream fos = new FileOutputStream(file_path);
            Writer out = new OutputStreamWriter(fos, encoding);
            out.write(str);
            out.close();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }
</pre>

以下代码是按指定编码格式从文件读取数据：
<pre class="prettyprint java">
    public void readFromFileWithEncoding(String file_path, String encoding) {
        StringBuffer buffer = new StringBuffer();
        try {
            FileInputStream fis = new FileInputStream(file_path);
            InputStreamReader isr = new InputStreamReader(fis, encoding);
            Reader in = new BufferedReader(isr);
            int ch;
            while ((ch = in.read()) > -1) {
                buffer.append((char)ch);
            }
            in.close();
            System.out.print(buffer.toString());
        } catch (IOException e) {
            System.out.println("从文件读取内容失败：" + file_path);
            e.printStackTrace();
        }
    }
</pre>

## 参考

* [Java 官方教程：国际化-文本-字符串](https://docs.oracle.com/javase/tutorial/i18n/text/string.html)
* [Java 官方教程：国际化-文本-流](https://docs.oracle.com/javase/tutorial/i18n/text/stream.html)

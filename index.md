---
layout: page
title: 近期文章
---
{% assign count = 0 %}
{% assign recent = 10 %}
{% for post in site.posts %}
{% if count < recent %}
- ### [{{ post.title }}]({{ post.url }}) <time>{{ post.date | date: '%Y-%m-%d' }}</time>

  {{ post.summary }}

  [Read more &raquo;]({{ post.url }})
{% endif %}
{% assign count = {{ count | plus:1 }} %}
{% endfor %}


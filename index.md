---
layout: page
title: 最新文章
---


{% assign count = 0 %}
{% assign limit = 10 %}
{% for post in site.posts %}
{% if count < limit %}
### [ {{ post.title }}]({{ post.url }}) <time>{{ post.date | date: '%Y-%m-%d' }}</time>
{{ post.summary }}
{% assign count = count | plus:1 %}
{% endif %}

{% endfor %}

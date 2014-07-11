---
layout: page
title: The Real Index
tagline: What is tagline
---
{% for post in site.posts %}
- ### [{{ post.title }}]({{ post.url }}) <time >{{ post.date | date: '%Y-%m-%d' }}</time>

  {{ post.summary }}

  [Read more &raquo;]({{ post.url }})
{% endfor %}


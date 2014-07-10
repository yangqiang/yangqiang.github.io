---
layout: page
title: Test Source Code
tagline: 
---
{% include JB/setup %}

```scala
val a = 1
val b = 2
```

```javascript
function fancyAlert(arg) {
  if(arg) {
    $.facebox({div:'#foo'})
  }
}
```

val a = 1
val b = 2

```python
@requires_authorization
class SomeClass:
    pass

if __name__ == '__main__':
    # A comment
    print 'hello world'
```

```flow
st=>start: Start
op=>operation: Your Operation
cond=>condition: Yes or No?
e=>end

st->op->cond
cond(yes)->e
cond(no)->op
```


[Refer to](https://help.github.com/articles/markdown-basics)

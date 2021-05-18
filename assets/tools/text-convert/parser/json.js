var T_JSON = {};
// 当前类型转成 json schema
T_JSON.toJsonSchema = function(text) {
  function parse(o) {
    var jsonSchema;
    var type = typeof o;
    if (o instanceof Array) {
      jsonSchema = {"type": "array"};
      jsonSchema['items'] = parse(o[0]);
    } else if (type === 'object') {
      jsonSchema = {"type": type};
      var properties = {};
      for (var k in o) {
        properties[k] = parse(o[k]);
      }
      jsonSchema.properties = properties;
    } else {
      jsonSchema = {"type": UTIL.getSchemaType(o)};
    }
    return jsonSchema;
  }

  var json = JSON.parse(text);
  return parse(json);
};

// json schema 转成当前类型
T_JSON.fromJsonSchema = function(json_schema) {
  function parse(o) {
    var json;
    var type = o.type;
    if (type == 'array') {
      json = [];
      json[0] = parse(o.items);
    } else if (type === 'object') {
      json = {};
      for (var k in o.properties) {
        json[k] = parse(o.properties[k]);
      }
    } else {
      if (type === 'integer') {
        return 1;
      } else if (type === 'number') {
        return 1.1;
      } else if (type === 'boolean') {
        return true;
      } 
    }
    return json;
  }

  return JSON.stringify(parse(json_schema), null, 2);
};

T_JSON.toTableJson = function(text) {
  return JSON.parse(text);
};

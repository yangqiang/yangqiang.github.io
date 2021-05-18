var T_PROTO3 = {};
// 当前类型转成 json schema
// T_PROTO3.toJsonSchema = undefined;

// json schema 转成当前类型
T_PROTO3.fromJsonSchema = function (json_schema) {
  function getProtobufType(typeV) {
    if (typeV === 'number') {
      return "double";
    } else if (typeV === 'integer') {
      return "integer";
    } else if (typeV === 'string') {
      return "string"
    } else if (typeV === 'boolean') {
      return "bool"
    }
    return null;
  }

  var sep = '\t';
  function parseField(i, k, v, indent) {
    var t = getProtobufType(v.type);
    var extra = null;
    var typeV = v.type;
    var result = "";
    k = UTIL.toCamel(k);

    if (v.description != undefined && !v.description.null) {
      result = indent + '// ' + v.description + "\n";
    }
    if (typeV === 'object') {
      t = UTIL.upperFirst(k);
      extra = indent + parseObject(v, t, indent, sep, false);
    } else if (typeV === 'array') {
      var ret = parseArray(v, k, indent);
      t = ret.t;
      extra = ret.extra;
    }

    if (t != null) {
      result += indent + t + " " + k + " = " + i + ";\n";
      if (extra != null) {
        result += extra;
      }
    }

    return result;
  }

  function parseObject(o, name, indent, sep, isRoot) {
    var ret = "\n" + indent + "message " + name + " {\n";

    var i = 1;
    for (var k in o.properties) {
      var v = o.properties[k];
      ret += parseField(i, k, v, indent + sep);
      i += 1;
    }

    ret += indent + "}\n";
    return ret;
  }

  // protobuf3 不支持嵌套数组 https://stackoverflow.com/questions/4090173/using-protobuf-net-how-to-deserialize-a-multi-dimensional-array
  function parseArray(a, name, indent) {
    var ret = {};
    ret.extra = null;

    var innerType = a.items.type;
    if (innerType === 'object') {
      var innerClassName = UTIL.upperFirst(name);
      ret.t = 'repeated ' + innerClassName;
      ret.extra = parseObject(a.items, innerClassName, indent, sep, false);
    } else if (innerType === 'array') {
      var innerRet = parseArray(a.items, name + 'I', indent);
      ret.t = 'repeated ' + innerRet.t;
      if (null != innerRet.extra) {
        if (null != ret.extra) {
          ret.extra += innerRet.extra;
        } else {
          ret.extra = innerRet.extra
        }
      }
    } else {
      ret.t = 'repeated ' + getProtobufType(innerType);
    }

    return ret;
  }

  function parse(o) {
    if (o.type === 'object') {
      return parseObject(o, 'Message', '', sep, true);
    } else if (o.type === 'array') {
      return parse(o.items)
    } else {
      error('unsupported type: ' + o.type);
    }
  }

  return parse(json_schema);
};

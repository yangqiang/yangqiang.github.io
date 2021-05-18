var T_JAVA = {};
// json schema 转成当前类型
// TODO validation 转为 @Valid
T_JAVA.fromJsonSchema = function (json_schema) {
  function parseField(k, v, indent) {
    var t = JAVA_UTIL.getJavaBasicType(v.type);
    var extra = null;
    var typeV = v.type;
    var result = "";
    k = UTIL.toCamel(k);

    if (typeV === 'object') {
        t = UTIL.upperFirst(k);
        extra = indent + parseObject(v, t, indent, false);
    } else if (typeV === 'array') {
        var ret = parseArray(v, k, indent);
        t = ret.t;
        extra = ret.extra;
    }

    if (t != null) {
        result = indent + "private " + t + " " + k + ";\n";
        if (extra != null) {
            result += extra;
        }
    }

    return result;
}

function parseObject(o, name, indent, isRoot) {
    var ret = "\n" + indent + "@Data\n" + indent + "public";
    if (!isRoot) {
        ret += " static";
    }
    ret += " class " + name + " {\n";

    for (var k in o.properties) {
        var v = o.properties[k];
        ret += parseField(k, v, indent + UTIL.TAB);
    }

    ret += indent + "}\n";
    return ret;
}

function parseArray(a, name, indent) {
    var ret = {};
    ret.extra = null;

    var innerType = a.items.type;
    if (innerType === 'object') {
        var innerClassName = UTIL.upperFirst(name);
        ret.t = 'List<' + innerClassName + '>';
        ret.extra = parseObject(a.items, innerClassName, indent, false);
    } else if (innerType === 'array') {
        var innerRet = parseArray(a.items, name + 'I', indent);
        ret.t = 'List<' + innerRet.t + '>';
        if (null != innerRet.extra) {
            if (null != ret.extra) {
                ret.extra += innerRet.extra;
            } else {
                ret.extra = innerRet.extra
            }
        }
    } else {
        ret.t = 'List<' + JAVA_UTIL.getJavaBasicType(innerType) + '>';
    }

    return ret;
}

function parse(o) {
    if (o.type === 'object') {
        return parseObject(o, 'VO', '', true);
    } else if (o.type === 'array') {
        return parse(o.items)
    } else {
        throw ('unsupported type: ' + o.type);
    }
}
  return parse(json_schema);
};

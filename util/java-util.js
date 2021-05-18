var JAVA_UTIL = {};
JAVA_UTIL.getJavaBasicType = function (typeV) {
  if (typeV === 'number') {
      return "Double";
  } else if (typeV === 'integer') {
      return "Integer";
  } else if (typeV === 'string') {
      return "String"
  } else if (typeV === 'boolean') {
      return "Boolean"
  }
  return null;
};
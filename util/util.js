var UTIL = {};
UTIL.TAB = "\t";

UTIL.upperFirst = function(k) {
    return k.substr(0, 1).toUpperCase() + k.substr(1, k.length - 1);
};

UTIL.contains = function (s, sub) {
    return s.indexOf(sub) > -1;
};

// word_count -> wordCount
UTIL.toCamel = function(k) {
  let ret = "";
  let meetUnderscore = false;

  for (let i = 0; i < k.length; i++) {
      let c = k[i];
      if (c === "_") {
          meetUnderscore = true;
      } else {
          if (meetUnderscore) {
              c = c.toUpperCase();
              meetUnderscore = false;
          }
          ret += c;
      }
  }

  return ret;
};

// wordCount -> word_count
UTIL.toSnake = function (k) {
  let ret = "";
  for (let i in k) {
      let c = k[i];
      if (c.toLowerCase() !== c) {
          ret += '_' + c.toLowerCase();
      } else {
          ret += c;
      }
  }
  return ret;
};

UTIL.removePrefixAndPostfixSep = function (line) {
  return line.replace(/^\|/, '').replace(/\|$/, '');
};

UTIL.removePrefixAndPostfixSpace = function (line) {
  return line.replace(/^\s+/, '').replace(/\s+$/, '');
};

UTIL.getSchemaType = function (v) {
  let typeV = typeof v;
  if (typeV === 'number' && Number.isInteger(v)) {
      typeV = "integer";
  }
  if (typeV === 'object' && v instanceof Array) {
      typeV = 'array';
  }
  return typeV;
};
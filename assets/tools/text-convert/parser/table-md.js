const T_TABLE_MD = {};
T_TABLE_MD.splitAndClean = function (line) {
  line = UTIL.removePrefixAndPostfixSep(UTIL.removePrefixAndPostfixSpace(line));

  let words = line.split('|');
  for (let i in words) {
    words[i] = UTIL.removePrefixAndPostfixSpace(words[i]);
  }
  return words;
};

T_TABLE_MD.cleanType = function (t) {
  switch (t) {
    case 'int':
      return 'Integer';
    case 'long':
      return 'Long';
    default:
      return t;
  }
};

T_TABLE_MD.isTableName = function (line) {
  return line.startsWith('##');
};

T_TABLE_MD.getTableName = function (line) {
  let ret = {};
  line = line.replace(/^#+/, '');
  line = UTIL.removePrefixAndPostfixSpace(line);
  const words = line.split(' ');
  ret.name = words[1];
  ret.description = words[0];
  return ret;
};

T_TABLE_MD.isTableSep = function (line) {
  return /-+\s*\|\s*-+/.test(line);
};

T_TABLE_MD.isField = function (line) {
  line = UTIL.removePrefixAndPostfixSep(UTIL.removePrefixAndPostfixSpace(line));
  return line.split('|').length > 1;
};

T_TABLE_MD.getField = function (line) {
  line = UTIL.removePrefixAndPostfixSep(UTIL.removePrefixAndPostfixSpace(line));

  const words = line.split('|');
  if (words.length < 2) {
    console.log('error parse field: ' + line);
  } else {
    let ret = {};
    ret.name = UTIL.removePrefixAndPostfixSpace(words[0]);
    ret.type = UTIL.removePrefixAndPostfixSpace(words[1]);
    ret.description = UTIL.removePrefixAndPostfixSpace(words[2]);
    ret.required = words[3] === undefined || words[3].indexOf('否') === -1;
    return ret;
  }
  return undefined;
};

T_TABLE_MD.toTableJson = function (lines) {
  const lineList = lines.split('\n');
  let table = {};
  let fields = [];
  const ret = [];
  const status = {};
  status.meetTable = false;
  status.meetSep = false;
  status.meetField = false;

  for (const i in lineList) {
    let line = lineList[i];
    if (!status.meetTable) {
      if (!T_TABLE_MD.isTableName(line)) {
        continue;
      }
      table = T_TABLE_MD.getTableName(line);
      status.meetTable = true;
      fields = [];
    } else {
      if (!status.meetSep) {
        if (!T_TABLE_MD.isTableSep(line)) {
          continue;
        }
        status.meetSep = true;
      } else {
        if (T_TABLE_MD.isField(line)) {
          fields.push(T_TABLE_MD.getField(line));
        } else {
          status.meetTable = false;
          status.meetSep = false;
          status.meetField = false;

          ret.push({ name: table.name, description: table.description, fields: fields });
          table = {};
          fields = [];

          if (T_TABLE_MD.isTableName(line)) {
            table = T_TABLE_MD.getTableName(line);
            status.meetTable = true;
          }
        }
      }
    }
  }
  if (fields.length > 0) {
    ret.push({ name: table.name, description: table.description, fields: fields });
  }

  return ret;
};

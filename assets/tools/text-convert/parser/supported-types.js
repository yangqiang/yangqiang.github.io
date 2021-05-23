const TYPES = {
  JSON_SCHEMA: 'JSON_SCHEMA',
  JSON: 'JSON',
  PROTO3: 'PROTO3',
  JAVA: 'JAVA',
  POSTGRES: 'POSTGRES',
  TABLE_MD: 'TABLE_MD',
  MYSQL: 'MYSQL',
};

var SUPPORTED_TYPES = {
  [TYPES.JSON_SCHEMA]: T_JSON_SCHEMA,
  [TYPES.JSON]: T_JSON,
  [TYPES.PROTO3]: T_PROTO3,
  [TYPES.JAVA]: T_JAVA,
  [TYPES.POSTGRES]: T_POSTGRES,
  [TYPES.TABLE_MD]: T_TABLE_MD,
  [TYPES.MYSQL]: T_MYSQL,
};
// default: JSON_SCHEMA
var DEPEND_TYPES = {
  [TYPES.POSTGRES]: 'TABLE_JSON',
  [TYPES.MYSQL]: 'TABLE_JSON',
};

function getMiddleTypes() {
  var types = [TYPES.JSON_SCHEMA];
  for (var key in DEPEND_TYPES) {
    var type = DEPEND_TYPES[key];
    if (types.indexOf(type) === -1) {
      types.push(type);
    }
  }
  return types;
}
var MIDDLE_TYPES = getMiddleTypes();

/**
 * from -> middle1 -> to
 * from -> middle2 -> to
 * 
 * @returns object from: [middle1, middle2, ...]
 */
function getFromTypes() {
  var m = {};
  for (var fromType in SUPPORTED_TYPES) {
    var tObj = SUPPORTED_TYPES[fromType];
    for (var i in MIDDLE_TYPES) {
      var middleType = MIDDLE_TYPES[i];
      var funcPostfix = middleType.toLowerCase();
      parser = Reflect.get(tObj, UTIL.toCamel("to_" + funcPostfix));
      if (parser !== undefined) {
        if (!(fromType in m)) {
          m[fromType] = [middleType];
        } else if (m[fromType].indexOf(middleType) === -1) {
          m[fromType].push(middleType);
        }
      }
    }
  }
  return m;
}
var FROM_TYPES = getFromTypes();

/**
 * from -> middle1 -> to
 * from -> middle2 -> to
 * 
 * @returns object middle1: [to1, to2, ...]
 */
function getToTypes() {
  var m = {};
  for (var toType in SUPPORTED_TYPES) {
    var tObj = SUPPORTED_TYPES[toType];
    for (var i in MIDDLE_TYPES) {
      var middleType = MIDDLE_TYPES[i];
      var funcPostfix = middleType.toLowerCase();
      parser = Reflect.get(tObj, UTIL.toCamel("from_" + funcPostfix));
      if (parser !== undefined) {
        if (!(middleType in m)) {
          m[middleType] = [toType];
        } else if (m[middleType].indexOf(toType) === -1) {
          m[middleType].push(toType);
        }
      }
    }
  }
  return m;
}
var TO_TYPES = getToTypes();

function getToTypesOfFromType(fromType) {
  var types = [];
  for (var i in FROM_TYPES[fromType]) {
    var middleType = FROM_TYPES[fromType][i];
    for (var j in TO_TYPES[middleType]) {
      var toType = TO_TYPES[middleType][j];
      if (types.indexOf(toType) === -1) {
        types.push(toType);
      }
    }
  }
  return types;
}
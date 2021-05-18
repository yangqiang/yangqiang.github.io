var T_JSON_SCHEMA = {};
// json schema 转成当前类型
T_JSON_SCHEMA.fromJsonSchema = function(json_schema) {
  return JSON.stringify(json_schema, null, 2);
};
// 当前类型转成 json schema
T_JSON_SCHEMA.toJsonSchema = function(text) {
  return JSON.parse(text);
};
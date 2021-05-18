var T_POSTGRES = {};
T_POSTGRES.fromTableJson = function (json) {
  function render(data) {
    var tableName = data.name;
    var tableDescription = data.description;
    var s = "create table " + UTIL.toSnake(tableName) + "\n(\n";
    var comments = "";
    if (tableDescription !== null && tableDescription !== '') {
      comments += "comment on table \"" + tableName + "\" is '" + tableDescription + "';\n";
    }
    var fields = data.fields;
    for (var i in fields) {
      var f = fields[i];
      if (f.type == "datetime") {
        f.type = "timestamp";
      }
      s += UTIL.toSnake(f.name) + " " + f.type;
      if (f.required) {
        s += " not null"
      }
      if (f.name === "id") {
        s += " primary key"
      }
      if (i != fields.length - 1) {
        s += ','
      }
      if (!f.description.null && f.description != '') {
        comments += "comment on column \"" + tableName + "\".\"" + f.name + "\" is '" + f.description + "';\n";
      }
      s += '\n';
    }
    s += ")";

    return s + ';\n' + comments;
  }

  var data = '';
  if (json instanceof Array) {
    for (var i in json) {
      data += render(json[i]) + "\n";
    }
  } else {
    data += render(json);
  }
  return data;
};

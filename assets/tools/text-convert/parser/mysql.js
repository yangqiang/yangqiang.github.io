var T_MYSQL = {};
T_MYSQL.fromTableJson = function (json) {
  function render(json) {
    var name = json.name;
    var description = json.description;
    var fields = json.fields;
    var s = "create table " + UTIL.toSnake(name) + "\n(\n";
    for (var i in fields) {
      var f = fields[i];
      s += UTIL.toSnake(f.name) + " " + f.type;
      if (f.required) {
        s += " not null"
      }
      if (f.name === "id") {
        s += " primary key"
      }
      if (f.description) {
        s += " comment '" + f.description + "'";
      }
      if (i != fields.length - 1) {
        s += ','
      }
      s += '\n';
    }
    s += ")";
    if (description !== undefined) {
      s += "\ncomment '" + description + "';"
    }
    return s + '\n';
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

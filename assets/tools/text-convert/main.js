function error(msg) {
  $('#id-error').text(msg);
}

function buildTypeMap() {
  
}

function doConvert(event) {
  error("");
  var fromType = $('#id-from-type').val();
  var toType = $('#id-to-type').val();
  var fromConverter = SUPPORTED_TYPES[fromType];
  var toConverter = SUPPORTED_TYPES[toType];
  var parserOk = true;
  var parser, render;
  if (fromConverter === undefined || toConverter === undefined) {
    parserOk = false;
  } else {
    var middleType = DEPEND_TYPES[toType];
    if (middleType === undefined) {
      middleType = 'JSON_SCHEMA';
    }
    var funcPostfix = middleType.toLowerCase();
    parser = Reflect.get(fromConverter, UTIL.toCamel("to_" + funcPostfix));
    render = Reflect.get(toConverter, UTIL.toCamel("from_" + funcPostfix));
    if (parser === undefined || render === undefined) {
      parserOk = false;
    }
  }
  if (!parserOk) {
    error("can not find parser or render");
    return;
  }

  var inputText = $('#id-input').val();
  var middleData = parser(inputText);
  var outputText = render(middleData);

  $('#id-output').val(outputText);
}


function updateTypeSelect(obj, types) {
  obj.empty();
  for (var i in types) {
    var type = types[i];
    var option = '<option>' + type + '</option>';
    obj.append(option);
  }
}

function onChangeFromType(event) {
  var fromType = $('#id-from-type').val();
  var divId = '#id-sample-' + fromType;
  $('#id-input').val($(divId).text());
  $('#id-output').val('');
  updateTypeSelect($('#id-to-type'), getToTypesOfFromType(fromType));
}

$(document).ready(function () {
  var defaultFromType = TYPES.JSON_SCHEMA;
  var fromTypes = [];
  for (var fromType in FROM_TYPES) {
    fromTypes.push(fromType);
  }
  updateTypeSelect($("#id-from-type"), fromTypes);
  updateTypeSelect($('#id-to-type'), getToTypesOfFromType(defaultFromType));
  $('#id-convert').click(doConvert);
  $('#id-to-type').change(doConvert);
  $('#id-from-type').change(onChangeFromType);
  $('#id-input').val($('#id-sample-JSON_SCHEMA').text());
  $('#id-to-type').val('JAVA');
  // for debug
  // $('#id-input').val($('#id-sample-TABLE_MD').text());
  // $('#id-from-type').val('TABLE_MD');
  // $('#id-to-type').val('POSTGRES');
});
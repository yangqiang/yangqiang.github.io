function error(msg) {
  $('#id-error').text(msg);
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

$(document).ready(function () {
  $('#id-convert').click(doConvert);
  $('#id-from-type').change(function (e) {
    var divId = '#id-sample-' + $('#id-from-type').val();
    $('#id-input').val($(divId).text());
  });
  $('#id-input').val($('#id-sample-JSON_SCHEMA').text());
  $('#id-to-type').val('JAVA');
  // for debug
  // $('#id-input').val($('#id-sample-TABLE_MD').text());
  // $('#id-from-type').val('TABLE_MD');
  // $('#id-to-type').val('POSTGRES');
});
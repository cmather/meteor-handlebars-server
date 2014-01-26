var path = Npm.require('path');

Plugin.registerSourceHandler("handlebars", function (compileStep) {
  var contents = compileStep.read().toString('utf8')
    , js;

  var path_part = path.dirname(compileStep.inputPath);
  if (path_part === '.')
    path_part = '';

  if (path_part.length && path_part !== path.sep)
    path_part = path_part + path.sep;

  var ext = path.extname(compileStep.inputPath);
  var basename = path.basename(compileStep.inputPath, ext);
  var templateName = path.basename(compileStep.inputPath).match(/(.*)\.handlebars$/)[1];
  
  js = [
    "Handlebars = Handlebars || {templates: {}};",
    "var template = OriginalHandlebars.compile(" + JSON.stringify(contents) + ");",
    "Handlebars.templates[" + JSON.stringify(templateName) + "] = function (data) { ",
    "return template(data || {}, { ",
      "helpers: OriginalHandlebars.helpers,",
      "partials: {},",
      "name: " + JSON.stringify(templateName),
     "});",
    "};"
  ].join('');
  
  compileStep.addJavaScript({
    path: path.join(path_part, 'handlebars.' + basename + '.js'),
    sourcePath: compileStep.inputPath,
    data: js
  });
});

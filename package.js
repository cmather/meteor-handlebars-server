var fs = Npm.require('fs');
var path = Npm.require('path');

Npm.depends({
  "handlebars": "v1.0.10"
});

Package.describe({
  summary: "Testing handlebars server"
});

Package.on_use(function (api) {
  api.add_files('handlebars-server.js', 'server');
});

Package.register_extension("handlebars",
  function (bundle, source_path, serve_path, where) {

  if (where === "client") return;

  var source = fs.readFileSync(source_path).toString("utf8");
  var templateName = path.basename(source_path).match(/(.*)\.handlebars$/)[1];
  var sourceDir = path.dirname(source_path);

  var data = "Handlebars._def_server_template(" +
   JSON.stringify(templateName) + 
   ", " + JSON.stringify(source) + 
   ");";

  bundle.add_resource({
    type: "js",
    data: new Buffer(data),
    where: where,
    path: path.resolve(sourceDir, templateName + '.tmpl.js')
  });
});

Package.on_test(function (api) {
  api.use('test-helpers', 'server');
  api.add_files(
    [
     'handlebars-server.js', 
     'handlebars-server-tests.js',
     'handlebars-server-tests.handlebars'
    ],
    'server'
  );
});

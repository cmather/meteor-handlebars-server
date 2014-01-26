Npm.depends({
  "handlebars": "1.0.10"
});

Package.describe({
  summary: "Allows handlebars templates to be defined on the server in .handlebars files"
});

Package._transitional_registerBuildPlugin({
  name: "compileServerHandlebarsTemplates",
  use: ["handlebars"],
  sources: [
    'plugin/compile-handlebars.js'
  ]
});

Package.on_use(function (api) {
  api.use(['handlebars', 'underscore'], 'server');
  api.add_files('handlebars-server.js', 'server');
  api.export('Handlebars', 'server');
  api.export('OriginalHandlebars', 'server');
});

Package.on_test(function (api) {
  api.use([
   'handlebars-server',
   'tinytest',
   'test-helpers'
  ], 'server');

  api.add_files([
    'handlebars-server-tests.handlebars',
    'handlebars-server-tests-2.handlebars',
    'handlebars-server-tests.js'
  ], 'server');
});

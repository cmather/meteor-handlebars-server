Npm.depends({
  "handlebars": "1.0.10"
});

Package.describe({
  summary: "Allows handlebars templates to be defined on the server in .handlebars files",
  version: "0.2.0"
});

Package._transitional_registerBuildPlugin({
  name: "compileServerHandlebarsTemplates",
  use: ["handlebars"],
  sources: [
    'plugin/compile-handlebars.js'
  ]
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR-CORE@0.9.0-rc12');
  api.use(['handlebars', 'underscore'], 'server');
  api.add_files('handlebars-server.js', 'server');
  api.export('Handlebars', 'server');
  api.export('OriginalHandlebars', 'server');
});

Package.on_test(function (api) {
  api.use([
   'cmather:handlebars-server',
   'tinytest',
   'test-helpers'
  ], 'server');

  api.add_files([
    'handlebars-server-tests.handlebars',
    'handlebars-server-tests-2.handlebars',
    'handlebars-server-tests.js'
  ], 'server');
});

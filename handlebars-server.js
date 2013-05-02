var OriginalHandlebars = Npm.require('handlebars');

_.extend(Handlebars, {
  templates: {},

  _def_server_template: function (name, source) {
    var template = OriginalHandlebars.compile(source);
    Handlebars.templates[name] = function (data) {
      return template(data || {}, {
        helpers: OriginalHandlebars.helpers,
        partials: {},
        name: name
      });
    };
  }
});

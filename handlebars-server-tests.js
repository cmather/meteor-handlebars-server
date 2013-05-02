Tinytest.add("handlebars-server", function (test) {
  var tmpl = Handlebars.templates['handlebars-server-tests'];
  var result = tmpl({name: 'templates'});
  test.equal( result.replace('\n', ''), 'testing templates');
});

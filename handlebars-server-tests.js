Tinytest.add("handlebars-server", function (test) {
  var tmpl = Handlebars.templates['handlebars-server-tests'];
  var result = tmpl({name: 'test'});
  test.equal( result.replace('\n', ''), 'One test' );

  var tmpl2 = Handlebars.templates['handlebars-server-tests-2'];
  var result2 = tmpl2({name: 'test2'});
  test.equal( result2.replace('\n', ''), 'Two test2' );
});

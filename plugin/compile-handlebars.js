/* jshint esnext: true */
const path = Plugin.path;

Plugin.registerCompiler({
  extensions: ['handlebars', 'hbs'],
  archMatching: 'os',
}, () => new HandlebarsServer());

class HandlebarsServer extends CachingCompiler {
  constructor(){
    super({
      compilerName: 'handlebars',
      defaultCacheSize: 1024*1024*10,
    });
  }

  compileOneFile(file){
    const output = this.compileHandlebar(file);

    file.addJavaScript({
      data: output,
      path: `${file.getPathInPackage()}.js`,
    });
  }

  getCacheKey(file){
    return [ file.getSourceHash() ];
  }

  compileHandlebar(file){
    const templateName = file.getBasename().replace(/(.hbs)|(.handlebars)/, '');

    const content = EJSON.stringify(file.getContentsAsString());
    const output =`
      Handlebars.templates = Handlebars.templates || {};
      var template = OriginalHandlebars.compile('${content}');
      Handlebars.templates['${templateName}'] = function(data, partials){
        partials = partials || {};
        return template(data || {}, {
          helpers: OriginalHandlebars.helpers,
          partials: partials,
          name: '${templateName}'
         });
      }`;

    return output;
  }
}

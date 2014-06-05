This package adds support for server side Handlebars in Meteor. It's primarily
intended as a stop gap for server side email html until Meteor releases server
side rendering support.

## Install the package with Meteorite
`> mrt add handlebars-server`

## Install the package without Meteorite in your project folder
```
> cd my-project
> git init
> mkdir packages
> git submodule add https://github.com/EventedMind/meteor-handlebars-server.git packages/handlebars-server
```

## Usage

Any files with a .handlebars extension will be available as functions under the
`Handlebars.templates` namespace. 

The templates need to be accesible to the server (i.e. put them inside your /server directory).

The handlebars files should just be regular html. Don't wrap them in Meteor template tag.

Example:

**my-template.handlebars**
```
hello, {{name}}
```

**my-server-code.js**
```
Handlebars.templates['my-template']({name: 'Chris'});
// > hello, Chris
```

## Helpers

You can define helpers on the server via `OriginalHandlebars.registerHelper` method.

## License
MIT

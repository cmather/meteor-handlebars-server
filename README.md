This package adds support for server side Handlebars in Meteor. It's a stop gap
until Meteor supports server side template rendering.

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
`Handlebars.templates` namespace. The handlebars files should just be regular
html. Don't use any of the regular Meteor template syntax.

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

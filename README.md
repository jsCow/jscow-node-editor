# jscow-application-environment
Provides a jscow application environment to implement your own jscow application.

============================
===== WORK IN PROGRESS =====
============================

## Install

```sh
npm install
```

## Build

```sh
grunt
```

## Watch
You can the grunt-contrib-watch plugin to call all grunt tasks automatically by change a **js** file or **less** file within the **src/** directory. To refresh your page automatically after calling the watch task you have to install the browser plugin **LiveReload**. 

For using the watcher run the follow command in your nodejs command client:
```sh
grunt watch
```

## Dependencies

`jscow-application-environment` needs the following node packages:
All packages will be installed with command **'npm install'**.

* [grunt](https://www.npmjs.com/package/grunt) - The JavaScript Task Runner.
* [grunt-cli](https://www.npmjs.com/package/grunt-cli) - The grunt command line interface.
* [grunt-contrib-clean](https://www.npmjs.com/package/grunt-contrib-clean) - Clean files and folders
* [grunt-contrib-less](https://www.npmjs.com/package/grunt-contrib-less) - Compile LESS files to CSS
* [grunt-contrib-copy](https://www.npmjs.com/package/grunt-contrib-copy) - Copy files and folders
* [grunt-contrib-uglify](https://www.npmjs.com/package/grunt-contrib-uglify) - Minify files with UglifyJS
* [grunt-contrib-compress](https://www.npmjs.com/package/grunt-contrib-compress) - Compress files and folders
* [grunt-contrib-concat](https://www.npmjs.com/package/grunt-contrib-concat) - Concatenate files
* [grunt-contrib-yuidoc](https://www.npmjs.com/package/grunt-contrib-yuidoc) - Compile YUIDoc Documentation 
* [grunt-contrib-jshint](https://www.npmjs.com/package/grunt-contrib-jshint) - Validate files with JSHint
* [grunt-contrib-watch](https://www.npmjs.com/package/grunt-contrib-watch) - Run predefined tasks whenever watched file patterns are added, changed or deleted
* [bootstrap](https://www.npmjs.com/package/bootstrap) - The most popular front-end framework for developing responsive, mobile first projects on the web
* [font-awesome](https://www.npmjs.com/package/font-awesome) - The iconic font and CSS framework
* [jquery](JavaScript library for DOM operations) - JavaScript library for DOM operations
* [jscow](http://www.jscow.de) - **jsCow** - Javascript Component Framework
* [jscow-theme](https://github.com/jsCow/jscow-theme) - The theming environment for  **jsCow** - Javascript Component Framework

*Note: You can install all available jscow components optional like this for example:*
* [jscow-button](https://github.com/jsCow/jscow-button) - **jsCow** - Javascript Component Framework
* ...
* ...

## License

`jscow-application-environment` is licensed under the GNU GPL.

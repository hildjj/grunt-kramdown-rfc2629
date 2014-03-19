# grunt-kramdown-rfc2629

> Edit RFCs in kramdown, then generate XML, nrff, text, and HTML.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-kramdown-rfc2629 --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-kramdown-rfc2629');
```

## The "kramdown_rfc2629" task

### Overview
In your project's Gruntfile, add a section named `kramdown_rfc2629` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  kramdown_rfc2629: {
    options: {
      outputs: ['text', 'html'],
      outputDir: 'output',
      removeXML: false
    },
    your_target: {
      src: ['draft-lastname-topic.md']
    },
  },
});
```

### Options

#### options.outputs
Type: `Array` or `String`
Default value: ['text', 'html']

Which output format(s) to create.  Must include at least one.  Valid values
include 'text', 'html', 'nroff', and 'raw' (unpaginated text).

#### options.outputDir
Type: `String`
Default value: 'output'

Directory in which to put the generated .xml and outputs of xml2rfc.

#### options.removeXML
Type: `Boolean`
Default value: false

Remove the .xml file when the outputs have been generated.

## Release History

v0.0.1: Initial release
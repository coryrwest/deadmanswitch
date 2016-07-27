require('babel-register')
var getConfig = require('hjs-webpack')
var toHtml = require('vdom-to-html')
var app = require('./src/views/app').default

module.exports = getConfig({
  in: 'src/main.js',
  out: 'public',
  clearBeforeBuild: '!(*.json|*.manifest)',
  html: function (context) {
    function header(css) {
      var header = '<!DOCTYPE html>';
      header += '<html manifest="cache.manifest">';
      header += '<head><meta charset="utf-8">';
      header += '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">';
      header += '<link rel="manifest" href="manifest.json">';
      header += '<meta name="apple-mobile-web-app-capable" content="yes">';
      header += '<meta name="mobile-web-app-capable" content="yes">';
      header += '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">';
      header += '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">';
      header += '<link href="' + css + '" rel="stylesheet" type="text/css" />';
      header += '</head>';
      return header;
    }
    
    function footer(js) {
       var footer = '<script src="' + js + '"></script>';
       footer += '</html>'
       return footer;
    }
    
    function render (state) {
      return header(context.css) + toHtml(app(state)) + footer(context.main);
    }

    return {
      'about.html': render({url: '/about', count: 0}),
      'index.html': render({url: '/', count: 0})
    }
  }
})

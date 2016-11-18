require('babel-register')
var webpack = require('webpack')
var fs = require('fs')
var rimraf = require('rimraf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var toHtml = require('vdom-to-html')
var containsPath = require('contains-path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var getPackage = require('./getPackage')

var cwd = process.cwd()
var pack = getPackage(null);
var app = require('./src/views/app').default

var config = {
  entry: './src/main.js',
  output: {
    path: './public',
    filename: buildFilename(pack, null, 'js'),
    cssFilename: buildFilename(pack, null, 'css')
  },
  https: false,
  port: 3000,
  hostname: 'localhost',
  urlLoaderLimit: 10000,
  clearBeforeBuild: '!(*.json|*.manifest)',
  serveCustomHtmlInDev: true,
  resolve: {
      extensions: [
        '',
        '.js',
        '.jsx',
        '.json'
      ]
    },
  module: {
    loaders: []
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      title: 'Dead Man Switch',
      template: './src/views/index.ejs',
      unsupportedBrowser: true
    })
  ]
};

config.plugins.push(
  new ExtractTextPlugin(config.output.cssFilename, {
    allChunks: true
  })
);

var optionalBaseLoaders = [
  {
    pkg: 'worker-loader',
    config: {
      test: /(^|\.)worker\.js$/,
      exclude: /node_modules/,
      loaders: ['worker-loader']
    }
  },
  {
    pkg: 'worker-loader',
    config: {
      test: /(^|\.)thread\.js$/,
      exclude: /node_modules/,
      loaders: ['worker-loader?inline']
    }
  },
  {
    pkg: 'babel-loader',
    config: {
      test: /\.(js|jsx|babel)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }
  },
  {
    pkg: 'cjsx-loader',
    config: {
      test: /\.cjsx$/,
      loaders: ['coffee-loader', 'cjsx-loader']
    }
  },
  {
    pkg: 'json-loader',
    config: {
      test: /\.json$/,
      loaders: ['json']
    }
  },
  {
    pkg: 'url-loader',
    config: {
      test: /\.otf(\?\S*)?$/,
      loader: 'url-loader?limit=' + config.urlLoaderLimit
    }
  },
  {
    pkg: 'url-loader',
    config: {
      test: /\.eot(\?\S*)?$/,
      loader: 'url-loader?limit=' + config.urlLoaderLimit
    }
  },
  {
    pkg: 'url-loader',
    config: {
      test: /\.svg(\?\S*)?$/,
      loader: 'url-loader?mimetype=image/svg+xml&limit=' + config.urlLoaderLimit
    }
  },
  {
    pkg: 'url-loader',
    config: {
      test: /\.ttf(\?\S*)?$/,
      loader: 'url-loader?mimetype=application/octet-stream&limit=' + config.urlLoaderLimit
    }
  },
  {
    pkg: 'url-loader',
    config: {
      test: /\.woff2?(\?\S*)?$/,
      loader: 'url-loader?mimetype=application/font-woff&limit=' + config.urlLoaderLimit
    }
  },
  {
    pkg: 'url-loader',
    config: {
      test: /\.(jpe?g|png|gif)$/,
      loader: 'url-loader?limit=' + config.urlLoaderLimit
    }
  },
  {
    pkg: 'jade-loader',
    config: {
      test: /\.jade$/,
      loaders: ['jade']
    }
  },
  {
    pkg: 'sass-loader',
    config: {
      test: /\.scss$/,
      // dev
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader?indentedSyntax')
      // prod
      //loader: 'style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax'
    }
  }
]

optionalBaseLoaders.forEach(function (item) {
  if (isInstalled(item.pkg)) {
    config.module.loaders.push(item.config)
  }
})

if (isInstalled('autoprefixer')) {
  config.postcss = [require('autoprefixer')()]
}

function buildFilename (pack, hash, ext) {
  return [
    pack.name,
    // extract-text-plugin uses [contenthash] and webpack uses [hash]
    hash ? (ext === 'css' ? '[contenthash]' : '[hash]') : pack.version,
    ext || 'js'
  ].join('.')
}

function isInstalled(name) {
  try {
    require.resolve(name)
    return true
  } catch (e) {
    return false
  }
}

if (config.clearBeforeBuild) {
  // Throw error if trying to clear output directory but it contains the cwd
  // See https://github.com/HenrikJoreteg/hjs-webpack/issues/186
  if (containsPath(cwd, config.output.path)) {
    throw new Error('Cannot clear out directory since it contains the current working directory.\nTried to clear ' + config.output.path + ' from ' + cwd)
  }

  // allow passing a glob (limit to within folder though)
  if (typeof config.clearBeforeBuild === 'string') {
    // create the output folder if it doesn't exist
    // just for convenience
    if (!fs.existsSync(config.output.path)) {
      fs.mkdirSync(config.output.path)
    }
    rimraf.sync(config.output.path + '/' + config.clearBeforeBuild)
  } else {
    rimraf.sync(config.output.path)
    fs.mkdirSync(config.output.path)
  }
}

module.exports = config;
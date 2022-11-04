const path = require('path');

module.exports = (env) => {
  return {
    mode: 'production',
    devtool: false,
    entry: {
      index: {
        import: './src/index.js',
      },
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './dist'),
      clean: true,
      library: 'umd',
      libraryTarget: 'umd'
    },
    optimization: {
      usedExports: true,
      splitChunks: {
        cacheGroups: {
          venders: {
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors'
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/(node_modules)/],
          loader: 'babel-loader',
        }
      ]
    }
  };
};
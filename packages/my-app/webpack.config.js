const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  return {
    mode: 'development',
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
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'MyApp',
        template: './src/index.html'
      })
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000,
    },
  };
};
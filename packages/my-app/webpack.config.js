const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = (env) => {
  return {
    mode: 'development',
    devtool: false,
    entry: './src/index',
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
      // compress: true,
      port: 8101,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'app',
        // filename: 'remoteEntry.js',
        remotes: {
          "my-lib": "myLib@//localhost:8001/remoteEntry.js",
          // "primary-component-package/componentPackage": "tiangongPrimaryComponentPackage@//localhost:9001/remoteEntry.js",
          // "primary-component-package/button": "tiangongPrimaryComponentPackage@//127.0.0.1:5501/remoteEntry.js"
        },
        shared: { 'lodash': { singleton: true } }
      }),
      new HtmlWebpackPlugin({
        title: 'MyApp',
        template: './src/index.html'
      }),
    ],
  };
};
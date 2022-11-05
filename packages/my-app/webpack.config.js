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
      port: 9001,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'app',
        // filename: 'remoteEntry.js',
        remotes: {
          "lib2": "lib2@//localhost:9002/remoteEntry.js"
        }
      }),
      new HtmlWebpackPlugin({
        title: 'MyApp',
        template: './src/index.html'
      }),
    ],
  };
};
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = (env) => {
  return {
    mode: 'development',
    devtool: false,
    entry: './src/index',
    output: {
      publicPath: 'auto',
    },
    devServer: {
      static: path.join(__dirname, 'dist'),
      port: 9002,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'lib2',
        filename: 'remoteEntry.js',
        library: { type: 'var', name: 'lib2' },
        exposes: {
          './Util': './src/util.js',
        },
      })
    ],
  };
};
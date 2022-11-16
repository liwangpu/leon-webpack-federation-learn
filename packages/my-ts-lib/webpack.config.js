const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = (env) => {
  return {
    entry: './src/index.ts',
    mode: 'development',
    devtool: false,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './dist'),
      clean: true,
    },
    devServer: {
      static: path.join(__dirname, 'dist'),
      port: 8003,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'my-ts-lib',
        filename: 'remoteEntry.js',
        library: { type: 'var', name: 'myTsLib' },
        exposes: {
          './Util': './src/util.ts',
        },
      })
    ],
  };
};
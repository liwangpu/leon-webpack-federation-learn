const path = require('path');
const webpack = require('webpack');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = (env) => {
  return {
    mode: 'development',
    devtool: false,
    entry: {
      index: './src/index.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: 'auto'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js','.css','.less'],
    },
    devServer: {
      static: path.join(__dirname, 'dist'),
      port: 9102,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.less$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true
                },
              },
            }
          ]
        }
      ]
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'my-react-lib',
        library: { type: 'var', name: 'myReactLib' },
        filename: 'remoteEntry.js',
        exposes: {
          './Button': './src/Button',
        },
        shared: {
          react: {
            eager: true,
            singleton: true,
            strictVersion: false,
            // requiredVersion: '18.2.0'
          },
          'react-dom': {
            eager: true,
            singleton: true,
            strictVersion: false,
            // requiredVersion: '18.2.0'
          }
        },
      }),
    ]
  };
};
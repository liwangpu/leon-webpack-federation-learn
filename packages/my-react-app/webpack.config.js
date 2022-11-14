const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = (env) => {
  return {
    mode: 'production',
    devtool: false,
    entry: {
      index: './src/app.tsx',
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      historyApiFallback: true,
      port: 9101,
      hot: true
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
        // {
        //   test: /\.(js|mjs|jsx|ts|tsx)$/,
        //   loader: 'babel-loader'
        // },
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
      new webpack.HotModuleReplacementPlugin(),
      new ModuleFederationPlugin({
        name: 'react-app',
        // filename: 'remoteEntry.js',
        remotes: {
          "my-react-lib": "myReactLib@//localhost:9102/remoteEntry.js"
        },
        // shared: {
        //   react: {
        //     eager:true,
        //     singleton: true,
        //     strictVersion: true,
        //     requiredVersion: '18.2.0'
        //   },
        //   'react-dom': {
        //     eager:true,
        //     singleton: true,
        //     strictVersion: true,
        //     requiredVersion: '18.2.0'
        //   }
        // },
      }),
      new HtmlWebpackPlugin({
        title: '代码分隔',
        template: './public/index.html'
      })
    ],
  };
};
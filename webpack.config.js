const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'messenger.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    fallback: {
      fs: false,
    },
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js',
    },
  },
  devServer: {
    port: '1008',
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json'),
          },
        }],
        exclude: /(node_modules)(\.tmpl\.ts)?$/,
      },
      {
        test: /\.(sc|c)ss?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style-[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};

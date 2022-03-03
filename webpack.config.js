const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@decorators': path.resolve(__dirname, './src/decorators'),
      '@state': path.resolve(__dirname, './src/state'),
      '@templateClass': path.resolve(__dirname, './src/templateClass'),
      '@models': path.resolve(__dirname, './src/models'),
      '@components': path.resolve(process.cwd(), './src/components')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, 'dist')
  },
};

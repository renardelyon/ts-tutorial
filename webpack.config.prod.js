const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
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
    },
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, 'dist')
  },
};

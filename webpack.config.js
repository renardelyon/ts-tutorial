const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
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
      inject: 'body',
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'map.html'),
      filename: 'map.html'
    })
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: 'http://localhost:8080/'
    },
  },
};

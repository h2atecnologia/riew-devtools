const webpack = require('webpack');

module.exports = {
  // entry: ['regenerator-runtime/runtime', './src/index.js'],
  entry: ['./src/index.tsx'],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
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
    path: `${__dirname}/../extension`,
    publicPath: '/',
    filename: 'riew.js',
  },
  watch: true,
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
    }),
  ],
};

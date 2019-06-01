module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'build.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};
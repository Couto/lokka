module.exports = {

  entry: {
    lokka: './lib/index.js',
    transport: './lib/transport.js',
  },

  output: {
    filename: '[name].js',
    path: '.',
    libraryTarget: 'umd',
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
  }
};

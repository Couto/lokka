module.exports = {

  entry: './index.js',

  output: {
    filename: 'lokka.js',
    path: '.',
    libraryTarget: 'umd',
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
  }
};

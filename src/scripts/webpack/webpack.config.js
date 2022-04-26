const path = require('path');

module.exports = {
  entry: './src/debug.js',
  output: {
    filename: 'debug.js',
    path: path.resolve(__dirname, '..'),
  },
};

module.exports = {
  entry: './src/chart.js',
  output: {
    filename: 'chart.js',
    path: path.resolve(__dirname, '..'),
  },
};
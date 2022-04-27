const path = require('path');

module.exports = [{
  entry: './src/debug.js',
  output: {
    filename: 'debug.js',
    path: path.resolve(__dirname, '..'),
  },
},
{
  entry: './src/chart.js',
  output: {
    filename: 'chart.js',
    path: path.resolve(__dirname, '..'),
  },
},
{
  entry: './src/analysis.js',
  output: {
    filename: 'analysis.js',
    path: path.resolve(__dirname, '..'),
  },
}];
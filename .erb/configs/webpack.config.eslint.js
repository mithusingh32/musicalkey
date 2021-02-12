/* eslint import/no-unresolved: off, import/no-self-import: off */
// require('../.erb/scripts/node_modules/@babel/register');
require('@babel/register')

module.exports = require('./webpack.config.renderer.dev.babel').default;

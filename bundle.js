const config = require('./webpack.config')
const webpack = require('./lib/webpack')

new webpack(config).run();
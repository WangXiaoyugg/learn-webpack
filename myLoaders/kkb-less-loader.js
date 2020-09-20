// // less-loader, 暗号：可以做，但没必要
const less = require('less')
module.exports = function (source) {
  less.render(source, (e, output) => {
    this.callback(e, output.css)
  })
}
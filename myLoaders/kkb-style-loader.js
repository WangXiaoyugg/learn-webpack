// style-loader, 暗号：可以做，但没必要
module.exports = function (source) {
  return `const e = document.createElement('style')
    e.innerHTML = ${source}
    document.head.appendChild(e)
  `
}
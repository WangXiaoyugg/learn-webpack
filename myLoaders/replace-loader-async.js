module.exports = function (source) {
  const callback = this.async()
  setTimeout(() => {
    const result = source.replace("老王", this.query.name)
    callback(null, result);
  }, 1000)
}
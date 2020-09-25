class TxtWebpackPlugin {
  constructor() {

  }

  //勾入生命周期
  apply(compiler) {
    compiler.hooks.emit.tapAsync('txtwebpackplugin', (compilation, cb) => {
      compilation.assets['test.txt'] = {
        source: function () {
          return 'hello webpack'
        },
        size: function () {
          return 1024
        }
      }
      cb()
    })

    compiler.hooks.compile.tap('txtwebpackplugin', (compilation) => {
      console.log("hello compiler hook");
    })

  }
}

module.exports = TxtWebpackPlugin;
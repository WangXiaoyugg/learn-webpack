// 暗号： 做人嘛，最重要的是开心
// webpack每次打包结束后，自动产生一个打包文件清单，文件上记录文件名，文件数量等信息
class FileWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('fileWebpackPlugin', (compilation, cb) => {
      let fileCount = Object.keys(compilation.assets).length;
      let content = '文件的数量：' + fileCount + '\n文件名称：'
      for (let filename in compilation.assets) {
        content += `${filename}, `;
      }
      compilation.assets['file.txt'] = {
        source: function () {
          return content
        },
        size: function () {

        }
      }
      cb()
    })
  }
}

module.exports = FileWebpackPlugin;
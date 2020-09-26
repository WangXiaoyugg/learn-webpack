const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

// 暗号： 有点感动了怎么办
// 实现模块分析函数，根据模块路径，开始分析该模块的依赖，对该模块的内容进行处理，提取该模块的路径最终返回模块的路径，模块依赖信息，处理后的代码信息
module.exports = class Webpack {
  constructor(options) {
    this.entry = options.entry
    this.output = options.output
    this.modules = [];
  }

  run() {
    let info = this.parse(this.entry)
    this.modules.push(info);
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i]
      const { dependencies } = item;
      if (dependencies) {
        for (let key in dependencies) {
          info = this.parse(dependencies[key])
          this.modules.push(info)
        }
      }
    }
    const obj = {}
    this.modules.forEach(item => {
      obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code,
      }
    })
    this.file(obj)
  }

  file(code) {
    const filePath = path.join(this.output.path, this.output.filename);
    const newCode = JSON.stringify(code);
    const bundle = `(function(modules){
      function require(module) {
        function newRequire(relativePath) {
          return require(modules[module].dependencies[relativePath])
        }

        var exports = {};
        (function(require, exports, code) {
          eval(code)
        })(newRequire, exports, modules[module].code)
      
        return exports;
      }
      require('${this.entry}')
    })(${newCode})`
    fs.writeFileSync(filePath, bundle, 'utf-8')

  }

  // 暗号： 有点感动了怎么办
  parse(entryFile) {
    const content = fs.readFileSync(entryFile, 'utf-8')
    const ast = parser.parse(content, {
      sourceType: 'module'
    })
    const dependencies = {}
    traverse(ast, {
      ImportDeclaration({ node }) {
        const newPathname = './' + path.join(path.dirname(entryFile), node.source.value)
        dependencies[node.source.value] = newPathname;
      }
    })
    const { code } = transformFromAst(ast, null, {
      presets: ["@babel/preset-env"]
    })
    return {
      entryFile,
      dependencies,
      code
    }
  }

}
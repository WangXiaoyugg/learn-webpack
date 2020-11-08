const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')
module.exports = class Webpack {
  constructor(options) {
    this.entry = options.entry
    this.output = options.output
    this.modules = []
  }
  run() {
    let info = this.parse(this.entry)
    this.modules.push(info);
    for (let i = 0; i < this.modules.length; i++) {
      let item = this.modules[i]
      let { dependencies } = item;
      if (dependencies) {
        for (let key in dependencies) {
          this.modules.push(this.parse(dependencies[key]))
        }
      }
    }
    let obj = {}
    this.modules.forEach(item => {
      obj[item.entryFile] = {
        code: item.code,
        dependencies: item.dependencies
      }
    })
    this.file(obj)
  }
  file(code) {
    let newCode = JSON.stringify(code);
    let bundle = `(function(modules){
      function require(module) {
        function newRequire(relativePath) {
          return require(modules[module].dependencies[relativePath])
        }
        var exports = {};
        (function(require,exports,code){
          eval(code)
        })(newRequire, exports, modules[module].code)
        return exports;
      }

      require('${this.entry}')

    })(${newCode})`
    let distPath = path.join(this.output.path, this.output.filename);

    fs.writeFileSync(distPath, bundle, 'utf-8');

  }

  parse(entryFile) {
    let content = fs.readFileSync(entryFile, 'utf-8')
    let ast = parser.parse(content, {
      sourceType: 'module'
    })
    let dependencies = {}

    traverse(ast, {
      ImportDeclaration({ node }) {
        dependencies[node.source.value] = './' + path.join(path.dirname(entryFile), node.source.value)
      }
    })

    let { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })

    return {
      entryFile,
      code,
      dependencies,
    }

  }
}
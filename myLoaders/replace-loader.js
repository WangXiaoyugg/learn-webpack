// 不可以是箭头函数
// 必须有返回值
// 如何返回多值
// 如何处理异步逻辑
// 如何处理多个自定义loader
module.exports = function (source) {
  const result = source.replace("hello", '哇塞')
  return result;
}
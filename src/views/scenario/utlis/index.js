export function flattenArray(arr) {
  let result = []
  arr.forEach(function(element) {
    if (Array.isArray(element)) {
      // 递归拍平嵌套数组
      result = result.concat(flattenArray(element))
    } else {
      result.push(element)
    }
  })

  return result
}

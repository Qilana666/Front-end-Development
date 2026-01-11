/\*\*

- @param {string[]} strs
- @return {string}
  \*/
  var longestCommonPrefix = function (strs) {
  // !strs.length 为真，即 strs.length===0
  if (!strs.length) return ''
  let res = strs[0]
  for (ch of strs) {
  for (let i = 0; i < res.length; i++) {
  if (ch[i] !== res[i]) {
  res = res.slice(0, i)
  break
  }
  }
  }
  return res
  };

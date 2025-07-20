// 给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。
// 示例 1:
// 输入: "abab"
// 输出: True
// 解释: 可由子字符串 "ab" 重复两次构成。
// 示例 2:
// 输入: "aba"
// 输出: False
// 示例 3:
// 输入: "abcabcabcabc"
// 输出: True
// 解释: 可由子字符串 "abc" 重复四次构成。 (或者子字符串 "abcabc" 重复两次构成。)
/**
 * @param {string} s
 * @return {boolean}
 */
// 思路：
// kmp算法
// 时间复杂度 O(n)
// 空间复杂度 O(n)
// 如果有一个字符串s，在 s + s 拼接后， 不算首尾字符，如果能凑成s字符串，说明s 一定是重复子串组成(但是本题不用这种方法)
// 在一个串里找另一个串，使用kmp算法
// 最长相同前后缀和重复子串的关系是：
// 如果一个字符串s是由重复子串组成，那么 最长相等前后缀不包含的子串一定是字符串s的最小重复子串 —— 充分条件
// 分三种情况
// 最长相等前后缀不包含的子串的长度 比 字符串s的一半的长度还大，那一定不是字符串s的重复子串
 // 最长相等前后缀不包含的子串的长度 可以被 字符串s的长度整除， 那一定是字符串s的重复子串
// 最长相等前后缀不包含的子串的长度 不被 字符串s的长度整除 ，最长相等前后缀不包含的子串就不是s的重复子串
// 如果字符串s的最长相等前后缀不包含的子串 是 s最小重复子串，那么 s是由重复子串组成 —— 必要条件
var repeatedSubstringPattern = function(s) {
  if(s.length === 0) return false;
  const next = getNext(s);
  const len = s.length;
  if(next[len - 1] !== -1 && len % (len - (next[len - 1] + 1))/** len - (next[len - 1] + 1) 计算的是最长相等前后缀不包含的子串的长度 */ === 0){
    /**
     * - 如果字符串有最长相等前后缀（ next[len - 1] !== -1 ）
       - 并且字符串的长度能被最小重复子串的长度整除
       - 那么这个字符串就是由重复子串构成的
     */
    return true;
  }
  return false;
}
// 构造next数组
const getNext = (s) => {
  let next = [];
  let j = -1;
  next[0] = j;
  for(let i = 1; i < s.length; i++){
    while(j >= 0 && s[i] !== s[j + 1]){
        j = next[j];
    }
    if(s[i] === s[j + 1]){
        j++;
    }
    next[i] = j;
  }
  return next;
}

console.log(repeatedSubstringPattern('abcabcabcabc'));
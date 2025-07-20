// strStr
// 实现 strStr() 函数。
// 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。
// 示例 1:
// 输入: haystack = "hello", needle = "ll"
// 输出: 2
// 示例 2:
// 输入: haystack = "aaaaa", needle = "bba"
// 输出: -1
// 说明:
// 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。
// 对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与C语言的 strstr() 以及 Java的 indexOf() 定义相符。
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
// 暴力解法（双指针）
var strStr = function(haystack, needle) {
  // 思路： 定义两个指针，一个指向haystack， 一个指向needle
  // 一个指针用来指定从haystack的哪个位置开始匹配
  // 另一个指针用来匹配needle
  if(needle.length === 0) return 0;
  if(haystack.length < needle.length) return -1;
  let i = 0, j = 0;
  while(i < haystack.length && j < needle.length){
    if(haystack[i + j] === needle[j]){
        j++;
    } else {
        i++;
        j = 0;
    }
  }
  return j === needle.length ? i : -1;
}
// console.log(strStr("hello", "ll"));
// 时间复杂度：O(m*n)
// 空间复杂度：O(1)
// kmp算法
// 时间复杂度：O(m+n)
// 空间复杂度：O(m)
// next数组: 前缀表
// 前缀表是用来回退的，它记录了模式串与主串(文本串)不匹配的时候，模式串应该从哪里开始重新匹配。
// 前缀表的任务是当前位置匹配失败，找到之前已经匹配上的位置，再重新匹配，此也意味着在某个字符失配时，前缀表会告诉你下一步匹配中，模式串应该跳到哪个位置。
// next数组的工作原理：1. 初始化 2. 利用已经计算出的next值来计算新的next值 3.当模式串中位置j与主串不匹配时，将j更新为next[j],相当于将模式串向右移动
// 1. 初始化
// 2. 处理前后缀不相同的情况
// 3. 处理前后缀相同的情况
// 4. 更新next数组
// 5. 得到next数组
const strStrWithKmp = (haystack, needle) => {
  const getNext = (s) => {
    const next = [];
    let j = -1;
    next[0] = j;
    // 前后缀必须是真子串（不能是字符串本身）
    // i指向的是当前要计算最长相等前后缀长度的子串的最后一个字符，由于当前子串的长度为1，所以j = -1；当i=0时，由于没有前面的字符，所以不需要计算
    // j表示当前已找到的最长相等后缀的长度，同时也指向前缀的最后一个字符
    for(let i = 1; i < s.length; i++){
      while(j >= 0 && s[i] !== s[j + 1]) {
        j = next[j]; // 当模式串中位置j与主串不匹配时，将j更新为next[j]
      }
      if(s[i] === s[j + 1]){
        j++; // 当模式串中位置j与主串匹配时，j++
        // 当模式串中位置j与主串匹配时，j++，此时j指向的是当前已找到的最长相等后缀的最后一个字符
      }
      next[i] = j; // 更新next数组，记录当前位置的最长相等前后缀长度
    }
    return next;
  }
  if(needle.length === 0) return 0;
  if(haystack.length < needle.length) return -1;
  const next = getNext(needle);
  // console.log(next);
  let j = -1;
  for(let i = 0; i < haystack.length; i++){ // i 指向的是匹配成功的最后一个字符在 haystack 中的位置
    while(j >= 0 && haystack[i] !== needle[j + 1]) {
      j = next[j]; // 当模式串中位置j与主串不匹配时，将j更新为next[j]
    }
    if(haystack[i] === needle[j + 1]){
      j++;
    }
    if(j === needle.length - 1){
      return i - j; // 
    }
  }
  return -1;
}
console.log(strStrWithKmp("hello", "ll"));


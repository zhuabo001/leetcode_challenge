// URL_ADDRESScode.cn/problems/reverse-string-ii/
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
const reverseString = (s, k) => {
  const len = s.length;
  let resArr = s.split("");
  // 在遍历字符串的过程中，只要让 i += (2 * k)，i 每次移动 2 * k 就可以了，然后判断是否需要有反转的区间。
  for(let i = 0; i < len; i += 2 * k){
    reverse(resArr, i, Math.min(i + k, len) - 1);
  }
  return resArr.join("");
}
const reverse = (arr, left, right) => {
  while(left < right){
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}
// 时间复杂度：O(n)
// 空间复杂度：O(n) ｜ O(1) 取决于语言中的string能否被修改
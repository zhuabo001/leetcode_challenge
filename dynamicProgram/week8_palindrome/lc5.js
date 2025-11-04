// 5. 最长回文子串
// 给你一个字符串 s，找到 s 中最长的回文子串。
// 示例 1：
// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。
// 示例 2：
// 输入：s = "cbbd"
// 输出："bb"
const findLongestPalindrome = (s) => {
  if (s.length === 0) return '';
  const len = s.length;
  let ans = s[0];
  const dp = new Array(len).fill().map(() => new Array(len).fill(false));
  for (let i = len - 1; i >= 0; i--) {
    for (let j = i; j < len; j++) {
      if (i === j) {
        dp[i][j] = true;
      } else if (s[i] === s[j] && j - i <= 1) {
        dp[i][j] = true;
      } else if (s[i] === s[j] && dp[i + 1][j - 1] === true) {
        dp[i][j] = true;
      }
      if (dp[i][j] === true && j - i + 1 > ans.length) {
        ans = s.slice(i, j + 1);
      }
    }
  }
  return ans;
};
// 时间复杂度：O(n^2) - 外层从len-1到0， 内层从i到len - 1，n x (n/2)
// 空间复杂度：O(n^2) - 二维dp数组

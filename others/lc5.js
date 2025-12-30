// 最长回文子串
// 给你一个字符串 s，找到 s 中最长的回文子串。
// 示例 1：
// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。
// 示例 2：
// 输入：s = "cbbd"
// 输出："bb"

const longestSubPalindrome = (s) => {
  if (s.length === 0) return '';
  let res = s[0];
  const len = s.length;
  const dp = new Array(len).map(new Array(len).fill(false));
  for (let i = len - 1; i >= 0; i--) {
    // i从后向前遍历， 确保依赖的子问题第一时间被解决
    // 因为dp[i][j]依赖于去掉当前首尾的dp[i+1][j-1]
    // 如果从前往后遍历，那计算dp[i][j] 时 dp[i+1][j-1]还没算出来
    for (let j = i; j < len; j++) {
      if (i === j) {
        // 当前为某个字符
        dp[i][j] = true;
      }
      if (s[i] === s[j] && j - i <= 1) {
        // 相邻字符相等
        dp[i][j] = true;
      }
      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        // s(i, j)为回文串且s[i]和s[j]一样那么
        dp[i][j] = true;
      }

      if (dp[i][j] && j - i + 1 > res.length) {
        res = s.slice(i, j + 1); // 更新答案
      }
    }
  }
  return res;
};
// 时间复杂度：O(n^2) - 外层从len-1到0， 内层从i到len - 1，n x (n/2)
// 空间复杂度：O(n^2) - 二维dp数组

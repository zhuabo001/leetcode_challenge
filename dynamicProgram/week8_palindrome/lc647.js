// 647. 回文子串
// 给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。
// 回文字符串 是正着读和倒过来读一样的字符串。
// 子字符串 是字符串中的由连续字符组成的一个序列。
// 示例 1：
// 输入：s = "abc"
// 输出：3
// 解释：三个回文子串: "a", "b", "c"
// 示例 2：
// 输入：s = "aaa"
// 输出：6
// 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
const countPalindrome = (s) => {
  // dp[i][j] 表示在s[i, j](左闭右闭)这个子字符串是否是回文串
  const len = s.length;
  const dp = new Array(len).fill(false).map(() => new Array(len).fill(false));
  // 状态转移方程：
  // 1. 当s[i] === s[j]时，且dp[i+1][j-1] = true时，则dp[i][j] = true;
  // 2. 当s[i] === s[j] 且 j - i <= 1时，也有dp[i][j] = true;
  // 3. i === j时,dp[i][j] = true;
  // 初始化dp数组 初始就是false
  let count = 0;
  // 确定遍历顺序： 由于dp[i][j]依赖dp[i + 1][j - 1], 所以二维数组应该是从下到上，从左到右遍历
  // 举例推导dp数组
  for (let i = len - 1; i >= 0; i--) {
    for (let j = i; j < len; j++) {
      if (s[i] === s[j]) {
        if (i + 1 < len && j - 1 >= 0 && dp[i + 1][j - 1] /**状态转移方程1 */) {
          dp[i][j] = true;
          count++;
        } else if (j - i <= 1 /**状态转移方程2、3 */) {
          dp[i][j] = true;
          count++;
        }
      }
    }
  }
  return count;
};
// 时间复杂度：O(n^2) - 外层从len-1到0， 内层从i到len - 1，n x (n/2)
// 空间复杂度：O(n^2) - 二维dp数组

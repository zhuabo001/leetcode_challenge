// 1143. 最长公共子序列
// 给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列的长度。如果不存在公共子序列，返回 0 。
// 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
// 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
// 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。
// 示例 1：
// 输入：text1 = "abcde", text2 = "ace"
// 输出：3
// 解释：最长公共子序列是 "ace" ，它的长度为 3 。
// 示例 2：
// 输入：text1 = "abc", text2 = "abc"
// 输出：3
// 解释：最长公共子序列是 "abc" ，它的长度为 3 。
// 示例 3：
// 输入：text1 = "abc", text2 = "def"
// 输出：0
// 解释：两个字符串没有公共子序列，返回 0 。
const longestCommonSubSequence = (str1, str2) => {
  // 和lc718的区别是，这里是不要求连续的，所以dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
  // 确定dp[i][j]的含义：dp[i][j]表示str1[0,i - 1]和str2[0，j - 1]的最长公共子序列的长度
  // 状态转移方程：
  // 当str1[i - 1] === str2[j - 1]时，dp[i][j] = dp[i - 1][j - 1] + 1;
  // 当str1[i - 1] !== str2[j - 1]时，dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
  // str1[0, i - 2]和str2[0, j - 1]的最长公共子序列的长度与str1[0, i - 1]和str2[0, j - 2]的最长公共子序列的长度相比去最大
  // dp数组初始化，和空串比怎么都是0 所以dp[i][0] = 0, dp[0][j] = 0
  // q确定遍历顺序
  // 举例推导dp数组
  if (!str1 || !str2) return 0;
  let res = 0;
  const len_1 = str1.length,
    len_2 = str2.length;
  const dp = new Array(len_1 + 1)
    .fill(0)
    .map(() => new Array(len_2 + 1).fill(0));
  for (let i = 0; i <= len_1; i++) {
    dp[i][0] = 0;
  }
  for (let j = 0; j <= len_2; j++) {
    dp[0][j] = 0;
  }
  for (let i = 1; i <= len_1; i++) {
    for (let j = 1; j <= len_2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
      if (dp[i][j] > res) {
        res = dp[i][j];
      }
    }
  }
  return res;
};
// 时间复杂度：O(n x m) - 双循环
// 空间复杂度：O(n x m) - dp数组

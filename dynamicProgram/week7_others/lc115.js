// 115. 不同的子序列
// 给你两个字符串 s 和 t ，统计并返回在 s 的 子序列 中 t 出现的个数。
// 题目数据保证答案符合 32 位带符号整数范围。
// 示例 1：
// 输入：s = "rabbbit", t = "rabbit"
// 输出：3
// 解释：
// 如下所示, 有 3 种可以从 s 中得到 "rabbit" 的方案。
// rabbbit
// 示例 2：
// 输入：s = "babgbag", t = "bag"
// 输出：5
// 解释：
// 如下所示, 有 5 种可以从 s 中得到 "bag" 的方案。
// babgbag
const numSubsequence = (s, t) => {
  if (s.length === 0) return 0;
  // 确定dp数组含义
  // dp[i][j] 表示s的[0, i - 1]中出现t的[0, j - 1]的个数
  // 状态转移方程
  // 如果s[i - 1] === t[j - 1], 则有dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]/**这里为什么加上dp[i - 1][j]是因为可以不使用s[i - 1]这个字符 例如s = bagg, t = bag, 那么bagg中可以不使用最后一位的g这个字符, 所以dp[i - 1][j]就是不使用s[i - 1]这个字符的个数*/;
  // 若不相等,则dp[i][j] = dp[i - 1][j]; 也就是说此时的个数等于s[0, i - 2]和t[0, j - 1]的个数
  const len_1 = s.length,
    len_2 = t.length;
  const dp = new Array(len_1 + 1)
    .fill(0)
    .map(() => new Array(len_2 + 1).fill(0));
  // 初始化dp数组
  for (let i = 0; i <= len_1; i++) {
    dp[i][0] = 1; // t为空字符串, 所以s的任何子序列都包含t, 所以dp[i][0] = 1;
  }
  for (let j = 0; j <= len_2; j++) {
    dp[0][j] = 0; // s为空字符串, 所以s的任何子序列都不包含t, 所以dp[0][j] = 0;
  }
  dp[0][0] = 1; // s和t都为空字符串, 所以dp[0][0] = 1; 或者j从1开始，不要覆盖dp[i][0]的初始化
  // 确定dp数组遍历顺序
  // 举例推导dp数组
  for (let i = 1; i <= len_1; i++) {
    for (let j = 1; j <= len_2; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[len_1][len_2];
};
// 时间复杂度：O(n * m) - 遍历一次s和t
// 空间复杂度：O(n * m) - dp数组

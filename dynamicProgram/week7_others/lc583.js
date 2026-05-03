// 583. 两个字符串的删除操作
// 给定两个单词 word1 和 word2 ，返回使得 word1 和  word2 相同所需的最小步数。
// 每步 可以删除任意一个字符串中的一个字符。
// 示例 1：
// 输入: word1 = "sea", word2 = "eat"
// 输出: 2
// 解释: 第一步将 "sea" 变为 "ea" ，第二步将 "eat" 变为 "ea"
// 示例 2：
// 输入：word1 = "leetcode", word2 = "etco"
// 输出：4
// 解释: 第一步将 "leetcode" 变为 "leetc" ，第二步将 "leetc" 变为 "etco"
const minDistance = (word1, word2) => {
  // 确定dp数组含义
  // dp[i][j] 表示以i-1结尾的word1和以j-1结尾的word2要想相等所需要删除元素的最小次数
  // 状态转移方程
  // 1. word1[i - 1] = word2[j-1]; dp[i][j] = dp[i-1][j-1];
  // 2. word1[i-1] !== word2[j - 1], 删除word1[i-1], dp[i][j] = dp[i-1][j] + 1
  // 3. 删除word2[j-1], dp[i][j] = dp[i][j-1] + 1
  // 4. 同时删除word1[i-1]和word2[j-1], dp[i][j] = dp[i-1][j-1] + 2
  const dp = new Array(word1.length + 1)
    .fill(0)
    .map(() => new Array(word2.length + 1).fill(0));
  // 初始化dp数组
  for (let i = 0; i <= word1.length; i++) {
    // word2为空字符串, 所以word1的任何子序列都不包含word2, 所以dp[i][0] = i;
    dp[i][0] = i;
  }
  for (let j = 0; j <= word2.length; j++) {
    // word1为空字符串, 所以word1的任何子序列都不包含word2, 所以dp[0][j] = j;
    dp[0][j] = j;
  }
  // 确定遍历顺序
  //举例推导dp数组
  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + 2
        );
      }
    }
  }
  return dp[word1.length][word2.length];
};
// 时间复杂度：O(n * m) - 遍历一次word1和word2
// 空间复杂度：O(n * m) - dp数组

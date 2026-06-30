// 72. 编辑距离
// 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数 。
// 你可以对一个单词进行如下三种操作：
// 插入一个字符 dp[i][j - 1] + 1 —— 先把 word1[0..i-1]（前 i 个字符）变成 word2[0..j-2]（前 j-1 个字符），此时还差 word2[j-1] 这个字符 → 把它插入到 word1
// 删除一个字符 dp[i - 1][j] + 1  —— 先把 word1[0..i-2]（前 i-1 个字符）变成 word2[0..j-1]（前 j 个字符），此时 word1 还剩一个 word1[i-1] 是多余的 → 删掉它
// 替换一个字符 dp[i - 1][j - 1] + 1

const editDistanceFunction = (word1: string, word2: string): number => {
  const len_1 = word1.length,
    len_2 = word2.length;
  const dp = new Array(len_1 + 1)
    .fill(0)
    .map(() => new Array(len_2 + 1).fill(0)); // word1 的前 i 个字符 → word2 的前 j 个字符的最少操作数
  for (let i = 0; i <= len_1; i++) {
    dp[i][0] = i; // 前 i 个字符变成空串，需要删除 i 次
  }
  for (let j = 0; j <= len_2; j++) {
    dp[0][j] = j; // 空串变成前 j 个字符，需要插入 j 次
  }
  for (let i = 1; i <= len_1; i++) {
    for (let j = 1; j <= len_2; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          Math.min(
            dp[i - 1][j - 1] /** 替换 */,
            dp[i][j - 1] /** 插入 */,
            dp[i - 1][j] /**删除 */
          ) + 1;
      }
    }
  }
  return dp[len_1][len_2];
};
// 时间复杂度 O(m*n)
// 空间复杂度 O(m*n)

// DP 状态分析:
// dp[i-1][j] + 1  —— 删除操作
//   - 先把 word1[0..i-2]（前 i-1 个字符）变成 word2[0..j-1]（前 j 个字符）
//   - 此时 word1 还剩一个 word1[i-1] 是多余的 → 删掉它
//
// dp[i][j-1] + 1  —— 插入操作
//   - 先把 word1[0..i-1]（前 i 个字符）变成 word2[0..j-2]（前 j-1 个字符）
//   - 此时还差 word2[j-1] 这个字符 → 把它插入到 word1
//
// dp[i-1][j-1] + 1 —— 替换操作
//   - 前 i-1 和前 j-1 个字符已经对齐，最后一对单词字符不相等 → 替换 word1[i-1] 为 word2[j-1]

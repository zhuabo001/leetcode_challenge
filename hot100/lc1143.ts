// 最长公共子序列
// dp[i][j] -> text1中到i为止，text2中到j为止的子序列公共部分长度
const longestCommonSubSequence = (text1: string, text2: string) => {
  if (!text1 || !text2) return 0;
  const len_1 = text1.length,
    len_2 = text2.length;
  let ans = 0;
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
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }

      if (dp[i][j] > ans) {
        ans = dp[i][j];
      }
    }
  }
  return ans;
};
// 时间复杂度 O(m * n) 两层嵌套循环遍历两个字符串
// 空间复杂度 二维数组 O(m * n)

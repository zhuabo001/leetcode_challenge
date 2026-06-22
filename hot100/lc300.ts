// 最长递增子序列
const longestIncreasedSubsequence = (nums: number[]) => {
  if (!nums || nums.length === 0) return 0;
  let max_len = 1;
  const dp = new Array(nums.length).fill(1); // dp[i]是以nums[i]为结尾的递增子序列长度
  dp[0] = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    max_len = Math.max(max_len, dp[i]);
  }
  return max_len;
};
// 时间复杂度 O(n ^ 2)
// 空间复杂度 O(n) dp数组和max_len

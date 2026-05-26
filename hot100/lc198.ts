// 打家劫舍
const rob = (nums: number[]) => {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  const dp = new Array(nums.length).fill(0); // 前 i+1 家（不管偷不偷第 i 家）的最大收益
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }
  return dp[nums.length - 1];
};
// 时间复杂度 O(n)
// 空间复杂度 O(n)

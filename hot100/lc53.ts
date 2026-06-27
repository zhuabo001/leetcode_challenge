// 最大子数组合。
const maxSubArray = (nums: number[]) => {
  if (!nums || nums.length === 0) return 0;
  const dp = new Array(nums.length).fill(0); // 以i为结尾的子数组的和
  dp[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i] /** dp[i-1]不是负数 */, nums[i]);
  }
  return Math.max(...dp);
};
// 时间复杂度 O(n)
// 空间复杂度 O(n)

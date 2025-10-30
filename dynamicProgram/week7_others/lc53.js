// 53. 最大子数组和
// 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
// 子数组 是数组中的一个连续部分。
// 示例 1：
// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
// 示例 2：
// 输入：nums = [1]
// 输出：1
// 解释：连续子数组 [1] 的和最大，为 1 。
// 示例 3：
// 输入：nums = [5,4,-1,7,8]
// 输出：23
// 解释：连续子数组 [5,4,-1,7,8] 的和最大，为 23 。
const maxSubArraySum = (nums) => {
  // dp[i]表示以nums[i]结尾的最大子序和
  // 状态转移方程 dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
  // 初始化dp数组
  // 确定遍历顺序
  // 举例推导dp数组
  if (!nums || nums.length === 0) return 0;
  const dp = new Array(nums.length).fill(0);
  let res = 0;
  dp[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    if (dp[i] > res) {
      res = dp[i];
    }
  }
  return res;
};
// 时间复杂度：O(n) - 遍历一次数组
// 空间复杂度：O(n) - dp数组

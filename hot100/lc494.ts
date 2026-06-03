// 目标和
const findTargetSum = (nums: number[], target: number) => {
  const sum = nums.reduce((pre, cur) => pre + cur, 0);
  if (sum < target) return 0;
  const diff = sum - target;
  if (diff < 0 || diff % 2 === 1) return 0;
  // 此时问题转换为nums中选取若干元素满足和为diff / 2
  const bagSize = Math.floor(diff / 2);
  const dp = new Array(nums.length + 1)
    .fill(0)
    .map(() => new Array(bagSize + 1).fill(0)); // 从前i个数字中选取数字组成和为j的方案数为dp[i][j];
  dp[0][0] = 1;
  for (let i = 1; i <= nums.length; i++) {
    const num = nums[i - 1 /**注意数组边界 */]; // DP 数组 dp[i] 表示「从前 i 个数字中选取」，所以遍历 i 从 1 到 nums.length 时，对应的是 0-indexed 的 nums[i - 1]
    for (let j = 0; j <= bagSize; j++) {
      if (j < num) {
        dp[i][j] = dp[i - 1][j]; // 不能选num
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i - 1][j - num]; // 前半是不选num 后半是选num
      }
    }
  }
  return dp[nums.length][bagSize];
};
// 时间复杂度 O(n * bagSize)
// 空间复杂度 O(n * bagSize)

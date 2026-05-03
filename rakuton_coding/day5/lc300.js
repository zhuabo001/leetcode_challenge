// 300. 最长递增子序列
// 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
// 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
// 示例 1：
// 输入：nums = [10,9,2,5,3,7,101,18]
// 输出：4
// 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
// 示例 2：
// 输入：nums = [0,1,0,3,2,3]
// 输出：4
// 示例 3：
// 输入：nums = [7,7,7,7,7,7,7]
// 输出：1
// dp[i][w] = 前i个物品，背包容量为w时的最大价值
// dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])
// 其中，dp[i-1][w] 表示不考虑第i个物品时，背包容量为w时的最大价值，dp[i-1][w-weight[i]] + value[i] 表示考虑第i个物品时，背包容量为w-weight[i]时的最大价值加上第i个物品的价值

const lengthOfLIS = (nums) => {
  // 1. 确定dp[i]：dp[i] 表示以 nums[i] 结尾的最长递增子序列的长度
  // 2. 状态推导公式： dp[i] = Math.max(dp[i], dp[j] + 1), 其中 0 <= j < i 且 nums[j] < nums[i]
  // 3. 初始化：dp[i] = 1, 其中 0 <= i < nums.length
  // 4. 遍历顺序：从前往后遍历
  // 5. 举例推导dp数组
  const dp = new Array(nums.length).fill(1);
  for (let i = 0; i < nums.length; i++) {
    // 考虑第i个背包
    for (let j = 0; j < i; j++) {
      // 遍历前面的物品
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);
};
// 时间复杂度：O(n^2)，其中 n 是数组 nums 的长度。
// 空间复杂度：O(n)，其中 n 是数组 nums 的长度。

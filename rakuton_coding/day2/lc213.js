// 打家劫舍 II
// 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。
// 给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。
// 示例 1：
// 输入：nums = [2,3,2]
// 输出：3
// 解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
// 示例 2：
// 输入：nums = [1,2,3,1]
// 输出：4
// 解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
// 偷窃到的最高金额 = 1 + 3 = 4 。
// 示例 3：
// 输入：nums = [1,2,3]
// 输出：3
const rob = (nums) => {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  // 分两种情况：
  // 1. 偷第一家，不偷最后一家
  // 2. 不偷第一家，偷最后一家
  // 取两种情况的最大值
  // 定义一个辅助函数robRange，用于计算在nums的闭区间[start, end]内的最大偷窃金额
  const robRange = (nums, start, end) => {
    // 动态规划
    const dp = new Array(nums.length).fill(0);
    // 1. dp[i] 表示考虑前i个房间，能够偷窃的最高金额
    // 2. 状态转移方程： dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    // 3. 初始化dp数组：dp[start] = nums[start], dp[start + 1] = Math.max(nums[start], nums[start + 1]);
    // 4. 确定遍历顺序： 从前向后遍历
    // 5. 返回dp[end]
    dp[start] = nums[start];
    dp[start + 1] = Math.max(nums[start], nums[start + 1]);
    for (let i = start + 2; i <= end; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    return dp[end];
  };
  // 情况1：偷第一家，不偷最后一家
  const max1 = robRange(nums, 0, nums.length - 2);
  // 情况2：不偷第一家，偷最后一家
  const max2 = robRange(nums, 1, nums.length - 1);
  return Math.max(max1, max2);
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

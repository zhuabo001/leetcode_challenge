// 416. 分割等和子集
// 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
// 示例 1：
// 输入：nums = [1,5,11,5]
// 输出：true
// 解释：数组可以分割成 [1, 5, 5] 和 [11] 。
// 示例 2：
// 输入：nums = [1,2,3,5]
// 输出：false
// 解释：数组不能分割成两个元素和相等的子集。
// 本题的本质：是否可以装满一个容量为 sum / 2 的背包
const canPartition = (nums) => {
  // 确定dp[i]的含义： 容量为j的背包，最多可以背dp[j]的价值， 元素只能用一次，说明是一个01背包问题；商品就是元素本身，重量即为价值
  // 确定dp数组的初始化: dp[0] = 0;
  // dp数组推导公式 dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i]), 前一个nums[i]代表重量，后一个nums[i]代表价值
  // 确定dp数组遍历顺序
  // 举例推导dp数组
  const sum = nums.reduce((pre, cur) => pre + cur, 0);
  if (sum % 2 === 1) return false;
  const target = Math.floor(sum / 2); // 当dp[target] === target时，说明背包被装满了
  const dp = new Array(target + 1 /** 这里target就是bagWeight */).fill(0);
  dp[0] = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = target; j >= nums[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i]);
    }
  }
  return dp[target] === target;
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(n)

// 最大子序和
// 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和
// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6

// 贪心解法
// 局部最优：当前“连续和”为负数的时候立刻放弃，从下一个元素重新计算“连续和”，因为负数加上下一个元素 “连续和”只会越来越小。
// 全局最优：选取最大“连续和”
// 遍历
const maxSubArray = (nums) => {
  let res = -Infinity;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    count += nums[i];
    if (count > res) res = count; // 更新res
    if (count < 0 /**连续和为负选择起始位置 */) count = 0; // 重置count；
  }
  return res;
};
// 时间复杂度O(n)
// 空间复杂度O(1)

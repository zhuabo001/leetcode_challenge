// 有多少小于当前数字的数字
// 给你一个数组 nums，对于其中每个元素 nums[i]，请你统计数组中比它小的所有数字的数目。
// 换而言之，对于每个 nums[i] 你必须计算出有效的 j 的数量，其中 j 满足 j != i 且 nums[j] < nums[i] 。
// 以数组形式返回答案。
// 示例 1：
// 输入：nums = [8,1,2,2,3]
// 输出：[4,0,1,1,3]
// 解释：
// 对于 nums[0]=8 存在四个比它小的数字：（1，2，2 和 3）。
// 对于 nums[1]=1 不存在比它小的数字。
// 对于 nums[2]=2 存在一个比它小的数字：（1）。
// 对于 nums[3]=2 存在一个比它小的数字：（1）。
// 对于 nums[4]=3 存在三个比它小的数字：（1，2 和 2）。
// 示例 2：
// 输入：nums = [6,5,4,8]
// 输出：[2,1,0,3]
// 示例 3：
// 输入：nums = [7,7,7,7]
// 输出：[0,0,0,0]
// 提示：
// 2 <= nums.length <= 500
// 0 <= nums[i] <= 100
const smallerNumbersThanCurrent = (nums) => {
  if (nums.length === 0) return [];
  const res = new Array(nums.length).fill(0);
  // 创建计数数组，范围是0-100；
  const count = new Array(101).fill(0); // 因为 nums[i] <= 100
  // 统计每个数字出现的次数
  for (let i = 0; i < nums.length; i++) {
    count[nums[i]]++;
  }
  // 计算前缀和，count[i]表示小于等于数字i得数字总数
  for (let i = 1; i < 101; i++) {
    count[i] += count[i - 1]; // 此时count[i]表示小于等于数字i的数字总数
  }
  for (let i = 0; i < nums.length; i++) {
    res[i] = nums[i] === 0 ? 0 : count[nums[i] - 1];
  }
  return res;
};
// 时间复杂度为 O(n + k)，其中 k 是数值范围（101）
// 空间复杂度O(1)

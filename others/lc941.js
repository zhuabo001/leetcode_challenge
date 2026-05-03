// 941. 有效的山脉数组
// 给定一个整数数组 nums，如果它是有效的山脉数组就返回 true，否则返回 false。
// 让我们回顾一下，如果 nums 满足下述条件，那么它是一个山脉数组：
// nums.length >= 3
// 在 0 < i < nums.length - 1 条件下，存在 i 使得：
// nums[0] < nums[1] < ... nums[i-1] < nums[i]
// nums[i] > nums[i+1] > ... > nums[nums.length - 1]
// 示例 1：
// 输入：nums = [2,1]
// 输出：false
// 示例 2：
// 输入：nums = [3,5,5]
// 输出：false
// 示例 3：
// 输入：nums = [0,3,2,1]
// 输出：true
// 提示：
// 3 <= nums.length <= 104
// 0 <= nums[i] <= 104
// 思路： 双指针，left， right；当两个指针重合时，说明是山脉数组，否则不是
const isMountainArr = (nums) => {
  if (nums.length < 3) return false;
  let left = 0,
    right = nums.length - 1;
  while (left < nums.length - 1 && nums[left] < nums[left + 1]) {
    left++; // 若递增，左指针右移
  }
  while (right > 0 && nums[right] < nums[right - 1]) {
    right--; // 若递减，右指针左移
  }
  if (left === right && left !== 0 && right !== nums.length - 1) {
    return true;
  }
  return false;
};
// 时间复杂度为 O(n)，空间复杂度为 O(1)

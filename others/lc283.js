// 移动零
// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
// 请注意 ，必须在不复制数组的情况下原地对数组进行操作。
// 示例 1:
// 输入: nums = [0,1,0,3,12]
// 输出: [1,3,12,0,0]
// 示例 2:
// 输入: nums = [0]
// 输出: [0]
// 提示:
// 1 <= nums.length <= 104
// -231 <= nums[i] <= 231 - 1
const moveZeros = (nums) => {
  if (nums.length === 0) return [];
  let slow = 0,
    fast = 0;
  while (fast < nums.length) {
    if (nums[fast] !== 0) {
      nums[slow] = nums[fast];
      slow++;
    }
    fsst++;
  }
  for (let i = slow; i < nums.length; i++) {
    nums[i] = 0;
  }
  return nums;
};
// 时间复杂度为 O(n)，空间复杂度为 O(1)

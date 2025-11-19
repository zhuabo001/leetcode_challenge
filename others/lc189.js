// 189. 轮转数组
// 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
// 示例 1:
// 输入: nums = [1,2,3,4,5,6,7], k = 3
// 输出: [5,6,7,1,2,3,4]
// 解释:
// 向右轮转 1 步: [7,1,2,3,4,5,6]
// 向右轮转 2 步: [6,7,1,2,3,4,5]
// 向右轮转 3 步: [5,6,7,1,2,3,4]
// 示例 2:
// 输入：nums = [-1,-100,3,99], k = 2
// 输出：[3,99,-1,-100]
// 解释:
// 向右轮转 1 步: [99,-1,-100,3]
// 向右轮转 2 步: [3,99,-1,-100]
// 提示：
// 1 <= nums.length <= 105
// -231 <= nums[i] <= 231 - 1
// 0 <= k <= 105
const rotate = (nums, k) => {
  if (nums.length === 0) return [];
  k = k % nums.length; // 轮转次数可能大于数组长度，取模操作
  reverse(nums, 0, nums.length - 1); // 先将整个数组反转
  reverse(nums, 0, k - 1); // 再将前k个元素反转
  reverse(nums, k, nums.length - 1); // 最后将后n-k个元素反转
  return nums;
};
const reverse = (arr, left, right) => {
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
};
// 时间复杂度为 O(n)，空间复杂度为 O(1)

// 轮转数组
// 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
// 示例 1:
// 输入: nums = [1,2,3,4,5,6,7], k = 3
// 输出: [5,6,7,1,2,3,4]
// 解释:
// 向右轮转 1 步: [7,1,2,3,4,5,6]
// 向右轮转 2 步: [6,7,1,2,3,4,5]
// 向右轮转 3 步: [5,6,7,1,2,3,4]

const rotateArray = (nums: number[], k: number): number[] => {
  if (!nums || nums.length === 0) return [];
  k = k % nums.length;
  reverse(nums, 0, nums.length - 1); // 先翻转全部数组
  reverse(nums, 0, k - 1); // 再反转前k个数字
  reverse(nums, k, nums.length - 1); // 最后反转后面n - k个数字
  return nums;
};

function reverse(arr: number[], left: number, right: number) {
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}

// 时间复杂度 O(n)
// 空间复杂度 O(1)

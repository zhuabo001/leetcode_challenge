// 移动0
const moveZeros = (nums: number[]): number[] => {
  if (nums.length === 0) return [];
  let fast = 0,
    slow = 0;
  while (fast < nums.length) {
    if (nums[fast] !== 0) {
      nums[slow++] = nums[fast];
    }
    fast++;
  }
  for (let i = slow; i < nums.length; i++) {
    nums[i] = 0;
  }
  return nums;
};
// 时间复杂度 O(N)
// 空间复杂度 O(1)

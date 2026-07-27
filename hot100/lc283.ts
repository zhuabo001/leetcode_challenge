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

// 双指针 快慢指针
// 移动快指针 如果快指针指向的数字不是0 然后将这个数字赋值给慢指针指向的位置
// 这个地方我其实一开始一直卡在假设第一个数字不是0
// 但是fast覆盖了slow 这要怎么办
// 反应过来 一开始大家都是0 如果第一个数字不是0 其实可以当它没做什么但是同时移动了快慢指针
const moveZerosII = (nums: number[]): number[] => {
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

// 下一个排列(找下一个字典序大的数字组合 [1, 2, 3] 下一个排列应该是 [1, 3, 2])
const nextArrange = (nums: number[]) => {
  let indexI = -1;
  // 先从后向前遍历找到第一个i+1的数字比i的数字大的，记录此时的i为indexI
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i + 1] > nums[i]) {
      indexI = i;
      break;
    }
  }
  if (indexI === -1) {
    return nums.reverse();
  }
  // 再次从后向前遍历 找到第一个比indexI对应的元素大的，与indexI交换位置
  for (let j = nums.length - 1; j >= 0; j--) {
    if (nums[j] > nums[indexI]) {
      [nums[j], nums[indexI]] = [nums[indexI], nums[j]];
      break;
    }
  }
  // 对indexI+1到数组结束的这一串数组进行升序排列(双指针反转这一部分数组)以确保“字典序最小”
  let left = indexI + 1,
    right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
  return nums;
};
// 时间复杂度 O(n)
// 空间复杂度 O(1)

const rerange = (nums: number[]) => {
  const len = nums.length;
  let indexI = -1;
  for (let i = len - 2; i >= 0; i--) {
    // 找到第一个位置，该位置后一个数字比当前这个位置的数字大，记录这个位置
    if (nums[i + 1] > nums[i]) {
      indexI = i;
      break;
    }
  }
  if (indexI === -1) {
    return nums.reverse();
  }
  // 在indexI后面的区域里找到第一个比indexI所在位置大的数字，并交换两者的位置
  for (let j = len - 1; j > indexI; j--) {
    if (nums[j] > nums[indexI]) {
      [nums[indexI], nums[j]] = [nums[j], nums[indexI]];
      break;
    }
  }

  // 将此时indexI后面的数字进行升序排列构造最小字典序
  let left = indexI + 1,
    right = len - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
  return nums;
};

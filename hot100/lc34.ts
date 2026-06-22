// 在排序数组中查找一个数字出现的第一个和最后一个的位置
const searchRange = (nums: number[], target: number) => {
  if (target < nums[0] || target > nums[nums.length - 1]) return [-1, -1];
  const getLeftBorder = (nums: number[], target: number) => {
    let left = 0,
      right = nums.length - 1,
      leftBorder = -1;
    while (left <= right) {
      let mid = left + Math.floor((right - left) / 2);
      if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1; // 这是一个不断往左压缩的过程
        if (nums[mid] === target) {
          leftBorder = mid; // 一旦找到了符合要求的下标就记录位置，一直往左，有符合的就更新左边界
        }
      }
    }
    return leftBorder;
  };
  const getRightBorder = (nums: number[], target: number) => {
    let left = 0,
      right = nums.length - 1,
      rightBorder = -1;
    while (left <= right) {
      let mid = left + Math.floor((right - left) / 2);
      if (nums[mid] > target) {
        right = mid - 1;
      } else {
        left = mid + 1; // 这是一个不断往右压缩的过程
        if (nums[mid] === target) {
          rightBorder = mid; // 一旦找到了符合要求的下标就记录位置，一直往右，有符合的就更新右边界
        }
      }
    }
    return rightBorder;
  };
  const leftBorder = getLeftBorder(nums, target);
  const rightBorder = getRightBorder(nums, target);
  if (leftBorder === -1 || rightBorder === -1) return [-1, -1];
  return [leftBorder, rightBorder];
};
// 时间复杂度 O(logn)
// 空间复杂度 O(1)

// 跑两次二分，即使找到了target也不能停，而是要继续下去，然后同步更新边界数值

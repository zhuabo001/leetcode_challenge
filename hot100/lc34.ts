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
        right = mid - 1;
        if (nums[mid] === target) {
          leftBorder = mid;
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
        left = mid + 1;
        if (nums[mid] === target) {
          rightBorder = mid;
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

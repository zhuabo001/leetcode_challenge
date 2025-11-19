// 34. 在排序数组中查找元素的第一个和最后一个位置
// 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
// 如果数组中不存在目标值 target，返回 [-1, -1]。
// 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
// 示例 1：
// 输入：nums = [5,7,7,8,8,10], target = 8
// 输出：[3,4]
// 示例 2：
// 输入：nums = [5,7,7,8,8,10], target = 6
// 输出：[-1,-1]
// 示例 3：
// 输入：nums = [], target = 0
// 输出：[-1,-1]
// 提示：
// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109
// nums 是一个非递减数组
// 核心思路：二分，分别查找目标值的左右边界
// 情况1，目标值不在数组范围内，直接返回【-1， -1】
// 情况2.target 在数组范围中，且数组中不存在target，例如数组{3,6,7},target为5，此时应该返回{-1, -1}
// 情况3，target 在数组范围中，且数组中存在target，例如数组{3,6,7},target为6，此时应该返回{1, 1}
// 采用二分法分别找左右边界
const findTargetRange = (nums, target) => {
  if (nums.length === 0) return [-1, -1];
  if (target < nums[0] || target > nums[nums.length - 1]) return [-1, -1];
  const getLeftBorder = (nums, target) => {
    let left = 0,
      right = nums.length - 1;
    let leftBorder = -1;
    while (left <= right) {
      let mid = left + Math.floor((right - left) / 2);
      if (nums[mid] >= target /**说明左边界在左半部分 */) {
        right = mid - 1; //
        leftBorder = mid;
      } else {
        left = mid + 1;
      }
    }
    return leftBorder;
  };
  const getRightBorder = (nums, target) => {
    let left = 0,
      right = nums.length - 1;
    let rightBorder = -1;
    while (left <= right) {
      let mid = left + Math.floor((right - left) / 2);
      if (nums[mid] <= target) {
        left = mid + 1;
        rightBorder = mid;
      } else {
        right = mid - 1;
      }
    }
    return rightBorder;
  };
  const leftBorder = getLeftBorder(nums, target);
  const rightBorder = getRightBorder(nums, target);
  if (leftBorder === -1 || rightBorder === -1) return [-1, -1];
  return [leftBorder, rightBorder];
};
// 时间复杂度为 O(log n)，空间复杂度为 O(1)

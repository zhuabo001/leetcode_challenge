// 最短无序连续子数组
/**
 * 给你一个整数数组 nums ，你需要找出一个 连续子数组 ，如果对这个子数组进行升序排序，那么整个数组都会变为升序排序。
 * 示例1
 * 输入：nums = [2,6,4,8,10,9,15]
 * 输出：5
 * 解释：你只需要对 [6, 4, 8, 10, 9] 进行升序排序，那么整个表都会变为升序排序。
 *
 * 示例 2：
 * 输入：nums = [1,2,3,4]
 * 输出：0
 *
 *
 *
 */

const findUnsortedSubArray = (nums: number[]): number => {
  if (nums.length === 0 || nums.length === 1) return 0;
  let leftBoundary = Infinity,
    rightBoundary = 0;
  let maxSeen: number = -Infinity,
    minSeen: number = Infinity;
  // 从左往右扫找右边界
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < maxSeen) {
      rightBoundary = i;
    }
    maxSeen = Math.max(maxSeen, nums[i]);
  }

  // 从右往左扫找左边界
  for (let j = nums.length - 1; j >= 0; j--) {
    if (nums[j] > minSeen) {
      leftBoundary = j;
    }
    minSeen = Math.min(minSeen, nums[j]);
  }

  return leftBoundary === Infinity ? 0 : rightBoundary - leftBoundary + 1;
};

// 时间复杂度: O(n)
// - 最坏遍历扫描2遍数组

// 空间复杂度: O(1)

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
  let maxSeen = -Infinity;
  const stack: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    maxSeen = Math.max(maxSeen, nums[i]);
    if (nums[i] < maxSeen) {
      //  想象[2, 2, 2] 已经有序，右边界应该一直是初始值 0，leftBoundry 保持 Infinity，最终返回 0
      rightBoundary = i; //// 待排序的子数组的右边界就是最后一次出发点disorder的索引i
    }
    if (stack.length || nums[i] >= nums[stack[stack.length - 1]]) {
      stack.push(i);
    } else {
      while (stack.length && nums[i] < nums[stack[stack.length - 1]]) {
        // todo
        const top = stack.pop() as number; // -> 弹出的索引是站错位置的元素的索引
        leftBoundary = Math.min(leftBoundary, top); // 待升序排列的子数组左边界为第一个站错位置的元素的索引(弹出的索引的最小值)
      }
    }
  }
  return leftBoundary === Infinity ? 0 : rightBoundary - leftBoundry + 1;
};

// 时间复杂度: O(n)
// - 每个元素入栈一次、出栈至多一次
// - 整体遍历只扫描一遍数组

// 空间复杂度: O(n)
// - 单调栈在最坏情况下（严格递增序列）存储 n 个索引

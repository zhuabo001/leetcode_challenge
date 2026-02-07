// 下一个排列
// 实现获取 下一个排列 的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。
// 如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）
// 必须 原地 修改，只允许使用额外常数空间
// 示例 1：
// 输入：nums = [1,2,3]
// 输出：[1,3,2]
// 示例 2:
// 输入：nums = [3,2,1]
// 输出：[1,2,3]
// 示例 3：
// 输入：nums = [1,1,5]
// 输出：[1,5,1]
// 示例 4:
// 输入：nums = [1]
// 输出：[1]
const nextLargerOrchestration = (nums) => {
  // 第一步： 找断点(从右到左 <- 由“下一个更大”决定)
  // 从右往左 遍历 找到第一个左边小于右边的位置i
  // 第二步： 找替换者 (在i右边的部分，还是从右往左，找到第一个大于 nums[i] 的数字， 位置记为j)
  // 交换两个数字
  // 第三步： 反转[i, nums.length - 1]的数字 -> 升序排列 -> “刚好大一点”
  const len = nums.length;
  let indexI = -1; // 找不到的话维持为-1
  for (let i = len - 2; i >= 0; i--) {
    if (nums[i + 1] > nums[i]) {
      indexI = i;
      break;
    }
  }
  // 如果没找到断点，说明这是个降序数组，直接反转整个数组
  if (indexI === -1) {
    return nums.reverse();
  }

  for (let j = len - 1; j > indexI; j--) {
    if (nums[j] > nums[indexI]) {
      [nums[indexI], nums[j]] = [nums[j], nums[indexI]];
      break;
    }
  }
  // indexI后面的是天然降序？所以使用双指针翻转过来就是升序
  let left = indexI + 1,
    right = len - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
  return nums;
};

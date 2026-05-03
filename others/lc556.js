// 556. 下一个更大元素 III
// 给你一个正整数 n ，请你找出符合条件的最小整数，
// 其由重新排列 n 中存在的每位数字组成，
// 并且其值大于 n 。如果不存在这样的正整数，则返回 -1 。
// 注意 ，返回的整数应当是一个 32 位整数 ，如果存在满足题意的答案，但不是 32 位整数 ，同样返回 -1 。
const nextGreaterElement = (num) => {
  const numStr = String(num);
  const numStrArr = numStr.split('');
  const len = numStrArr.length;
  // 步骤1： 从右向左找到第一个降序的位置（破坏点）
  let i = len - 2;
  while (i >= 0 && numStrArr[i] >= numStrArr[i + 1]) {
    i--;
  }
  // 如果没有找到降序的位置，说明整个数组是升序的，没有下一个排列
  if (i < 0) {
    return -1;
  }
  // 步骤2， 在破坏点右侧从右到左寻找第一个比numStrArr[i]大的元素
  let j = len - 1;
  while (j > i && numStrArr[j] <= numStrArr[i]) {
    j--;
  }
  // 步骤3: 交换破坏点和找到的元素
  [numStrArr[i], numStrArr[j]] = [numStrArr[j], numStrArr[i]];

  // 步骤4：将破坏点右侧的子数组反转(升序排列)
  let left = i + 1,
    right = len - 1;
  while (left < right) {
    [numStrArr[left], numStrArr[right]] = [numStrArr[right], numStrArr[left]];
    left++;
    right--;
  }
  // 步骤5：将数组转换为整数
  const result = parseInt(numStrArr.join(''));
  // 检查是否超过32位整数范围
  return result <= 2 ** 31 - 1 ? result : -1;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 128. 最长连续序列
// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
// 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
// 核心思路：对于 nums 中的元素 x，以 x 为起点，不断查找下一个数 x+1,x+2,⋯ 是否在 nums 中，并统计序列的长度
// 把 nums 中的数都放入一个哈希集合中，这样可以 O(1) 判断数字是否在 nums 中。
// 如果 x−1 在哈希集合中，则不以 x 为起点。为什么？因为以 x−1 为起点计算出的序列长度，一定比以 x 为起点计算出的序列长度要长！
// 这样可以避免大量重复计算。
// 比如 nums=[3,2,4,5]，从 3 开始，我们可以找到 3,4,5 这个连续序列；而从 2 开始，我们可以找到 2,3,4,5 这个连续序列，一定比从 3 开始的序列更长

const longestConsecutive = (nums) => {
  // nums.sort((a, b) => a - b);
  // 首先，本题是不能排序的，因为排序的时间复杂度是 O(nlogn)，不符合题目 O(n) 的要求
  const num_set = new Set(nums);
  let max_len = 0;
  for (const num of num_set) {
    if (num_set.has(num - 1)) {
      continue; // 如果 x−1 在哈希集合中，则不以 x 为起点，因为以x-1为起点的序列长度一定比以x为起点的序列长度要长
    }
    let currentNum = num;
    let currentLen = 1;
    while (num_set.has(currentNum + 1)) {
      currentNum++;
      currentLen++;
    }
    max_len = Math.max(max_len, currentLen);
  }
  return max_len;
};
console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));

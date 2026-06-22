// 最长连续序列
const longestConsecutive = (nums: number[]) => {
  const nums_set = new Set(nums);
  let max_len = 0;
  for (const num of nums /**这里可以换成nums_set来减少不必要的重复 */) {
    if (nums_set.has(num - 1)) {
      continue; // 原因是如果set中拥有num - 1， 那么以num - 1开头的序列长度一定比num开头的序列长度长
    }
    let currentNum = num;
    let currentLen = 1;
    while (nums_set.has(currentNum + 1)) {
      currentNum++;
      currentLen++;
    }
    max_len = Math.max(max_len, currentLen);
  }
  return max_len;
};
// 时间复杂度 O(n) 遍历数组
// 空间复杂度 O(n) set的空间

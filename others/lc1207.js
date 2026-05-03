// 独一无二的出现次数
// 给你一个整数数组 arr，请你帮忙统计数组中每个数的出现次数。
// 如果每个数的出现次数都是独一无二的，就返回 true；否则返回 false。
// 示例 1：
// 输入：arr = [1,2,2,1,1,3]
// 输出：true
// 解释：在该数组中，1 出现了 3 次，2 出现了 2 次，3 只出现了 1 次。没有两个数的出现次数相同。
// 示例 2：
// 输入：arr = [1,2]
// 输出：false
// 示例 3：
// 输入：arr = [-3,0,1,-3,1,1,1,-3,10,0]
// 输出：true
// 提示：
// 1 <= arr.length <= 1000
// -1000 <= arr[i] <= 1000

const uniqueOccurrences = (arr) => {
  if (arr.length === 0) return true; // 空数组中每个数的出现次数都是独一无二的
  // 创建计数数组，参考lc1365.js
  const count = new Array(1001).fill(0);
  // 统计每个数字出现次数
  for (let i = 0; i < arr.length; i++) {
    count[arr[i] + 1000]++; // 因为数组元素范围为 [-1000, 1000]，所以需要偏移1000，防止数组下标出现负数
  }
  // 创建一个集合，用于存储出现次数
  //   const set = new Set();
  //   for (let i = 0; i < 2001 /** 因为数组元素范围为 [-1000, 1000] */; i++) {
  //     if (count[i] !== 0) {
  //       if (set.has(count[i])) {
  //         return false;
  //       }
  //       set.add(count[i]);
  //     }
  //   }
  // 创建数组来判断是否有重复的次数
  const frequency = new Array(1001).fill(false);
  for (let i = 0; i < 2001; i++) {
    if (count[i]) {
      if (frequency[count[i]] === false) {
        frequency[count[i]] = true;
      } else {
        return false; // 出现次数重复
      }
    }
  }
  return true;
};
// 时间复杂度为 O(n)，空间复杂度为 O(n)

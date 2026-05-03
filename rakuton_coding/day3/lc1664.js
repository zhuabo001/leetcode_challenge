// 1664. 生成平衡数组的方案数
// 给你一个整数数组 nums 。你需要选择 恰好 一个下标（下标从 0 开始）并删除对应的元素。请注意剩下元素的下标可能会因为删除操作而发生改变。
// 比方说，如果 nums = [6,1,7,4,1] ，那么：
// 选择删除下标 1 ，剩下的数组为 nums = [6,7,4,1] 。
// 选择删除下标 2 ，剩下的数组为 nums = [6,1,4,1] 。
// 选择删除下标 4 ，剩下的数组为 nums = [6,1,7,4] 。
// 如果一个数组满足奇数下标元素的和与偶数下标元素的和相等，该数组就是一个 平衡数组
// 请你返回删除操作后，剩下的数组 nums 是 平衡数组 的 方案数 。
// 提示：
// 1 <= nums.length <= 1000
// 1 <= nums[i] <= 1000
const waysToMakeFair = (nums) => {
  const n = nums.length;
  let res = 0;
  // 计算奇数和偶数位置的前缀和
  const evenPrefixSum = new Array(n + 1).fill(0);
  const oddPrefixSum = new Array(n + 1).fill(0);
  // 构建前缀和数组
  for (let i = 0; i < n; i++) {
    evenPrefixSum[i + 1] = evenPrefixSum[i];
    oddPrefixSum[i + 1] = oddPrefixSum[i];
    if (i % 2 === 0) {
      // 偶数下标
      evenPrefixSum[i + 1] += nums[i];
    } else {
      oddPrefixSum[i + 1] += nums[i];
    }
  }
  for (let i = 0; i < n; i++) {
    let newEvenSUm, newOddSum;
    if (i % 2 === 0) {
      // 删除偶数位置的元素
      // 左边部分：偶数位置和不变，奇数位置和不变
      // 右边部分：原来的偶数位置变成奇数位置，原来的奇数位置变成偶数位置
      //   新偶数和 = 左边偶数和 + 右边原奇数和;
      //   新奇数和 = 左边奇数和 + 右边原偶数和;
      newEvenSUm = evenPrefixSum[i] + (oddPrefixSum[n] - oddPrefixSum[i + 1]);
      newOddSum = oddPrefixSum[i] + (evenPrefixSum[n] - evenPrefixSum[i + 1]);
    } else {
      // 删除奇数位置的元素
      // 左边部分：偶数位置和不变，奇数位置和不变
      // 右边部分：原来的偶数位置变成奇数位置，原来的奇数位置变成偶数位置
      newEvenSUm = evenPrefixSum[i] + (oddPrefixSum[n] - oddPrefixSum[i + 1]);
      newOddSum = oddPrefixSum[i] + (evenPrefixSum[n] - evenPrefixSum[i + 1]);
    }
    if (newEvenSUm === newOddSum) {
      res++;
    }
  }
  return res;
};
// 时间复杂度：O(n)，其中 n 是数组 nums 的长度。
// 空间复杂度：O(n)，其中 n 是数组 nums 的长度。

// 优美的排列
// 假设有从 1 到 n 的 n 个整数。用这些整数构造一个数组 perm（下标从 1 开始），只要满足下述条件 之一 ，
// 该数组就是一个 优美的排列 ：
// perm[i] 能够被 i 整除
// i 能够被 perm[i] 整除
// 给你一个整数 n ，返回可以构造的 优美排列 的数量。
const countBeautifulPairs = (n) => {
  let count = 0;
  const used = new Array(n + 1).fill(false); // 记录数字是否被使用
  // 回溯， 虽然没有显式地创建数组，当时我们要在概念上构造一个排列数组perm
  const backTrack = (
    position /**当前要填充的位置，可以理解是题目中说的perm数组 */
  ) => {
    // 终止条件 position > n
    if (position > n) {
      count++; // 找到一个优美的排列
      return;
    }
    for (let i = 1; i <= n; i++) {
      // i: 要放入position的数字i
      if (!used[i] && (position % i === 0 || i % position === 0)) {
        used[i] = true; // 标记数字i
        backTrack(position + 1); // 递归到下一个位置
        used[i] = false; // 回溯，撤销标记
      }
    }
  };
  backTrack(1); // 从位置1开始构造排列
  return count;
};
// 时间复杂度：O(n! /**最坏的情况 */)
// 空间复杂度：O(n)

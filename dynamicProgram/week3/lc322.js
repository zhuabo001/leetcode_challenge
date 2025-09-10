// 322. 零钱兑换
// 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
// 你可以认为每种硬币的数量是无限的。
// 示例 1：
// 输入：coins = [1, 2, 5], amount = 11
// 输出：3
// 解释：11 = 5 + 5 + 1
// 示例 2：
// 输入：coins = [2], amount = 3
// 输出：-1
// 示例 3：
// 输入：coins = [1], amount = 0
// 输出：0
// 示例 4：
// 输入：coins = [1], amount = 1
// 输出：1
// 示例 5：
// 输入：coins = [1], amount = 2
// 输出：2
const coinChange = (coins, amount) => {
  // 确定dp[i] 凑成金额i的最少硬币数量
  // 状态转移方程 dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
  // 凑足总额为i - coins[j]的最少个数为dp[i - coins[j]]，那么只需要加上一个钱币coins[j]即dp[i - coins[j]] + 1就是dp[i]（考虑coins[i]）
  // 初始化dp数组：考虑到递推公式的特性，dp[i]必须初始化为一个最大的数，否则就会在min(dp[i - coins[j]] + 1, dp[i])比较的过程中被初始值覆盖
  // 确定遍历顺序
  // 举例推导dp数组
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // 凑成金额0的最少硬币数量为0
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (i >= coins[j]) {
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};
// 时间复杂度O(amount * coins.length)
// 空间复杂度O(amount)

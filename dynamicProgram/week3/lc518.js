// 518. 零钱兑换 II
// 给定不同面额的硬币和一个总金额。写出函数来计算可以凑成总金额的硬币组合数。假设每一种面额的硬币有无限个。
// 示例 1:
// 输入: amount = 5, coins = [1, 2, 5]
// 输出: 4
// 解释: 有四种方式可以凑成总金额:
// 5=5
// 5=2+2+1
// 5=2+1+1+1
// 5=1+1+1+1+1
// 示例 2:
// 输入: amount = 3, coins = [2]
// 输出: 0
// 解释: 只用面额2的硬币不能凑成总金额3。
// 示例 3:
// 输入: amount = 10, coins = [10]
// 输出: 1
// 说明:
// 你可以假设：
// 0 <= amount (总金额) <= 5000
// 1 <= coin (硬币面额) <= 5000
// 硬币种类不超过 500 种
// 结果符合 32 位符号整数
// 和纯完全背包还不一样：
// 1. 纯完全背包是求最大价值，而这道题是求组合数
// 2. 纯完全背包是求组合数，而这道题是求排列数，例如 5 = 2 + 1 + 2； 5 = 2 + 2 + 1，这两个其实是一种组合，组合并不是排列，不在乎顺序
const change = (amount, coins) => {
  const dp = new Array(coins.length + 1)
    .fill(0)
    .map(() => new Array(amount + 1).fill(0));
  // 1. dp[i][j] 表示用前i个硬币凑成金额j的组合数
  // 2. 推导状态方程 dp[i][j] = dp[i][j - coins[i]] + dp[i - 1][j]， 其中dp[i][j - coins[i]]表示用前i个硬币凑成金额j - coins[i]的组合数，dp[i - 1][j]表示用前i - 1个硬币凑成金额j的组合数
  // 3. 初始化数组
  for (let i = 0; i < coins.length; i++) {
    dp[i][0] = 1; // 用前i个硬币凑成金额0的组合数只有1种，就是不选任何硬币
  }
  for (let j = 0; j <= amount; j++) {
    // 如果j可以整除coins[0], 那么就有一种组合，就是用j个coins[0]
    if (j % coins[0] === 0) {
      dp[0][j] = 1;
    }
  }
  // 4. 确定遍历顺序 先遍历物品，再遍历背包
  // 5. 举例推导dp数组
  for (let i = 1; i < coins.length; i++) {
    for (let j = 0; j <= amount; j++) {
      if (j < coins[i]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i]];
      }
    }
  }
  return dp[coins.length - 1][amount];
};
// 时间复杂度O(amount * coins.length)
// 空间复杂度O(amount * coins.length)
// 优化空间复杂度
const change1 = (amount, coins) => {
  // 1. dp[j]: 凑成金额j的组合数
  // 2. 推导状态方程 dp[j] += dp[j - coins[i]];
  // 3. 初始化dp数组，dp[0] = 1，因为凑成金额0的组合数只有1种，就是不选任何硬币
  // 4. 确定遍历顺序
  // 5. 举例推导dp数组
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1; // 凑成金额0的组合数只有1种，就是不选任何硬币
  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      dp[j] += dp[j - coins[i]];
    }
  }
  return dp[amount];
};
// 时间复杂度O(amount * coins.length)
// 空间复杂度O(amount)

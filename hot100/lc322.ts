// 零钱兑换 给一组硬币面额和一个目标值 问 凑出目标值的最少硬币个数是多少，假设每个面额的硬币数量无限
// dp[i] 凑满i的最少硬币个数
const coinChange = (coins: number[], amount: number) => {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (i >= coins[j]) {
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};

// 时间复杂度 O(amount x coins.length)
// 空间复杂度 O(n)

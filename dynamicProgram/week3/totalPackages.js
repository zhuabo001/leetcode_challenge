// 完全背包
// 有一个容量为N的背包，要用这个背包装下物品的价值最大，这些物品有两个属性：体积w和价值v。
// 定义一个二维数组dp，其中dp[i][j]表示前i件物品体积不超过j的情况下能达到的最大价值。
// 对于第i件物品，有两种情况：
// - 不选择第i件物品，dp[i][j] = dp[i-1][j]
// - 选择第i件物品，dp[i][j] = dp[i][j-w] + v， 这里可以看到和01背包的区别，01背包是每件物品只能选择一次，所以是dp[i-1][j-w]，而完全背包是每件物品可以选择多次，所以是dp[i][j-w]
// 所以，状态转移方程为：
// dp[i][j] = max(dp[i-1][j], dp[i][j-w] + v)
// 时间复杂度: O(n * m)
// 空间复杂度: O(n * m)
const totalPackages = (weights, values, bagSize) => {
  const dp = new Array(weights.length + 1)
    .fill(0)
    .map(() => new Array(bagSize + 1).fill(0));
  // 1. 确定dp[i][j]的含义： 前i件物品体积不超过j的情况下能达到的最大价值
  // 2. 确定状态转移方程： dp[i][j] = max(dp[i-1][j], dp[i][j-w] + v)
  // 3. 初始化dp数组
  for (let i = 0; i < weights.length; i++) {
    dp[i][0] = 0;
  }
  for (let j = weights[0]; j <= bagSize; j++) {
    dp[0][j] = dp[0][j - weights[0]] + values[0]; // 当背包容量j小于物品体积weights[0]时，自然是什么都装不了的
  }
  // 4. 确定遍历顺序
  // 先遍历物品在遍历背包容量
  for (let i = 1; i < weights.length; i++) {
    for (j = 0; j <= bagSize; j++) {
      if (j < weights[i]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - weights[i]] + values[i]);
      }
    }
  }
  return dp[weights.length - 1][bagSize];
  // 5. 举例推导dp数组
};

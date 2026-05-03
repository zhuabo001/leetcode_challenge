// 188. 买卖股票的最佳时机 IV
// 给定一个整数数组 prices ，它的第 i 个元素 prices[i] 是一支给定的股票在第 i 天的价格。
// 设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
//
// 示例 1：
// 输入：k = 2, prices = [2,4,1]
// 输出：2
// 解释：在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
// 和lc123最大的不同就是lc123是最多可以完成两笔交易，而lc188是最多可以完成k笔交易，
// 从lc123的状态转移方程可以发现dp[i][奇数]就是买入，dp[i][偶数]就是卖出
const maxProfit = (prices, k) => {
  if (!prices || prices.length === 0) return 0;
  const len = prices.length;
  const dp = new Array(len).fill(0).map(() => new Array(2 * k + 1).fill(0));
  // 初始化
  for (let j = 1; j <= 2 * k; j += 2) {
    dp[0][j] = -prices[0];
  }
  for (let i = 1; i < len; i++) {
    for (let j = 1; j < 2 * k + 1; j += 2) {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - 1] - prices[i]);
      dp[i][j + 1] = Math.max(dp[i - 1][j + 1], dp[i - 1][j] + prices[i]);
    }
  }
  return dp[len - 1][2 * k];
};
// 时间复杂度：O(nk)
// 空间复杂度：O(nk)

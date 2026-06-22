// 买卖股票的最佳时机i
const maxProfit = (prices: number[]) => {
  if (!prices || prices.length === 0) return 0;
  // dp[i][0] 第i天持有该股票时产生的最大利润，dp[i][1] 第i天不持有该股票时产生的最大利润
  const dp = new Array(prices.length)
    .fill(null)
    .map(() => new Array(2).fill(0));
  dp[0][0] = -prices[0];
  dp[0][1] = 0;
  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(
      dp[i - 1][0] /**昨天就持有 */,
      -prices[i] /**昨天不持有今天第一次买入 */
    );
    dp[i][1] = Math.max(
      dp[i - 1][1] /**前一天不持有该股票产生的收益 */,
      dp[i - 1][0] + prices[i] /**前一天持有今天卖出 */
    );
  }
  return Math.max(dp[prices.length - 1][0], dp[prices.length - 1][1]);
};
// 时间复杂度 O(N)
// 空间复杂度 O(N)

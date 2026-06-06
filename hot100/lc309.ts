// 买卖股票的最佳时机 —— 包含冷冻期, 卖出后有一天时间不可以再买入
const maxProfits = (prices: number[]) => {
  const dp = new Array(prices.length).fill(0).map(() => new Array(4).fill(0));
  dp[0][0] = -prices[0]; // 当天持有股票(可能是当天买入可能是先前持有)
  dp[0][1] = 0; // 当天不持有股票且已经度过了冷冻期
  dp[0][2] = 0; // 当天卖出股票
  dp[0][3] = 0; // 处于冷冻期当天
  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(
      dp[i - 1][0],
      dp[i - 1][3] - prices[i] /**冷冻期后一天买入*/,
      dp[i - 1][1] -
        prices[
          i
        ] /**表示第 i-1 天你不持有股票，而且也没有冷冻期限制（就是普通的空仓状态） */
    );
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][3]);
    dp[i][2] = dp[i - 1][0] + prices[i];
    dp[i][3] = dp[i - 1][2]; // 前一天卖了，当天的状态只能和前一天一样
  }
  return Math.max(
    dp[prices.length - 1][0],
    dp[prices.length - 1][1],
    dp[prices.length - 1][2],
    dp[prices.length - 1][3]
  );
};
// 时间复杂度 O(n)
// 空间复杂度 O(n)

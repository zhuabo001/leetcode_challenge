// 1049. 最后一块石头的重量 II
// 有一堆石头，每块石头的重量都是正整数。
// 每一回合，从中选出任意两块石头，然后将它们一起粉碎。假设石头的重量分别为 x 和 y，且 x <= y。那么粉碎的可能结果如下：
// 如果 x == y，那么两块石头都会被完全粉碎；
// 如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。
// 最后，最多只会剩下一块石头。返回此石头最小的可能重量。如果没有石头剩下，就返回 0。
// 本题和lc416差不多，本质是尽可能将数组分为两个和相等的子集
const lastStoneWeightII = (nums) => {
  const sum = nums.reduce((pre, cur) => pre + cur, 0);
  const target = Math.floor(sum / 2);
  // 每个石头都有自己的重量，是否可以 装满 最大重量为 sum / 2的背包
  // 上面说了和lc416很像，但是lc416是求是否可以装满背包，本题是求背包最多可以装多少重量
  // 1.确定dp[j]的含义：容量为j的背包，最多可以装dp[j]的重量（因为stones[i]的重量就是本身的价值， 所以dp[j]也是可以装的最大价值）
  // 2. 状态递推公式： dp[j] = Math.max(dp[j], dp[j - stones[i]] + stones[i]);
  // 3. 初始化dp数组 dp[0] = 0;
  // 4. 确定dp数组遍历顺序：先遍历物品，再遍历背包
  // 5. 举例推导dp数组
  const dp = new Array(target + 1).fill(0);
  dp[0] = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = target; j >= nums[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i]);
    }
  }
  // 最后判断dp[target]是否等于target，等于target说明背包被装满了，返回0，否则返回sum - 2 * dp[target]
  return sum - dp[target] - dp[target];
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(n)

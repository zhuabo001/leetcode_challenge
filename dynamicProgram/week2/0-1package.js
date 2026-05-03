// 0-1背包问题
// 有n件物品和一个最多能背重量为w 的背包。第i件物品的重量是weight[i]，得到的价值是value[i] 。每件物品只能用一次，求解将哪些物品装入背包里物品价值总和最大。
// dp[i][j] 表示， 从[0 - i]的物品中任意取物品装进容量为j的背包里，最大价值是多少；i表示物品编号，j表示背包容量
// 现在有物品0，1，2，体积分别为1， 3， 4，价值分别为15，20，30，背包体积为4；
// 这里我们取dp[1][4]为例，
// 1. 我们可以不选物品1，直选物品0， 那么dp[1][4] = dp[0][4] = 15；
// 2. 我们可以选物品1，那么体积利用了3， 背包总容量为4， 此时体积还剩1，我们只能选物品0放入，背包体积为1时的最大价值方案
// 为dp[0][1] = 15, 那么dp[1][4] = max(dp[0][4], dp[0][4 - 3] + value[1]);
// 那么用i 、j、 weight[i]、value[i]抽象出来：
// dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
// 这里的dp[i - 1][j] 表示不选物品i，那么背包容量为j时的最大价值方案，
// dp[i - 1][j - weight[i]] + value[i] 表示选物品i，那么背包容量为j时的最大价值方案，
// 我们取这两种方案的最大值，就是dp[i][j]的最大值；
const package01 = (weight, value, bagWeight) => {
  // 确定dp数组的含义： dp[i][j] 表示从编号0-i的物品中任选物品装进容量为j的背包里价值最大为多少
  // 确定状态推导公式： dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
  // 初始化dp数组： 首先要明白dp[i][0]时，背包容量为0时，最大价值为0，所以dp[i][0] = 0;当i=0时也就是只放物品0时，如果j< weight[0]， 那么价值还是0；当j >= weight[0]时，价值就是value[0]
  // 确定遍历顺序: 先遍历物品（外层），再遍历背包容量（内层）
  // 举例推导dp数组变化
  const dp = new Array(weight.length)
    .fill(0)
    .map(() => new Array(bagWeight + 1).fill(0));
  for (let i = 0; i < weight.length; i++) {
    dp[i][0] = 0;
  }
  for (let j = weight[0]; j <= bagWeight; j++) {
    dp[0][j] = value[0];
  }
  for (let i = 0; i < weight.length; i++) {
    for (let j = 0; j <= bagWeight; j++) {
      if (j < weight[i]) {
        // 背包容量j小于物品i的重量，那么物品i不能放入背包
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
      }
    }
  }
  return dp[weight.length - 1][bagWeight];
};
// 空间优化： 因为dp[i][j] 只和dp[i - 1][j] 以及 dp[i - 1][j - weight[i]] 有关，所以我们可以只使用一个一维数组来表示dp[i][j]
// 我们可以从后往前遍历背包容量，因为dp[i][j] 只和dp[i - 1][j] 以及 dp[i - 1][j - weight[i]] 有关，所以我们可以从后往前遍历背包容量，这样dp[j] 就表示从编号0-i的物品中任选物品装进容量为j的背包里价值最大为多少
const package01_1 = (weight, value, bagWeight) => {
  // 确定dp数组的含义： dp[j] 表示从编号0-i的物品中任选物品装进容量为j的背包里价值最大为多少
  // 确定状态推导公式： dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
  // 初始化dp数组： dp[0] = 0; 剩余的dp[j]都初始化为0；
  // 确定遍历顺序，详情请看结尾总结
  // 举例推导dp数组
  const dp = new Array(bagWeight + 1).fill(0);
  dp[0] = 0;
  for (let i = 0; i < weight.length; i++) {
    for (
      let j = bagWeight;
      j >=
      weight[
        i
      ] /**倒序遍历是为了保证物品i只被放入一次，因为如果是正序遍历，那么物品i就会被放入多次 */;
      j--
    ) {
      dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
    }
  }
  return dp[bagWeight];
};
// 关于滚动数组中遍历顺序问题：
// 假设我们正序遍历：
// 我们先遍历物品0，那么背包容量为0时，最大价值为0，所以dp[0] = 0;
// dp[1] = dp[1 - weight[0]] + value[0] = 15
// dp[2] = dp[2 - weight[0]] + value[0] = 30 可以发现dp[2] 被更新了两次，这是因为我们正序遍历，物品0被放入了两次，不符合题意
// 所以我们倒序遍历：
// 我们先遍历物品0，那么背包容量为0时，最大价值为0，所以dp[0] = 0;
// dp[2] = dp[2 - weight[0]] + value[0] = 15 （dp数组已经都初始化为0）
// dp[1] = dp[1 - weight[0]] + value[0] = 15
// 后续dp[2]会在i进行下一次遍历的时候进行更新；

// 爬楼梯
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢
const upStairs = (n: number): number => {
  if (n <= 2) return n;
  const dp = new Array(n + 1).fill(0); // 抵达台阶i共有dp[i]种方法
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};
// 时间复杂度 O(n)
// 空间复杂度 O(n)

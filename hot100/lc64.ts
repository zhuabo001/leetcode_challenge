// 最小路径和
// 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小

const minPathSum = (nums: number[][]): number => {
  const m = nums.length,
    n = nums[0].length;
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
  dp[0][0] = nums[0][0];
  for (let i = 1; i < m; i++) {
    dp[i][0] = nums[i][0] + dp[i - 1][0];
  }
  for (let j = 1; j < n; j++) {
    dp[0][j] = nums[0][j] + dp[0][j - 1];
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = nums[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m - 1][n - 1];
};

// 时间复杂度: O(m×n)
// - 双层循环遍历 m×n 个格子各一次

// 空间复杂度: O(m×n)
// - dp 二维数组存储每个格子的最小路径和

// 题目分析:
// 本题求从左上角到右下角的最小路径和，每步只能向右或向下。
// 典型 DP 问题，定义 dp[i][j] 为到达 (i,j) 的最小路径和。
// 状态转移: dp[i][j] = grid[i][j] + Math.min(dp[i-1][j], dp[i][j-1])
// 边界:
//   - dp[0][0] = grid[0][0]
//   - 第一行只能从左边来: dp[0][j] = dp[0][j-1] + grid[0][j]
//   - 第一列只能从上面来: dp[i][0] = dp[i-1][0] + grid[i][0]

// 695. 岛屿的最大面积
// 给你一个大小为 m x n 的二进制矩阵 grid 。
// 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。
// 你可以假设 grid 的四个边缘都被 0（代表水）包围着。
// 岛屿的面积是岛上值为 1 的单元格的数目。
// 计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0

const maxAreaOfIsland = function (grid) {
  if (!grid || grid.length === 0) return 0;
  const m = grid.length,
    n = grid[0].length;
  let maxArea = 0;
  // 遍历网格中的每个单元格
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        maxArea = Math.max(maxArea, dfs(grid, i, j));
      }
    }
  }
  return maxArea;
};
const dfs = function (grid, i, j) {
  // 检查当前单元格是否越界或为0
  if (
    i < 0 ||
    i >= grid.length ||
    j < 0 ||
    j >= grid[0].length ||
    grid[i][j] === 0
  ) {
    return 0;
  }
  grid[i][j] = 0; // 标记为已访问
  // 递归访问当前单元格的上、下、左、右四个方向
  return (
    1 + // 当前单元格的面积
    dfs(grid, i + 1, j) + // 下
    dfs(grid, i - 1, j) + // 上
    dfs(grid, i, j + 1) + // 右
    dfs(grid, i, j - 1) // 左
  );
};
// 时间复杂度：O(mn)，其中 m 和 n 分别是网格的行数和列数。每个单元格最多被访问一次。
// 空间复杂度：O(mn)，在最坏情况下，网格全为 1，递归调用的深度会达到 mn。

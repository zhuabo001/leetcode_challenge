// 695. 岛屿的最大面积
// 给你一个大小为 m x n 的二进制矩阵 grid 。
// 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。
// 岛屿的面积是岛上值为 1 的单元格的数目。
// 计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。
// 示例 1：
// 输入：grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
// 输出：6
// 解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。
// 示例 2：
// 输入：grid = [[0,0,0,0,0,0,0,0]]
// 输出：0

const maxAreaOfIsland_DFS = (grid) => {
  const m = grid.length,
    n = grid[0].length;
  let count;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const visited = new Array(m).fill().map(() => new Array(n).fill(false));

  const dfs = (grid, visited, x, y) => {
    if (visited[x][y] || grid[x][y] === 0) return;
    visited[x][y] = true;
    count++;
    for (let i = 0; i < 4; i++) {
      let newX = x + directions[i][0];
      let newY = y + directions[i][1];
      if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue;
      dfs(grid, visited, newX, newY);
    }
  };

  let maxArea = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && grid[i][j] === 1) {
        // 来到新的岛屿， 重置count，重新计算当前的岛屿面积
        count = 0;
        dfs(grid, visited, i, j);
        maxArea = Math.max(maxArea, count);
      }
    }
  }
  return maxArea;
};
// dfs时间复杂度：O(m * n)，每个节点最多访问一次
// dfs空间复杂度：O(m * n)，visited 数组 + 递归栈最坏为 O(m * n)

/**
 * 沉没孤岛 (Sinking Islands)
 * 题目描述:
 * 给定一个由 1（陆地）和 0（水）组成的矩阵，岛屿是由水平或垂直相邻的陆地单元格组成的区域，
 * 完全被水包围。孤岛是位于矩阵内部的岛屿——它的任何单元格都不接触边缘。
 * 任务是将所有孤岛"沉没"，即将这些岛屿中的所有陆地单元格（1）转换为水单元格（0）。
 *
 * 输入格式:
 * 第一行包含两个整数 N 和 M，表示矩阵的行数和列数。
 * 接下来的 N 行每行包含 M 个数字（1 或 0），表示岛屿单元格。
 *
 * 输出格式:
 * 输出沉没孤岛后的矩阵。注意：每个元素后面应该跟一个空格。
 *
 * 示例输入:
 * 4 5
 * 1 1 0 0 0
 * 1 1 0 0 0
 * 0 0 1 0 0
 * 0 0 0 1 1
 *
 * 示例输出:
 * 1 1 0 0 0
 * 1 1 0 0 0
 * 0 0 0 0 0
 * 0 0 0 1 1
 *
 * 约束:
 * 1 ≤ M, N ≤ 50
 *
 * 解题思路:
 * 这是一道经典的"填充"（Flood Fill）算法练习题。
 * 典型方法是先识别所有与矩阵边缘相连的陆地块，将它们标记为保留，
 * 然后将任何未标记的陆地转换为水。
 */

const sinkIslands = (grid) => {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const m = grid.length,
    n = grid[0].length;
  const dfs = (grid, x, y) => {
    if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] === 0) return;
    grid[x][y] = -1; // 为了后续方便复原
    for (let i = 0; i < 4; i++) {
      let newX = x + directions[i][0];
      let newY = y + directions[i][1];
      dfs(grid, newX, newY);
    }
  };

  for (let i = 0; i < m; i++) {
    if (grid[i][0] === 1) dfs(grid, i, 0);
    if (grid[i][n - 1] === 1) dfs(grid, i, n - 1);
  }

  for (let i = 0; i < n; i++) {
    if (grid[0][i] === 1) dfs(grid, 0, i);
    if (grid[m - 1][i] === 1) dfs(grid, m - 1, i);
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        grid[i][j] = 0;
      } else if (grid[i][j] === -1) {
        grid[i][j] = 1; // 复原原先为了找到孤岛而被沉没的边缘岛屿
      }
    }
  }

  return grid;
};

// 时间复杂度 O(m × n)每个格子最多被访问常数次
// 空间复杂度 O(m × n) 递归栈的最坏情况(全是陆地时)

/*
 * LeetCode 200. 岛屿数量
 *
 * 题目描述：
 * 给你一个由 '1'（陆地）和 '0'（水）组成的二维网格 grid，请你计算网格中岛屿的数量。
 *
 * 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
 * 你可以假设网格的四条边均被水包围。
 *
 * 示例 1：
 * 输入：
 * grid = [
 *   ['1','1','1','1','0'],
 *   ['1','1','0','1','0'],
 *   ['1','1','0','0','0'],
 *   ['0','0','0','0','0']
 * ]
 * 输出：1
 *
 * 示例 2：
 * 输入：
 * grid = [
 *   ['1','1','0','0','0'],
 *   ['1','1','0','0','0'],
 *   ['0','0','1','0','0'],
 *   ['0','0','0','1','1']
 * ]
 * 输出：3
 *
 * 提示：
 * 1 <= m, n <= 300
 * grid[i][j] 的值为 '0' 或 '1'
 *
 * 说明：
 * 本文件仅记录题目描述与示例，不包含题解实现。
 */

const islandsNumberWithDfs = (grid) => {
  const directories = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const m = grid.length,
    n = grid[0].length;
  const visited = new Array(m).fill().map(() => new Array(n).fill(false));
  const dfs = (grid, visited, x, y) => {
    if (visited[x][y] || grid[x][y] === '0') return; // 终止条件，节点已经访问过或者遍历到海水的位置
    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
      let nextX = x + directories[i][0];
      let nextY = y + directories[i][1];
      if (nextX < 0 || nextX >= m || nextY < 0 || nextY >= n) continue; // 越界了直接跳过
      dfs(grid, visited, nextX, nextY);
    }
  };
  let count = 0; // 用来计算岛屿数量
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && grid[i][j] === '1') {
        // 遇到未访问的陆地 计数+1
        count++;
        dfs(grid, visited, i, j); // 从当前点进行dfs，把相邻的陆地全部标记为已访问(深搜的主要目的就是标记已访问)
      }
    }
  }
  return count;
};
// dfs时间复杂度：O(m * n)，每个节点最多访问一次
// dfs空间复杂度：O(m * n)，visited 数组 + 递归栈最坏为 O(m * n)

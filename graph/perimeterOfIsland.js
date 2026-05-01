/**
 * 106. 海岸线计算 (岛屿的周长)
 *
 * 题目描述：
 *   给定一个由 1（陆地）和 0（水）组成的矩阵，岛屿是被水包围，
 *   并且通过水平方向或垂直方向上相邻的陆地连接而成的。
 *   你可以假设矩阵外均被水包围。在矩阵中恰好拥有一个岛屿，
 *   假设组成岛屿的陆地边长都为 1，请计算海岸线，即：岛屿的周长。
 *   岛屿内部没有水域。
 *
 * 输入描述：
 *   第一行包含两个整数 N, M，表示矩阵的行数和列数。
 *   之后 N 行，每行包含 M 个数字，数字为 1 或者 0，表示岛屿的单元格。
 *
 * 输出描述：
 *   输出一个整数，表示岛屿的周长。
 *
 * 输入示例：
 *   5 5
 *   0 0 0 0 0
 *   0 1 0 1 0
 *   0 1 1 1 0
 *   0 1 1 1 0
 *   0 0 0 0 0
 *
 * 输出示例：
 *   14
 *
 * 提示信息：
 *   数据范围：1 <= M, N <= 50
 *
 * 解题思路：
 *   遍历每个陆地单元格，对于每个陆地，检查其四个方向（上、下、左、右），
 *   如果该方向是水域或超出矩阵边界，则这条边算作海岸线的一部分（周长 +1）。
 */

const perimeterOfIsland = (grids) => {
  const m = grids.length,
    n = grids[0].length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];
  let perimeter = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grids[i][j] === 1) {
        for (const [dx, dy] of directions) {
          let newX = i + dx,
            newY = j + dy;
          if (
            newX < 0 ||
            newX >= m ||
            newY < 0 ||
            newY >= n ||
            grids[newX][newY] === 0
          ) {
            perimeter++;
          }
        }
      }
    }
  }
  return perimeter;
};

// 时间复杂度 O(m * n)
// 空间复杂度 O(1)

const perimeterOfIslandWithDFS = (grid) => {
  const m = grid.length,
    n = grid[0].length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];
  const visited = new Array(m).fill().map(() => new Array(n).fill(false));
  let perimeter = 0;
  const dfs = (x, y) => {
    if (visited[x][y] || grid[x][y] === 0) return;
    visited[x][y] = true;
    for (const [dx, dy] of directions) {
      let newX = x + dx,
        newY = y + dy;
      if (
        newX < 0 ||
        newX >= m ||
        newY < 0 ||
        newY >= n ||
        grid[newX][newY] === 0
      ) {
        perimeter++;
      } else if (!visited[newX][newY]) {
        dfs(newX, newY);
      }
    }
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] && !visited[i][j]) {
        dfs(i, j);
      }
    }
  }
  return perimeter;
};

// 417. 太平洋大西洋
// https://leetcode.cn/problems/pacific-atlantic-water-flow/
// 1. 深度优先搜索
// 2. 广度优先搜索

const pacificAtlantic = function (grids) {
  const m = grids.length,
    n = grids[0].length;
  const directions = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ];
  // 初始化两个访问矩阵，分别表示从两种边界是否能逆向流动到(i，j)
  const pacific = new Array(m).fill(0).map(() => new Array(n).fill(false));
  const atlantic = new Array(m).fill(0).map(() => new Array(n).fill(false));

  const dfs = (x, y, visited) => {
    if (visited[x][y]) {
      // 已访问过，直接返回
      return;
    }
    visited[x][y] = true;
    for (const [dx, dy] of directions) {
      let newX = x + dx,
        newY = y + dy;
      if (
        newX < 0 ||
        newX >= m ||
        newY < 0 ||
        newY >= n ||
        grids[newX][newY] < grids[x][y]
      ) {
        continue;
      }
      dfs(newX, newY, visited);
    }
  };

  // 从太平洋边界开始搜索 第一列和第一行
  // 第一列开始
  for (let i = 0; i < m; i++) {
    dfs(i, 0, pacific);
  }
  // 第一行开始
  for (let j = 0; j < n; j++) {
    dfs(0, j, pacific);
  }
  // 从大西洋边界开始搜索，最后一列和最后一行
  // 最后一列开始
  for (let i = m - 1; i >= 0; i--) {
    dfs(i, n - 1, atlantic);
  }
  // 最后一行开始
  for (let j = n - 1; j >= 0; j--) {
    dfs(m - 1, j, atlantic);
  }
  // 初始化结果数组
  const res = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacific[i][j] && atlantic[i][j]) {
        res.push([i, j]);
      }
    }
  }
  return res;
};

// 时间复杂度: O(m * n)，其中 m 和 n 分别是矩阵的行数和列数。在最坏情况下，每个单元格最多被太平洋和大西洋的 DFS 各访问一次。
// 空间复杂度: O(m * n)，主要包括两个大小为 m * n 的访问矩阵 pacific 和 atlantic，以及 DFS 递归调用栈的最大深度（最坏情况下为 m * n）。

const pacificAtlanticWithBFS = function (grids) {
  const m = grids.length,
    n = grids[0].length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const pacific = new Array(m).fill().map(() => new Array(n).fill(false));
  const atlantic = new Array(m).fill().map(() => new Array(n).fill(false));

  const bfs = (x, y, visited) => {
    const queue = [[x, y]];
    visited[x][y] = true;
    while (queue.length) {
      const [curX, curY] = queue.shift();
      for (const [dx, dy] of directions) {
        let newX = curX + dx,
          newY = curY + dy;
        if (
          newX < 0 ||
          newX >= m ||
          newY < 0 ||
          newY >= n ||
          grids[newX][newY] < grids[curX][curY]
        ) {
          continue;
        }
        if (!visited[newX][newY]) {
          queue.push([newX, newY]);
          visited[newX][newY] = true;
        }
      }
    }
  };

  for (let i = 0; i < m; i++) {
    bfs(i, 0, pacific);
    bfs(i, n - 1, atlantic);
  }

  for (let j = 0; j < n; j++) {
    bfs(0, j, pacific);
    bfs(m - 1, j, atlantic);
  }

  const res = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacific[i][j] && atlantic[i][j]) {
        res.push([i, j]);
      }
    }
  }
  return res;
};

// 时间复杂度 O(n * m)
// 空间复杂度 O(n * m)

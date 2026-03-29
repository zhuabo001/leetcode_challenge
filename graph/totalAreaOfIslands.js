// 101. 孤岛的总面积 (卡码网)
// 题目链接: https://kamacoder.com/problempage.php?pid=1173
// 题目描述：给定一个由 1（陆地）和 0（水）组成的矩阵，岛屿指的是由水平或垂直方向上相邻的陆地单元格组成的区域。
// 孤岛是那些位于矩阵内部、所有单元格都不接触边缘的岛屿。计算所有孤岛的总面积。
// 示例：
// 输入：
// 4 5
// 1 1 0 0 0
// 1 1 0 0 0
// 0 0 1 0 0
// 0 0 0 1 1
// 输出：1
// 解释：中心位置(2,2)的1是孤岛，不接触边界，面积为1。其他岛屿都接触边界，不算孤岛。

const totalAreaOfIslandsWithDfs = (grid) => {
  const m = grid.length,
    n = grid[0].length;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // DFS：将当前陆地及相邻陆地置为0（变成海洋）
  const dfs = (grid, x, y) => {
    // 越界或已经是海洋，直接返回
    if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] === 0) return;
    // 将当前陆地变成海洋
    grid[x][y] = 0;
    // 向四个方向继续沉没相邻陆地
    for (let i = 0; i < 4; i++) {
      const newX = x + directions[i][0];
      const newY = y + directions[i][1];
      dfs(grid, newX, newY);
    }
  };

  // 步骤1：遍历四条边，将所有与边界相连的陆地及其相邻陆地都变成海洋（沉没非孤岛）
  // 遍历左右两条边
  for (let i = 0; i < m; i++) {
    if (grid[i][0] === 1) dfs(grid, i, 0); // 左边界
    if (grid[i][n - 1] === 1) dfs(grid, i, n - 1); // 右边界
  }
  // 遍历上下两条边
  for (let j = 0; j < n; j++) {
    if (grid[0][j] === 1) dfs(grid, 0, j); // 上边界
    if (grid[m - 1][j] === 1) dfs(grid, m - 1, j); // 下边界
  }

  // 步骤2：遍历整个地图，统计剩余陆地的总面积（这些就是孤岛）
  let totalArea = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        totalArea++;
      }
    }
  }

  return totalArea;
};
// 时间复杂度：O(m * n)，每个节点最多访问两次（一次在边界处理，一次在统计面积）
// 空间复杂度：O(m * n)，递归栈最坏情况为 O(m * n)

const totalAreaOfIslandsWithBfs = (grid) => {
  const m = grid.length,
    n = grid[0].length;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // BFS：将当前陆地及相邻陆地置为0（变成海洋）
  const bfs = (grid, x, y) => {
    const queue = [[x, y]];
    grid[x][y] = 0; // 将起始点变成海洋

    while (queue.length > 0) {
      const [curX, curY] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const newX = curX + directions[i][0];
        const newY = curY + directions[i][1];
        // 越界或已经是海洋，跳过
        if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue;
        if (grid[newX][newY] === 0) continue;
        // 将相邻陆地变成海洋并入队
        grid[newX][newY] = 0;
        queue.push([newX, newY]);
      }
    }
  };

  // 步骤1：遍历四条边，将所有与边界相连的陆地及其相邻陆地都变成海洋（沉没非孤岛）
  // 遍历左右两条边
  for (let i = 0; i < m; i++) {
    if (grid[i][0] === 1) bfs(grid, i, 0); // 左边界
    if (grid[i][n - 1] === 1) bfs(grid, i, n - 1); // 右边界
  }
  // 遍历上下两条边
  for (let j = 0; j < n; j++) {
    if (grid[0][j] === 1) bfs(grid, 0, j); // 上边界
    if (grid[m - 1][j] === 1) bfs(grid, m - 1, j); // 下边界
  }

  // 步骤2：遍历整个地图，统计剩余陆地的总面积（这些就是孤岛）
  let totalArea = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        totalArea++;
      }
    }
  }

  return totalArea;
};
// 时间复杂度：O(m * n)，每个节点最多访问两次
// 空间复杂度：O(m * n)，队列最坏情况为 O(m * n)

// 测试用例
const grid1 = [
  [0, 0, 0, 0, 0, 0, 0, 0],
];
console.log('示例0 - 期望: 0, DFS实际:', totalAreaOfIslandsWithDfs(JSON.parse(JSON.stringify(grid1))));
console.log('示例0 - 期望: 0, BFS实际:', totalAreaOfIslandsWithBfs(JSON.parse(JSON.stringify(grid1))));

const grid2 = [
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1],
];
console.log('示例1 - 期望: 1, DFS实际:', totalAreaOfIslandsWithDfs(JSON.parse(JSON.stringify(grid2))));
console.log('示例1 - 期望: 1, BFS实际:', totalAreaOfIslandsWithBfs(JSON.parse(JSON.stringify(grid2))));

const grid3 = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
];
console.log('示例2(全陆地) - 期望: 0, DFS实际:', totalAreaOfIslandsWithDfs(JSON.parse(JSON.stringify(grid3))));
console.log('示例2(全陆地) - 期望: 0, BFS实际:', totalAreaOfIslandsWithBfs(JSON.parse(JSON.stringify(grid3))));

const grid4 = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];
console.log('示例3(中心孤岛) - 期望: 1, DFS实际:', totalAreaOfIslandsWithDfs(JSON.parse(JSON.stringify(grid4))));
console.log('示例3(中心孤岛) - 期望: 1, BFS实际:', totalAreaOfIslandsWithBfs(JSON.parse(JSON.stringify(grid4))));

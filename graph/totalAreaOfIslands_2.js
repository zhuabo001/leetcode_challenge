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
  // 主要思路： 找到边界上的所有岛屿，因为这些岛屿有角度和边相邻所以不算“孤岛”
  // 将这些岛屿置为0
  // 计算剩余陆地面积即为孤岛总面积
  const m = grid.length,
    n = grid[0].length;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let totalArea = 0;
  const dfs = (grid, x, y) => {
    if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] === 0) return; // 越界或已经是海洋了
    grid[x][y] = 0;
    // 向4个方向上去递归找需要置0️⃣的陆地
    for (let i = 0; i < 4; i++) {
      let newX = x + directions[i][0];
      let newY = y + directions[i][1];
      dfs(grid, newX, newY);
    }
  };
  // 左右边界
  for (let i = 0; i < m; i++) {
    if (grid[i][0] === 1) dfs(grid, i, 0);
    if (grid[i][n - 1] === 1) dfs(grid, i, n - 1);
  }
  // 上下边界
  for (let i = 0; i < n; i++) {
    if (grid[0][i] === 1) dfs(grid, 0, i);
    if (grid[m - 1][i] === 1) dfs(grid, m - 1, i);
  }

  // 遍历整个地图，累加孤岛面积
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
  let totalArea = 0;
  const bfs = (grid, x, y) => {
    const queue = [[x, y]];
    grid[x][y] = 0;
    while (queue.length) {
      const [curX, curY] = queue.shift();
      for (let i = 0; i < 4; i++) {
        let newX = curX + directions[i][0];
        let newY = curY + directions[i][1];
        if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue; // 越界
        if (grid[newX][newY] === 0) continue; // 不是陆地
        grid[newX][newY] = 0;
        queue.push([newX, newY]);
      }
    }
  };
  for (let i = 0; i < m; i++) {
    if (grid[i][0] === 1) bfs(grid, i, 0);
    if (grid[i][n - 1] === 1) bfs(grid, i, n - 1);
  }

  for (let i = 0; i < n; i++) {
    if (grid[0][i] === 1) bfs(grid, 0, i);
    if (grid[m - 1][i] === 1) bfs(grid, m - 1, i);
  }

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

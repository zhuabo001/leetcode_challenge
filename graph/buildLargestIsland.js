/**
 * 104. 建造最大岛屿
 *
 * 题目描述
 * 给定一个由 1（陆地）和 0（水）组成的矩阵，你最多可以将矩阵中的一格水变为一块陆地(如果我在某个 0 的位置填上一块陆地，这块新陆地最多能"连通"几个方向)，
 * 在执行了此操作之后，矩阵中最大的岛屿面积是多少。
 * 岛屿面积的计算方式为组成岛屿的陆地的总数。
 * 岛屿是被水包围，并且通过水平方向或垂直方向上相邻的陆地连接而成的。你可以假设矩阵外均被水包围。
 *
 * 输入描述
 * 第一行包含两个整数 N, M，表示矩阵的行数和列数。之后 N 行，每行包含 M 个数字，数字为 1 或者 0，表示岛屿的单元格。
 *
 * 输出描述
 * 输出一个整数，表示最大的岛屿面积。
 *
 * 输入示例
 * 4 5
 * 1 1 0 0 0
 * 1 1 0 0 0
 * 0 0 1 0 0
 * 0 0 0 1 1
 *
 * 输出示例
 * 6
 *
 * 提示信息
 * 对于上面的案例，有两个位置可将 0 变成 1，使得岛屿的面积最大，即 6。
 *
 * 数据范围
 * 1 <= M, N <= 50
 */

// 解决方案

const buildLargestIsland = (grids) => {
  const m = grids.length,
    n = grids[0].length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const areaMap = new Map(); // 键为岛屿编号mark， 值是该岛屿面积count
  const visited = new Array(m).fill().map(() => new Array(n).fill(false));
  // dfs标记岛屿
  const dfs = (x, y, mark) => {
    if (visited[x][y] || grids[x][y] === 0) return 0;
    visited[x][y] = true;
    let count = 1;
    grids[x][y] = mark;
    for (const [dx, dy] of directions) {
      let newX = x + dx,
        newY = y + dy;
      if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue;
      count += dfs(newX, newY, mark);
    }
    return count;
  };

  // 遍历各个岛屿并计算出各个岛屿的面积

  let mark = 2;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grids[i][j] === 1 && !visited[i][j]) {
        let count = dfs(i, j, mark);
        areaMap.set(mark, count);
        mark++;
      }
    }
  }

  // 下一步？？

  // 第二遍遍历，尝试把每个0变成1，计算能连接的最大面积
  /**
   * 1. 检查它上下左右 4 个邻居
   * 2. 看看邻居各自属于哪个"岛屿编号"
   * 3. 但要注意去重——同一个岛屿编号只能算一次
   * 4. 把不同岛屿的面积加起来，再加上你自己填的这块 1
   * 5. 这就是"在这个位置填陆地"能得到的最大面积
   */
  let result = 0;
  let hasZero = false; // 用来判断矩阵中是否有0

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grids[i][j] === 0) {
        hasZero = true;

        // 用来存放"邻居"
        const connectedIslandMarks = new Set(); // 因为不同位置的邻居可能属于同一个岛屿，避免重复计算
        for (const [dx, dy] of directions) {
          let newX = i + dx,
            newY = j + dy;
          if (
            newX < 0 ||
            newX >= m ||
            newY < 0 ||
            newY >= n ||
            grids[newX][newY] === 0
          )
            continue;
          connectedIslandMarks.add(grids[newX][newY]);
        }

        // 计算总的面积
        let currentArea = 1;
        for (const islandMark of connectedIslandMarks) {
          currentArea += areaMap.get(islandMark);
        }
        result = Math.max(result, currentArea);
      }
    }
  }
  if (!hasZero) {
    return m * n;
  }
  return result === 0 ? 1 : result; // 如果没有岛屿，那面积就是1
};

// 测试用例
const grid = [
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1],
];

console.log(buildLargestIsland(grid)); // 期望输出: 6

/**
 * 时空复杂度分析
 *
 * 时间复杂度: O(m * n)
 * - 第一遍 DFS 遍历：每个格子最多被访问一次，O(m * n)
 * - 第二遍遍历所有 0 并检查 4 个邻居：O(m * n)
 * - 总体为线性遍历，即 O(m * n)
 *
 * 空间复杂度: O(m * n)
 * - visited 数组：m * n
 * - areaMap 存储每个岛屿的面积：最多 O(m * n) 个岛屿编号
 * - DFS 递归栈深度：最坏情况下整个矩阵都是陆地，递归深度为 O(m * n)
 * - grids 数组被原地修改，不额外占用空间
 * - 综上，空间复杂度为 O(m * n)
 */

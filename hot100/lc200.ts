// 岛屿数量
const islandsCounts = (grids: number[][]): number => {
  if (grids.length === 0 || grids[0].length === 0) return 0;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const visited = new Array(grids.length)
    .fill(false)
    .map(() => new Array(grids[0].length).fill(false));
  const dfs = (grids: number[][], x: number, y: number) => {
    if (visited[x][y] || grids[x][y] === 0) return;
    visited[x][y] = true;
    for (const [dx, dy] of directions) {
      let newX = x + dx,
        newY = y + dy;
      if (
        newX < 0 ||
        newX >= grids.length ||
        newY < 0 ||
        newY >= grids[0].length
      )
        continue;
      dfs(grids, newX, newY);
    }
  };
  let count = 0;
  for (let i = 0; i < grids.length; i++) {
    for (let j = 0; j < grids[0].length; j++) {
      if (grids[i][j] === 1 && visited[i][j] === false) {
        count++;
        dfs(grids, i, j);
      }
    }
  }
  return count;
};

// dfs时间复杂度：O(m * n)，每个节点最多访问一次
// dfs空间复杂度：O(m * n)，visited 数组 + 递归栈最坏为 O(m * n)

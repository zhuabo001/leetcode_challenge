// 本题题目为 ./buildLargestIsland.js 建造最大岛屿
// 借助skill跟随思路实现版本
const buildLargestIsland = (grids) => {
  // step1: 遍历所有岛屿并计算各个岛屿面积
  const m = grids.length,
    n = grids[0].length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const areaMap = new Map(); // key是岛屿mark， value是岛屿面积count
  const visited = new Array(m).fill().map(() => new Array(n).fill(false));
  let mark = 2; // 从2开始编号

  const dfs = (x, y, mark /**用来标记岛屿编号 */) => {
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

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && grids[i][j] === 1) {
        let area = dfs(i, j, mark); // 得到岛屿面积
        areaMap.set(mark, area); // 记录到map中
        mark++; // 下一个岛屿用新编号
      }
    }
  }

  // step2: 找到那个位置并计算最大面积

  let hasZero = false;
  let result = 0; // 最后的结果
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grids[i][j] === 0) {
        hasZero = true;
        const neighbourIslands = new Set();
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
          neighbourIslands.add(grids[newX][newY]); // 每个位置为0的点，相邻的岛屿列表
        }

        let currentArea = 1; // 当前为0的位置转换为1后面积为1
        for (const neighbour of neighbourIslands) {
          currentArea += areaMap.get(neighbour);
        }

        result = Math.max(result, currentArea);
      }
    }
  }
  if (!hasZero) {
    return m * n;
  }
  return result === 0 ? 1 : result; // 如果没有岛屿(全是0)， 那么最终只能更换一个位置0->1
};

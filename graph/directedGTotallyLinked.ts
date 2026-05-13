/**
 * 105. 有向图的完全联通
 *
 * 【题目描述】
 * 给定一个有向图，包含 N 个节点，节点编号分别为 1，2，...，N。
 * 现从 1 号节点开始，如果可以从 1 号节点的边可以到达任何节点，则输出 1，否则输出 -1。
 *
 * 【输入描述】
 * 第一行包含两个正整数，表示节点数量 N 和边的数量 K。
 * 后续 K 行，每行两个正整数 s 和 t，表示从 s 节点有一条边单向连接到 t 节点。
 *
 * 【输出描述】
 * 如果可以从 1 号节点的边可以到达任何节点，则输出 1，否则输出 -1。
 *
 * 【输入示例】
 * 4 4
 * 1 2
 * 2 1
 * 1 3
 * 2 4
 *
 * 【输出示例】
 * 1
 *
 * 【提示信息】
 * 从 1 号节点可以到达任意节点，输出 1。
 * 其实： 统计从节点 1 出发，在有向图中能够到达的节点个数。 如果个数 == N（所有节点），则输出 1，否则输出 -1。
 * 数据范围：
 * 1 <= N <= 100
 * 1 <= K <= 2000
 */

const canBeTotallyLinked = (N: number, edges: number[][]): 1 | -1 => {
  const numOfEdges = edges.length;
  // 用邻接表来存连通的两个点
  // graph[i]是一个数组，内部是联通的nodes， graph[i][j]代表了连通ij两点的边
  const graph = new Array(N + 1).fill(0).map((): number[] => []);
  // 构建邻接表
  for (const edge of edges) {
    graph[edge[0]].push(edge[1]);
  }
  // 用来存储节点i是否被访问过的一维数组visited
  const visited = new Array(N + 1).fill(false);
  const dfs = (x: number) => {
    if (visited[x]) return;
    visited[x] = true;
    for (const neighbor of graph[x]) {
      dfs(neighbor);
    }
  };
  dfs(1);
  let count = 0;
  for (let i = 1; i <= N; i++) {
    if (visited[i] === true) {
      count++;
    }
  }
  return count === N ? 1 : -1;
};
// 复杂度分析：
//   - 时间复杂度：O(N + K) — 每个节点和每条边遍历一次
//   - 空间复杂度：O(N + K) — 邻接表存 K 条边 + visited 数组

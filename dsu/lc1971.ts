// 寻找图中是否存在路径
//
// 有一个具有 n 个顶点的 双向 图，其中每个顶点标记从 0 到 n - 1（包含 0 和 n - 1）。
// 图中的边用一个二维整数数组 edges 表示，其中 edges[i] = [ui, vi] 表示顶点 ui 和顶点 vi 之间的双向边。
// 每个顶点对由 最多一条 边连接，并且没有顶点存在与自身相连的边。
//
// 请你确定是否存在从顶点 source 开始，到顶点 destination 结束的 有效路径 。
//
// 给你数组 edges 和整数 n、source 和 destination，如果从 source 到 destination 存在 有效路径，
// 则返回 true，否则返回 false 。
//
// 示例 1：
// 输入：n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
// 输出：true
// 解释：存在由顶点 0 到顶点 2 的路径:
// - 0 → 1 → 2
// - 0 → 2
//
// 示例 2：
// 输入：n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
// 输出：false
// 解释：不存在由顶点 0 到顶点 5 的路径.
//
// 提示：
// 1 <= n <= 2 * 10^5
// 0 <= edges.length <= 2 * 10^5
// edges[i].length == 2
// 0 <= ui, vi <= n - 1
// ui != vi
// 0 <= source, destination <= n - 1
// 不存在重复边
// 不存在指向顶点自身的边
//
// 请访问 https://leetcode.cn/problems/find-if-path-exists-in-graph/description/

class DSU {
  father: number[];
  constructor(n: number) {
    this.father = new Array(n).fill(0).map((_, i) => i);
  }

  find(v: number) {
    if (v === this.father[v]) {
      return v;
    }
    this.father[v] = this.find(this.father[v]);
    return this.father[v];
  }

  union(u: number, v: number) {
    let rootU = this.find(u);
    let rootV = this.find(v);
    if (rootU === rootV) return;
    this.father[rootV] = rootU;
  }

  isSame(u: number, v: number): boolean {
    let rootU = this.find(u);
    let rootV = this.find(v);
    return rootU === rootV;
  }
}

const findExistingRoute = (
  n: number,
  edges: number[][],
  source: number,
  destination: number
): boolean => {
  const dsu = new DSU(n);
  for (const edge of edges /** 对每条边进行union */) {
    const [u, v] = edge;
    dsu.union(u, v);
  }
  return dsu.isSame(source, destination); // 如果source 和 destination 有相同的根，说明这两个点在一个集合里，说明有连通的路径
};

// 时间复杂度 O(logn) - O(1)之间 O(n+m×α(m))其中n代表初始化dsu的时候需要O(n)
// 空间复杂度 O(n)

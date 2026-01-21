// 冗余链接ii
// 在本问题中，有根树指满足以下条件的 有向 图。该树只有一个根节点，所有其他节点都是该根节点的后继。该树除了根节点之外的每一个节点都有且只有一个父节点，而根节点没有父节点。
// 输入一个有向图，该图由一个有着 n 个节点（节点值不重复，从 1 到 n）的树及一条附加的有向边构成。附加的边包含在 1 到 n 中的两个不同顶点间，这条附加的边不属于树中已存在的边。
// 结果图是一个以边组成的二维数组 edges 。 每个元素是一对 [ui, vi]，用以表示 有向 图中连接顶点 ui 和顶点 vi 的边，其中 ui 是 vi 的一个父节点。
// 返回一条能删除的边，使得剩下的图是有 n 个节点的有根树。若有多个答案，返回最后出现在给定二维数组的答案。

// 示例
// 输入：edges = [[1,2],[1,3],[2,3]]
/**
 * edges = [[1,2],[1,3],[2,3]]，表示的是
 * edges[0][0] = 1，edges[0][1] = 2，
 * edges[1][0] = 1，edges[1][1] = 3，
 * edges[2][0] = 2，edges[2][1] = 3
 */
// 输出：[2,3]
// 解释：给定的有向图如下：
// 1
// / \
// v   v
// 2-->3
// 这个图是有根树，因为根节点没有父节点。
// 附加的边 (2,3) 构成了一个环，所以删除它会导致无限循环。
// 示例 2：
// 输入：edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]
// 输出：[4,1]
// 解释：给定的有向图如下：
// 5 <- 1 -> 2
//      ^    |
//      |    v
//      4 <- 3
// 这个图是有根树，因为根节点没有父节点。
// 附加的边 (4,1) 构成了一个环，所以删除它会导致无限循环。
// 示例 3：
// 输入：edges = [[1,2],[2,3],[3,4],[4,1],[2,5]]
// 输出：[4,1]
// 解释：给定的有向图如下：
// 2 -> 3
// ^    |
// |    v
// 1 -> 4
//      ^
//      |
//      5
// 这个图是有根树，因为根节点没有父节点。
// 附加的边 (4,1) 构成了一个环，所以删除它会导致无限循环。
const N = 1010; // 二维数组在3-1000范围内
const father = new Array(N);
let n; // 边的数量 edges.length

/**
 * 压缩路径
 * @param {*} edges
 */
const find = (node) => {
  if (father[node] !== node) {
    father[node] = find(father[node]);
  }
  return father[node];
};

/**
 * 将 v -> u这条边加入并查集
 * @param {} u
 * @param {} v
 */
const join = (u, v) => {
  const rootU = find(u);
  const rootV = find(v);
  if (rootU === rootY) return;
  father[rootV] = rootU;
};

/**
 * 判断是否属于一个集合
 * @param {} u
 * @param {} v
 */
const isSame = (u, v) => {
  let rootU = find(u),
    rootV = find(v);
  return rootU === rootV;
};

// 在有向图里找到删除的那条边，使其变成树
const getRemoveEdge = (edges) => {
  // 初始化并查集
  for (let i = 1; i <= edges.length; i++) {
    father[i] = i;
  }

  // 并查集检测环
  for (let i = 0; i < edges.length; i++) {
    if (isSame(edges[i][0], edges[i][1] /** 两条边属于同一个集合，有环 */)) {
      return edges[i];
    }
    join(edges[i][0], edges[i][1]);
  }
  return [];
};

// 判断删一条边之后判断是不是树
const isTreeAfterRemoveEdge = (edges, deletedEdge) => {
  for (let i = 1; i <= edges.length; i++) {
    father[i] = i;
  }
  for (let i = 0; i < edges.length; i++) {
    if ((i = deletedEdge)) continue; // 遍历所有边，跳过要删除的那条
    if (isSame(edges[i][0], edges[i][1])) {
      return false; // 构成环了 一定不是树
    }
    join(edges[i][0], edges[i][1]);
  }
  return true;
};

const findRedundantDirectionConnected = (edges) => {
  // 1. 只看入度不看出度 —— 父节点就是有可能有好几个出度
  // 2. 加了这个冗余的边后，两种情况
  /**
   * 2-1. 有且仅有一个入度为2的点
   * 一定是删除指向入度为2的节点的两条边其中的一条，如果删了一条，判断这个图是一个树，那么这条边就是答案
   * 同时注意要从后向前遍历，因为如果两条边删哪一条都可以成为树，就删最后那一条
   * */
  /**
   * 2-2. 没有入度为2的点，说明此时出现了有向环
   * 找到构成环的边就是要删除的边
   * 实现两个重要函数
   * isTreeAfterRemoveEdge() 判断删一个边之后是不是树了
   * getRemoveEdge 确定图中一定有了有向环，那么要找到需要删除的那条边
   * 此时应该是用到并查集了，并查集为什么可以判断 一个图是不是树呢？
   * 如果在加这条边之前两个点就已经在同一个集合里了，那加这条边就一定会形成环，所以不是树。
   */
  // tips: edges[i][1] 表示的节点都是 箭头指向的节点，即这个节点有一个入度, edges[i][0]代表这个节点有一个出度
  // 以示例1为例 edges = [[1,2],[1,3],[2,3]], edges[0][0] = 1，edges[0][1] = 2  →  边 1→2，以此类推
  /**
   * 统计节点的入度(本题不看出度，原因已经给出)
   */
  const len = edges.length;
  const inDegree = new Array(len + 1).fill(0);
  for (let i = 0; i < len; i++) {
    inDegree[edges[i][1]]++;
  }

  // 收集入度为2的边
  const vec = [];
  for (let i = len - 1; i >= 0; i--) {
    if (inDegree[edges[i][1]] === 2) {
      vec.push(i);
    }
  }

  if (vec.length > 0) {
    if (isTreeAfterRemoveEdge(edges, vec[0])) {
      return edges[vec[0]];
    } else {
      return edges[vec[1]];
    }
  }

  return getRemoveEdge(edges);
};

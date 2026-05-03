// 冗余连接
// 树可以看成是一个连通且 无环 的 无向 图。
// 给定往一棵 n 个节点 (节点值 1～n) 的树中添加一条边后的图。添加的边的两个顶点包含在 1 到 n 中间，且这条附加的边不属于树中已存在的边。图的信息记录于长度为 n 的二维数组 edges ，edges[i] = [ai, bi] 表示图中在 ai 和 bi 之间存在一条边。
// 请找出一条可以删去的边，删除后可使得剩余部分是一个有着 n 个节点的树。如果有多个答案，则返回数组 edges 中最后出现的边

// 请访问 https://leetcode.cn/problems/redundant-connection/description/

const findRedundantConnection = (edges) => {
  // 并查集的基础问题
  // 并查集： 主要就是解决集合问题，两个节点在不在一个集合，也可以将两个节点添加到一个集合中

  // 解题思路
  /**
   *
   *
   *
   */
  const n = edges.length;
  const parent = new Array(n + 1)
    .fill(0)
    .map((_, i) => i /**将每个位置的值设为其索引 i */);

  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  };

  const union = (x, y) => {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX !== rootY) {
      parent[rootX] = rootY;
    }
  };

  for (const [start, end] of edges) {
    if (find(start) === find(end)) {
      return [start, end];
    }
    union(start, end);
  }
  return [];
};

// 时间复杂度 —— O(n)
// 空间复杂度 —— O(n)

// 冗余连接
// 树可以看成是一个连通且 无环 的 无向 图。
// 给定往一棵 n 个节点 (节点值 1～n) 的树中添加一条边后的图。添加的边的两个顶点包含在 1 到 n 中间，且这条附加的边不属于树中已存在的边。图的信息记录于长度为 n 的二维数组 edges ，edges[i] = [ai, bi] 表示图中在 ai 和 bi 之间存在一条边。
// 请找出一条可以删去的边，删除后可使得剩余部分是一个有着 n 个节点的树。如果有多个答案，则返回数组 edges 中最后出现的边

// 请访问 https://leetcode.cn/problems/redundant-connection/description/
class DSU2 {
  public parents: number[];
  constructor(n: number) {
    this.parents = new Array(n + 1).fill(0).map((_, i) => i);
  }

  find(v: number) {
    if (v === this.parents[v]) {
      return v;
    }
    // 路径压缩： 想象一下 将一条串行的链拆成多叉树，只有一个根节点和其他(平级)的叶子节点，这一行就干这个事
    this.parents[v] = this.find(this.parents[v]) as number;
    return this.parents[v];
  }

  union(u: number, v: number) {
    let rootU = this.find(u);
    let rootV = this.find(v);
    if (rootU === rootV) {
      return;
    }
    this.parents[rootV] = rootU;
  }

  isSame(u: number, v: number): boolean {
    let rootU = this.find(u);
    let rootV = this.find(v);
    return rootU === rootV;
  }
}
const findRedundantConnection2 = (edges: number[][]): any[] => {
  const dsu = new DSU2(edges.length);
  for (const edge of edges) {
    const [source, destination] = edge;
    if (dsu.isSame(source, destination)) {
      return [source, destination];
    }
    dsu.union(source, destination);
  }
  return [];
};

// 时间复杂度: O(n · α(n)) ≈ O(n)
// - 遍历 edges 的 n 条边: O(n)
// - 每条边调用 isSame 和可能的一次 union，每个操作都基于 find
// - find 使用了路径压缩，均摊时间复杂度 O(α(n))，α 为阿克曼函数反函数，可视为常数
// - 总耗时 O(n · α(n)) 约等于 O(n)

// 空间复杂度: O(n)
// - DSU2 内部维护了一个长度为 n + 1 的 parents 数组

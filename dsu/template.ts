// 并查集的常用方法
class DisjointSetUnion {
  father: number[];
  constructor(n: number) {
    this.father = new Array(n).fill(0).map((_, index) => index); // 每个节点初始指向自己
  }
  /**
   * 寻找v节点的根节点
   * @param v 待寻根的节点
   * @returns
   */
  find(v: number): number {
    // 递归往上找父节点
    // todo: 路径压缩
    // return v === this.father[v] ? v : this.find(this.father[v]);
    if (v === this.father[v]) {
      return v;
    }
    this.father[v] = this.find(this.father[v]); // 路径压缩
    return this.father[v];
  }

  /**
   * 将v->u 这条边加入并查集
   * @param u
   * @param v
   * @returns
   */
  union(u: number, v: number): void {
    let rootU = this.find(u);
    let rootV = this.find(v);
    if (rootU === rootV) return;
    this.father[rootV] = rootU; // 必须先寻根! 再进行连接 不能将上述的行为简化为this.isSame()!
  }

  /**
   * 判断 u 和 v是否找到同一个根
   * @param u
   * @param v
   * @returns
   */
  isSame(u: number, v: number): boolean {
    let rootU = this.find(u);
    let rootV = this.find(v);
    return rootU === rootV;
  }
}
// 时间复杂度： 在 o(logn) - o(1)之间 并查集的合并操作越多，越趋近于常数时间
// 空间复杂度：O(n) - father数组

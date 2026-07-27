// 二叉树中的最大路径和
// 二叉树中的 路径 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。
// 路径和 是路径中各节点值的总和。
import { TreeNode } from './tree';
const maxPathSum = (root: TreeNode): number => {
  let ans: number = -Infinity;
  const dfs = (node: TreeNode | null) => {
    if (!node) return 0; // 意思当前节点无贡献
    let leftMax = Math.max(0, dfs(node.left)); // 左子节点可能是负数，如果是负数就不纳入路径和计算
    let rightMax: number = Math.max(0, dfs(node.right)); // 同理
    const vSum = node.val + leftMax + rightMax; // 每个节点尝试 V 字形更新
    ans = Math.max(ans, vSum); // 求最大，不是求和，所以这里应该是Math.max()
    return node.val + Math.max(leftMax, rightMax);
  };
  dfs(root);
  return ans;
};

// 时间复杂度 O(N) - 最坏情况每个节点被访问一次
// 空间复杂度 O(H) - 树的高度，最好的情况是O(logN) 此时为平衡树；最差的情况是O(N)此时为一棵斜树
//
// ── DFS + 闭包变量 模式对比 ─────────────────────────────────────
//          │ lc236（最近公共祖先）        │ lc124（最大路径和）
// ─────────┼─────────────────────────────┼──────────────────────────
// dfs 返回  │ boolean（子树有没有 p/q）    │ number（向下不拐弯最大和）
// 闭包变量  │ ans: TreeNode | null       │ ans: number = -Infinity
// 更新时机  │ 左右都有 / 当前是目标且一侧有 │ 每个节点尝试 V 字形更新
// 关键技巧  │ node === p（引用比较）       │ Math.max(0, …) 掐掉负数

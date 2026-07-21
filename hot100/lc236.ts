// 二叉树的最近公共祖先
// 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

import { TreeNode } from './tree';
const lowestCommonAncestor = (root: TreeNode, p: TreeNode, q: TreeNode) => {
  let ans: TreeNode | null = null;
  const dfs = (node: TreeNode | null): boolean => {
    if (!node) return false;
    const leftChild = dfs(node.left);
    const rightChild = dfs(node.right);
    if (
      (leftChild && rightChild) ||
      ((node === p || node === q) && (leftChild || rightChild))
    ) {
      ans = node;
    }
    return leftChild || rightChild || node === p || node === q;
  };
  dfs(root);
  return ans;
};
// 时间复杂度 O(N) — 每个节点恰好被 dfs 访问一次，N 为节点总数
// 空间复杂度 O(H) — H 为树高，即递归调用栈的最大深度；
//   最坏情况（斜树）退化为 O(N)，平衡树为 O(log N)

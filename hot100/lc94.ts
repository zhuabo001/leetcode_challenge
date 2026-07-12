import { TreeNode } from './tree';
// 二叉树的中序遍历

// 递归版
export const inorder = (root: TreeNode | null): number[] => {
  const res: number[] = [];
  const dfs = (node: TreeNode | null) => {
    if (!node) return;
    dfs(node.left);
    res.push(node.val);
    dfs(node.right);
  };
  dfs(root);
  return res;
};

// 迭代版（显式栈）
export const inorderTraversal = (root: TreeNode | null) => {
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) {
      // 有左子树？有 —— 记下来 - stack
      stack.push(cur);
      cur = cur.left as TreeNode;
    }
    cur = stack.pop() as TreeNode; // 左路走到头了，从stack顶部的一个node从栈中取出进行访问
    res.push(cur.val);
    cur = cur.right as TreeNode; // 前往右路
  }
  return res;
};

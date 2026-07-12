// 二叉树的最大深度
// 给定一个二叉树 root ，返回其最大深度。
// 二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数。
import { TreeNode } from './tree';
const maxDepth = (root: TreeNode): number => {
  if (!root) return 0;
  let depth: number = 0;
  const queue: TreeNode[] = [];
  queue.push(root);
  while (queue.length > 0) {
    const len = queue.length;
    depth++;
    for (let i = 0; i < len; i++) {
      const node = queue.shift() as TreeNode;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return depth;
};

// 时间复杂度 O(N^2) —— shift操作会导致后续所有元素往前移动一位，所以这一步也要O(n)
// 空间复杂度 O(N)

// 优化版（指针替代 shift，降为 O(N)）
const maxDepthOptimized = (root: TreeNode | null): number => {
  if (!root) return 0;
  let index = 0,
    depth = 0;
  const queue: TreeNode[] = [root];
  while (index < queue.length) {
    const len = queue.length;
    depth++;
    for (; index < len; index++) {
      const node = queue[index];
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return depth;
};
// 时间复杂度 O(N) — idx 指针替代 shift，每次 O(1)
// 空间复杂度 O(N)

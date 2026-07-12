// 二叉树的层序遍历
import { TreeNode } from './tree';
const levelOrder = (root: TreeNode) => {
  if (!root) return [];
  const res = [];
  const queue = [root];
  while (queue.length) {
    const len = queue.length;
    const curLevel = [];
    for (let i = 0; i < len; i++) {
      const node = queue.shift() as TreeNode;
      curLevel.push(node.val);
      if (node?.left) queue.push(node.left);
      if (node?.right) queue.push(node.right);
    }
    res.push([...curLevel]);
  }
  return res;
};
// 时间复杂度 O(n²) — 因为 queue.shift() 每操作一次 O(n)，每个节点一次
// 空间复杂度 O(n)
//
// 优化版（指针替代 shift，降为 O(n)）
const levelOrderOptimized = (root: TreeNode | null): number[][] => {
  if (!root) return [];
  const res: number[][] = [];
  const queue: TreeNode[] = [root];
  let idx = 0;
  while (idx < queue.length) {
    const len = queue.length;
    const curLevel: number[] = [];
    for (; idx < len; idx++) {
      const node = queue[idx];
      curLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(curLevel);
  }
  return res;
};
// 时间复杂度 O(n) — 用 idx 指针代替 shift，每次 O(1)
// 空间复杂度 O(n)

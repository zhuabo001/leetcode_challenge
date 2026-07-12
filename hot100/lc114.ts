// 二叉树展开为链表
import { TreeNode } from './tree';
const flatten = (root: TreeNode) => {
  if (!root) return;
  flatten(root.left as TreeNode);
  flatten(root.right as TreeNode);
  const left = root.left;
  const right = root.right;
  root.right = left;
  root.left = null;
  let pointer = root;
  while (pointer.right) {
    pointer = pointer.right;
  }
  pointer.right = right;
  return root;
};
// 时间复杂度 O(n^2) ——> 递归O(n)嵌套了一个while找最右端的循环

// 空间复杂度 O(h) h是树高

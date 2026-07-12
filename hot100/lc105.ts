// 从前序遍历和中序遍历的结果构造一个二叉树
import { TreeNode } from './tree';
const buildTree = (preorder: any, inorder: any) => {
  if (preorder.length === 0) return null;
  const root = new TreeNode(preorder[0]);
  let index = inorder.indexOf(preorder[0]);
  // 中序中index为root的下标，那么也就是说[0, index - 1]为左子树，数量正好为index(0到index-1)有index个数字
  // 回到前序数组中，root后面跟着的index个数字就是左子树的节点，所以遍历[1, index + 1)
  root.left = buildTree(preorder.slice(1, index + 1), inorder.slice(0, index));
  root.right = buildTree(preorder.slice(index + 1), inorder.slice(index + 1));
  return root;
};
// 时间复杂度 O(n^2) 1. indexof 2. 递归
// 空间复杂度 O(n^2) 每次递归都要创建新的数组

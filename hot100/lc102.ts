// 二叉树的层序遍历
import { TreeNode } from './type';
const levelOrder = (root: TreeNode) => {
  if (!root) return [];
  const res = [];
  const queue = [root];
  while (queue.length) {
    const len = queue.length;
    const curLevel = [];
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      curLevel.push(node.val);
      if (node?.left) queue.push(node.left);
      if (node?.right) queue.push(node.right);
    }
    res.push([...curLevel]);
  }
  return res;
};

import { TreeNode } from './tree';
// 对称二叉树
// 给你一个二叉树的根节点 root ， 检查它是否轴对称。

// 优化版（用指针替代 shift，避免数组 O(n) 重新索引）
export const isSymmetric = (root: TreeNode | null): boolean => {
  if (!root) return true;
  const queue: (TreeNode | null)[] = [root.left, root.right];
  let idx = 0;
  while (idx < queue.length) {
    const leftNode = queue[idx++];
    const rightNode = queue[idx++];
    if (!leftNode && !rightNode) continue;
    if (!leftNode || !rightNode || leftNode.val !== rightNode.val) return false;
    queue.push(leftNode.left, rightNode.right, leftNode.right, rightNode.left);
  }
  return true;
};
// 时间复杂度 O(n)
// 空间复杂度 O(n)

// 关于队列入队顺序的说明：
// 队列每次取出两个节点（leftNode, rightNode）进行镜像对比，所以入队时
// 必须保证成对的镜像节点在队列中相邻，取出后才能正确配对：
//
//   queue.push(leftNode.left);   // ┐ 第 1 对（外层镜像）
//   queue.push(rightNode.right); // ┘ left.left ↔ right.right
//   queue.push(leftNode.right);  // ┐ 第 2 对（内层镜像）
//   queue.push(rightNode.left);  // ┘ left.right ↔ right.left
//
// 同对内的两个节点可以交换顺序（比较是对称的，A≠B ⇔ B≠A），
// 但不能把不同对的节点混在一起——否则外层和内层的镜像会错误配对。

// 关于队列入队顺序的说明：
// 队列每次取出两个节点（leftNode, rightNode）进行镜像对比，所以入队时
// 必须保证成对的镜像节点在队列中相邻，取出后才能正确配对：
//
//   queue.push(leftNode.left);   // ┐ 第 1 对（外层镜像）
//   queue.push(rightNode.right); // ┘ left.left ↔ right.right
//   queue.push(leftNode.right);  // ┐ 第 2 对（内层镜像）
//   queue.push(rightNode.left);  // ┘ left.right ↔ right.left
//
// 同对内的两个节点可以交换顺序（比较是对称的，A≠B ⇔ B≠A），
// 但不能把不同对的节点混在一起——否则外层和内层的镜像会错误配对。

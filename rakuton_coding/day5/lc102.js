// 102. 二叉树的层序遍历
// 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。
// 示例：
// 二叉树：[3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回其层序遍历结果：
// [
//   [3],
//   [9,20],
//   [15,7]
// ]
const levelOrder = (root) => {
  if (!root) return res;
  const res = [];
  const queue = [root];
  while (queue.length) {
    const len = queue.length;
    const curLevel = [];
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      curLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push([...curLevel]);
  }
  return res;
};

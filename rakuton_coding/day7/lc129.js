// 129. 求根节点到叶节点数字之和
// 给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
// 每条从根节点到叶节点的路径都代表一个数字：
// 例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
// 计算从根节点到叶节点生成的 所有数字之和 。
// 叶节点 是指没有子节点的节点。
const sumOfTree = (root) => {
  if (!root) return 0;
  if (!root.left && !root.right) return root.val;
  const res = [];
  const path = [];
  const backTrack = (node) => {
    if (!node) {
      return;
    }
    path.push(node.val); // 先将当前节点推入路径
    if (!node.left && !node.right) {
      // 到达叶节点，将路径转换为数字并加入结果数组
      res.push(Number(path.join('')));
    } else {
      if (node.left) backTrack(node.left);
      if (node.right) backTrack(node.right);
    }
    // 回溯时，将当前节点从路径中弹出
    path.pop();
  };
  backTrack(root);
  return res.reduce((pre, cur) => pre + cur, 0);
};
// 时间复杂度：O(n)，其中 n 是二叉树的节点数。每个节点恰好被遍历一次。
// 空间复杂度：O(n)，其中 n 是二叉树的节点数。空间复杂度主要取决于递归调用的栈空间，而栈空间的深度不会超过 n。
// 测试用例
const root = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: {
    val: 3,
    left: null,
    right: null,
  },
};
console.log(sumOfTree(root));

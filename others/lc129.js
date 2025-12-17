// 129. 求根节点到叶节点数字之和
// 给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
// 每条从根节点到叶节点的路径都代表一个数字：
// 例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
// 计算从根节点到叶节点生成的 所有数字之和 。
// 叶节点 是指没有子节点的节点。
const sumOfNumbers = (root) => {
  if (!root) return 0;
  if (!root.left && !root.right) return root.val;
  let res = [],
    path = [];
  const dfs = (node) => {
    if (!node) return;
    path.push(node.val);
    if (!node.left && !node.right) {
      res.push(Number(path.join('')));
    } else {
      if (node.left) dfs(node.left);
      if (node.right) dfs(node.right);
    }
    path.pop(); //撤销操作必不可少
  };
  dfs(root);
  return res.reduce((pre, cur) => pre + cur);
};

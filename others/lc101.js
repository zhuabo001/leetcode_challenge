// 101. 对称二叉树
// 给你一个二叉树的根节点 root ， 检查它是否轴对称。
// 示例 1：
// 输入：root = [1,2,2,3,4,4,3]
// 输出：true
// 示例 2：
// 输入：root = [1,2,2,null,3,null,3]
// 输出：false
// 本题思路：递归比较左右子树是否对称
// 递归三部曲： 1. 确定递归的参数和返回值
// 2. 确定递归的终止条件
// 3. 确定递归的单层逻辑
// 递归的单层逻辑：比较当前节点是否对称，递归比较左子树的左节点和右子树的右节点，递归比较左子树的右节点和右子树的左节点
// 与lc100不同的是，lc100是比较两棵树是否相同，而lc101是比较两棵树是否对称
const isSymmetric = (root) => {
  if (!root) return true;
  return compare(root.left, root.right); // 递归比较左右子节点
};
const compare = (/** 传入左右两个节点 */ left, right) => {
  // 递归的返回值为布尔值
  // 终止条件
  // 单层递归逻辑: 继续递归比较左子树的左节点和右子树的右节点
  if (!left && !right) return true; // 都是空树
  if (!left || !right) return false; // 只有一个是空树
  if (left && right && left.val !== right.val) return false; // 都不是空树但是值不等
  const outside = compare(left.left, right.right); // 递归比较左子树的左节点和右子树的右节点
  const inside = compare(left.right, right.left); // 递归比较左子树的右节点和右子树的左节点
  return outside && inside; // 左右子树都对称才对称
};
// 时间复杂度：O(n)，其中 n 是二叉树的节点数。每个节点最多被访问一次。
// 空间复杂度：O(n)，其中 n 是二叉树的节点数。空间复杂度主要取决于递归调用的栈空间，递归栈的深度等于二叉树的高度，最坏情况下，二叉树的高度等于节点数，空间复杂度为 O(n)。

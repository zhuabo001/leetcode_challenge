// 1382. 将二叉搜索树变平衡
// 给你一棵二叉搜索树，请你返回一棵 平衡后 的二叉搜索树，新生成的树应该与原来的树有着相同的节点值。
// 如果一棵二叉搜索树中，每个节点的两棵子树高度差不超过 1 ，我们就称这棵二叉搜索树是 平衡的 。
// 如果有多种构造方法，请你返回任意一种。

// 思路：中序遍历得到有序数组，然后根据有序数组构造平衡二叉搜索树
// 有序数组构造平衡二叉搜索树的方法：取数组中间元素作为根节点，递归构造左子树和右子树
const balanceBst = (root) => {
  const res = [];
  // 中序遍历将bst转换为有序数组
  const traversal = (node) => {
    if (!node) return;
    traversal(node.left);
    res.push(node.val);
    traversal(node.right);
  };
  const getTree = (nums, left, right) => {
    // 选择中间元素作为根节点，递归构造左右子树 -> 每次选中间节点，这样能保证左右子树元素数量差最多为1
    if (left > right) return null;
    let mid = left + Math.floor((right - left) / 2); // 找中点
    let root = new TreeNode(nums[mid]); // 创建节点
    root.left = getTree(nums, left, mid - 1); // 递归构造左子树
    root.right = getTree(nums, mid + 1, right); // 递归构造右子树
    return root;
  };
  traversal(root);
  return getTree(res, 0, res.length - 1);
};
// 时间复杂度：O(n)，其中 n 是二叉树的节点数。中序遍历需要 O(n) 的时间，构造平衡二叉搜索树需要 O(n) 的时间。
// 空间复杂度：O(n)，其中 n 是二叉树的节点数。空间复杂度主要取决于递归调用的栈空间，递归栈的深度等于二叉树的高度，最坏情况下，二叉树的高度等于节点数，空间复杂度为 O(n)。

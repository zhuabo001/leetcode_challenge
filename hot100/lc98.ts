// 验证二叉搜索树
// 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
// 如果是一个bst，那么中序遍历它的时候，得到一个升序数组
interface TreeNodeType {
  val: number;
  left: TreeNodeType | null;
  right: TreeNodeType | null;
}

const isValidBST = (root: TreeNodeType): boolean => {
  const res: number[] = [];
  const traversal = (node: TreeNodeType | null) => {
    if (!node) return null;
    traversal(node.left);
    res.push(node.val);
    traversal(node.right);
  };

  traversal(root);
  for (let i = 1; i < res.length; i++) {
    if (res[i] <= res[i - 1]) {
      return false;
    }
  }
  return true;
};
// 时间复杂度 O(n)
// 空间复杂度 O(n)

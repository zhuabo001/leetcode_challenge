// 二叉树的中序遍历
interface TreeNodeType {
  val: number;
  left: TreeNodeType | null;
  right: TreeNodeType | null;
}
class TreeNode {
  public val;
  public left: TreeNodeType | null;
  public right: TreeNodeType | null;
  constructor(val: number, left?: TreeNodeType, right?: TreeNodeType) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

const inorder = (root: TreeNodeType) => {
  const res: number[] = [];
  const dfs = (node: TreeNodeType | null) => {
    if (!node) return;
    dfs(node.left);
    res.push(node.val);
    dfs(node.right);
  };
  return res;
};

const inorderTraversal = (root: TreeNodeType) => {
  const res: number[] = [];
  const stack: TreeNodeType[] = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) {
      // 有左子树？有 —— 记下来 - stack
      stack.push(cur);
      cur = cur.left as TreeNodeType;
    }
    cur = stack.pop() as TreeNodeType; // 左路走到头了，从stack顶部的一个node从栈中取出进行访问
    res.push(cur.val);
    cur = cur.right as TreeNodeType; // 前往右路
  }
  return res;
};

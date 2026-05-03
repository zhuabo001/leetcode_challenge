// 236. 二叉树的最近公共祖先
// 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
// 最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
// 示例1：
// 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// 输出：3
// 解释：节点 5 和节点 1 的最近公共祖先是节点 3 。
// 示例2：
// 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// 输出：5
// 解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。
// 示例3：
// 输入：root = [1,2], p = 1, q = 2
// 输出：1
// 解释：节点 1 和节点 2 的最近公共祖先是节点 1 。
// 示例4：
// 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 6, q = 4
// 输出：5
// 解释：节点 6 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。
function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}
const lowestCommonAncestor = (root, p, q) => {
  let ans;
  const dfs = (node, p, q) => {
    if(!node) return false;
    const leftChild = dfs(node.left, p, q); // 左子树是否包含p或q
    const rightChild = dfs(node.right, p, q); //  右子树是否包含p或q
    if((leftChild && rightChild) || ((node.val === p.val || node.val === q.val) && (leftChild || rightChild))){
        ans = node; // 若当前节点的左子树和右子树都包含p或q，或者当前节点的值等于p或q且左子树或右子树包含p或q，说明当前节点就是最近公共祖先
    }
    return leftChild || rightChild || (node.val === p.val || node.val === q.val);
  }
  dfs(root, p, q);
  return ans;
}
// 时间复杂度：O(n)
// 空间复杂度：O(n)
// && (leftChild || rightChild) 确保了：
// 当前节点是p或q时， 必须 在它的子树中找到另一个目标节点
// 这样才能确定当前节点确实是两个节点的公共祖先
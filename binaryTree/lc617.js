// 合并二叉树
// 给你两棵二叉树： root1 和 root2 。
// 想象一下，当你将其中一棵覆盖到另一棵之上时，两棵树上的一些节点将会重叠（而另一些不会）。你需要将这两棵树合并成一棵新二叉树。合并的规则是：如果两个节点重叠，那么将这两个节点的值相加作为合并后节点的新值；否则，不为 null 的节点将直接作为新二叉树的节点。
// 返回合并后的二叉树。
// 注意: 合并过程必须从两个树的根节点开始。
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined? null : right)
 * }
 * */
// 递归三部曲：
// 1. 确定递归函数的参数和返回值
// 那么参数至少是要传入两个二叉树的根节点，返回值就是合并之后二叉树的根节点
// 2. 确定终止条件
// if (t1 == NULL) return t2; // 如果t1为空，合并之后就应该是t2
// if (t2 == NULL) return t1; // 如果t2为空，合并之后就应该是t1
// 3. 确定单层递归的逻辑
// 那么单层递归中，就要把两棵树的元素加到一起
// 接下来t1 的左子树是：合并 t1左子树 t2左子树之后的左子树;t1 的右子树：是 合并 t1右子树 t2右子树之后的右子树
const mergeTrees = function (root1, root2) {
    // 终止条件
  if(!root1) return root2;
  if(!root2) return root1;
  // 单层递归逻辑
  root1.val += root2.val;
  // 左子树
  root1.left = mergeTrees(root1.left, root2.left);
  // 右子树
  root1.right = mergeTrees(root1.right, root2.right);
  return root1;
}
// 时间复杂度O(min(m, n)) - m 是 root1 的节点数量；n 是 root2 的节点数量
// 空间复杂度O(min(m, n)) - 最好情况（平衡树）：O(log(min(m, n)))；最坏情况（不平衡树）：O(min(m, n))
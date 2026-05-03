// 平衡二叉树
// 给定一个二叉树，判断它是否是高度平衡的二叉树。
// 本题中，一棵高度平衡二叉树定义为：
// 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * 
 */
 const isBalanced = function(root) {
   return getHeightNum(root) === -1 ? false : true;
 }
 const getHeightNum = (root) => {
    if(!root) return 0;
    const leftHeight = getHeightNum(root.left);
    if(leftHeight === -1) return -1;
    const rightHeight = getHeightNum(root.right);
    if(rightHeight === -1) return -1;
    let res;
    if(Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
    } else {
        res = 1 + Math.max(leftHeight, rightHeight);
    }
    return res;
}
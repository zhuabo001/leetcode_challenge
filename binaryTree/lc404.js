// 求左叶子之和
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const sumOfLeftLeaves = function(root) {
    if(!root) return 0; // 空节点
    if(!root.left && !root.right) return 0; // 叶子节点
    let leftSum = sumOfLeftLeaves(root.left);
    if(root.left && !root.left.left && !root.left.right) {
        // 如果左子节点是叶子节点， 那这个左子节点就是左叶子本身
        leftSum = root.left.val;
    }
    let rightSum = sumOfLeftLeaves(root.right);
    return leftSum + rightSum;
}
// 时间复杂度O(n): - n是二叉树的节点数每个节点只需要访问一次
// 空间复杂度O(n): - 空间复杂度取决于递归的栈深度，而递归的栈深度取决于二叉树的高度


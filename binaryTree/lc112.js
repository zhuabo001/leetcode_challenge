// 路径总和
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
 * @param {number} targetSum
 * @return {boolean}
 */
const hasPathSum = function(root, targetSum) {
    const traversal = (node, count/**递归参数为节点以及边和 */) => {
    //递归终止条件
        if(!node.left && !node.right && count == 0) return true;
        if(!node.left && !node.right) return false;
        if(node.left){
            count -= node.left.val; // 采用递减的方式
            if(traversal(node.left, count)) return true;
            count += node.left.val; // 回溯
        }
        if(node.right){
            count -= node.right.val;
            if(traversal(node.right, count)) return true;
            count += node.right.val;
        }
        return false;
    }
    if(!root) return false;
    return traversal(root, targetSum - root.val);
}
// 时间复杂度O(n)
// 空间复杂度 平衡二叉树O(logn)完全不平衡的树退化为链表O(n)
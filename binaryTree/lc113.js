// 路径之和ii
// 定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。
// 说明: 叶子节点是指没有子节点的节点。
// 示例:
// 给定如下二叉树，以及目标和 sum = 22，
//               5
//              / \
//             4   8
//            /   / \
//           11  13  4
//          /  \    / \                                    
//         7    2  5   1
// 返回:
// [
//    [5,4,11,2],
//    [5,8,4,5]
// ]
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 * 
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
// 思路：深度优先遍历
// 这道题递归函数不需要返回值
// 原因是我们要遍历整个树找到所有路径，而不需要遍历整棵树找到就返回
// 相比较lc112，那道题只需要找到一个符合条件的路径就可以返回了
// 所以递归函数需要返回值，及时返回

var pathSum = function(root, sum) {
    let res = [];
    let path = [];
    const dfs = (node, count, pathList) => {
        if(!node.left && !node.right && count === 0) {
            res.push([...pathList]);
            return;
        }
        // 如果没找到符合条件的路径直接返回
        if(!node.left && !node.right) return;
        if(node.left){
            count -= node.left.val; // 
            pathList.push(node.left.val); // 
            dfs(node.left, count, pathList);
            count += node.left.val;// 回溯
            pathList.pop(); // 回溯
        }
        if(node.right) {
            count -= node.right.val;
            pathList.push(node.right.val);
            dfs(node.right, count, pathList);
            count += node.right.val;
            pathList.pop();
        }
        
    }
    if(!root) return [];
    path.push(root.val);
    dfs(root, sum - root.val, path);
    return res;
}
// 时间复杂度：O(n^2) —— n为节点数
// 最坏情况是树完全不平衡，那此刻是一个链表，路径长度可能是n
// 此时复制路径复杂度为O(路径长度)，总体复杂度 O(n^2)
// 空间复杂度：O(n) —— 递归栈
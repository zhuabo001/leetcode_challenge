// 翻转二叉树
// * @param {TreeNode} root
//  * @return {TreeNode}
//  */
// 递归法(前序遍历或者后序遍历都可以)
const invertTree = function(root) {
    if(!root) return null;
    [root.left, root.right] = [root.right, root.left];
    invertTree(root.left);
    invertTree(root.right);
    return root;
}
// 时间复杂度O(n)
// 空间复杂度O(n)
// 迭代法(广度优先遍历-层序遍历)
const invertTree1 = function(root) {
    const queue = [];
    if(root) queue.push(root);
    while(queue.length){
        const len = queue.length;
        for(let i = 0; i < len; i++){
            const node = queue.shift();
            [node.left, node.right] = [node.right, node.left]; // 交换左右节点
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
    }
    return root;
}
// 时间复杂度O(n) - n是二叉树的节点数每个节点只需要访问一次
// 空间复杂度O(n) - n是二叉树的节点数

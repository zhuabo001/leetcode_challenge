// 在每个树行中找最大值
// 给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined? null : right)
 * }
 */ 
const largestValues = (root) => {
    const res = []; // 结果数组
    const queue = []; // 队列, 用于存储节点
    if(root) queue.push(root);
    while(queue.length) {
        const len = queue.length;
        let max = -Infinity; // 最大值
        for(let i = 0; i < len; i++){
            const node = queue.shift();
            max = Math.max(max, node.val);
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        res.push(max);
    }
    return res;
}
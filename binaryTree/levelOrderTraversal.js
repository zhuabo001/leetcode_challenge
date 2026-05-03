// 二叉树层序遍历模版
// 使用队列作为媒介来存放每一层的节点
// 遍历完一层后，将下一层的节点入队
// 直到队列为空
// 时间复杂度：O(n)
// 空间复杂度：O(n)
// 模版
const levelOrderTraversal = (root) => {
    const res = [];
    const queue = [];
    if(root) queue.push(root);
    while(queue.length) {
        const len = queue.length;
        const curLevel = []; // 存放当前层的节点
        for(let i = 0; i < len; i++){
            const node = queue.shift(); // 出队
            curLevel.push(node.val);
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        res.push(curLevel);
    }
    return res;
}
console.log(levelOrderTraversal([3, 9, 20, null, null, 15, 7]));
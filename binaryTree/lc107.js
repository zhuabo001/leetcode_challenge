// 自底向上的层序遍历
// 1. 遍历左子树
// 2. 遍历右子树
// 3. 访问根节点
// 后序遍历的顺序是：左 -> 右 -> 根
// 调整前序遍历的顺序，先将根节点入栈，然后将左子节点入栈，最后将右子节点入栈
// 这样反转中右左的顺序，就能得到后序遍历的结果
const postOrderIteration = (root) => {
    const res = []; // 结果数组
    const queue = []; // 队列, 用于存储节点
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
        res.unshift(curLevel);
    }
    return res;
}
console.log(postOrderIteration([3, 9, 20, null, null, 15, 7]));
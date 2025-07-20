// n叉树的层序遍历
// 给定一个 N 叉树，返回其节点值的层序遍历。 (即从左到右，逐层遍历)。
// 例如，给定一个 3叉树 :
// 返回其层序遍历:
// [
//      [1],
//      [3,2,4],
//      [5,6]
// ]
// 说明:
// 树的深度不会超过 1000。
// 树的节点总数不会超过 5000。
//
// 来源：力扣（LeetCode）
// 链接：
// 链接：URL_ADDRESScode.cn/problems/n-ary-tree-level-order-traversal
const levelOrder = (root) => {
    const res = []; // 结果数组
    const queue = []; // 队列, 用于存储节点
    if(root) queue.push(root);
    while(queue.length){
        const len = queue.length; // 当前层的节点数
        const curLevel = []; // 当前层的节点值
        for(let i = 0; i < len; i++){
            const node = queue.shift();
            curLevel.push(node.val);
            if(node.children) queue.push(...node.children);
        }
        res.push(curLevel);
    }
    return res;
}
// 二叉树的层平均值
// 给定一个非空二叉树, 返回一个由每层节点平均值组成的数组。
// 输入：
//     3
//    / \
//   9  20
//     /  \
//    15   7
// 输出：[3, 14.5, 11]
// 解释：
// 第 0 层的平均值是 3 ,  第1层是 14.5 , 第2层是 11 。因此返回 [3, 14.5, 11] 。
const averageOfLevels = function(root) {
  const res = [];
  const queue = [];
  if(root) queue.push(root);
  while(queue.length){
    const len = queue.length;
    let sum = 0;
    for(let i = 0; i < len; i++){
        const node = queue.shift();
        sum += node.val;
        if(node.left) queue.push(node.left);
        if(node.right) queue.push(node.right);
    }
    res.push(sum / len);
  }
  return res;
}
// 二叉树的右侧视图
// 给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined? null : right)
 * }
 */ 
// 层序遍历，当遍历到每一层的最后一个节点时进行判断，如果是最后一个节点就推入结果数组
const rightSideView = (root) => {
  const res = [];
  const queue = [];
  if(root) queue.push(root);
  while(queue.length){
    const len = queue.length;
    for(let i = 0; i < len; i++){
        const node = queue.shift();
        if(i === len - 1) {
            // 说明是最后一个节点
            res.push(node.val);
        }
        if(node.left) queue.push(node.left);
        if(node.right) queue.push(node.right);
    }
  }
  return res;
}
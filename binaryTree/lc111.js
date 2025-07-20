// 二叉树的最小深度
// 给定一个二叉树，找出其最小深度。
// 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
// 说明：叶子节点是指没有子节点的节点。
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined? null : left)
 *     this.right = (right===undefined? null : right)
 * }
 */
const minDepth = function (root) {
  let depth = 0;
  const queue = [];
  if(root) queue.push(root);
  while(queue.length){
    const len = queue.length;
    depth++;
    for(let i = 0; i < len; i++){
        const node = queue.shift();
        if(!node.left && !node.right) return depth; // 如果是叶子节点，返回当前深度
        if(node.left) queue.push(node.left);
        if(node.right) queue.push(node.right);
    }
  }
  return depth;
}
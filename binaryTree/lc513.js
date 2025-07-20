// 找树左下角的值
// 给定一个二叉树，在树的最后一行找到最左边的值。
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * */
// 递归法： 找深度最大的叶子节点 + 前序遍历保证优先左边搜索 = 此时就是树的最后一行最左边的值
// 递归三部曲：
// 1. 确定递归函数的参数和返回值
// 参数：需要二叉树的根节点，还有就是一个int型的变量用来记录最长深度。 这里就不需要返回值了，所以递归函数的返回类型为void。
// 本题还需要类里的两个全局变量，maxLen用来记录最大深度，result记录最大深度最左节点的数值。
// 2. 确定终止条件
// 当遇到叶子节点的时候，就需要统计一下最大的深度了，所以需要遇到叶子节点来更新最大深度。
// 3. 确定单层递归的逻辑
// 当遇到叶子节点的时候，就需要统计一下最大的深度了，所以需要遇到叶子节点来更新最大深度。
// 如果该节点的深度大于maxDepth（目前的最大深度），则更新maxDepth。
// 因为在找最大深度的时候，最后一个遍历的节点一定是深度最大的节点（因为从上到下的遍历顺序）。
// 那么当遍历到深度最大的叶子节点的时候，maxDepth（目前的最大深度）就会等于depth（节点深度）。
// 所以当遍历到深度最大的叶子节点的时候，直接记录节点的值。
// 代码如下：
/**
 * @param {TreeNode} root
 * @return {number}
 */
const findBottomLeftValue = function(root) {
  let maxDepth = -Infinity;
  let leftValue = 0;
  const traversal = (node, depth) => {
    if(!node.left && !node.right) {
        if(depth > maxDepth) {
            maxDepth = depth;
            leftValue = node.val;
        }
    }
    if(node.left) {
        depth++;
        traversal(node.left, depth);
        depth--;
    }
    if(node.right) {
        depth++;
        traversal(node.right, depth);
        depth--;
    }
  } 
  traversal(root, 0);
  return leftValue;
}
// 时间复杂度O(n) 算法需要访问二叉树中的每一个节点来找到最深层的最左边节点
// 空间复杂度O(logn) - 平衡二叉树 ：h = O(log n)，空间复杂度为 O(log n)
// - 完全不平衡的树 （退化为链表）：h = O(n)，空间复杂度为 O(n)

// 迭代法： 层序遍历，记录最后一行第一个节点的数值
const findBottomLeftValue2 = function(root) {
   const queue = [root];
   let res = 0;
   while(queue.length) {
      const len = queue.length;
      for(let i = 0; i < len; i++){
        const node = queue.shift();
        if(i === 0/**第一个节点 */) {
            res = node.val;
        }
        if(node.left) queue.push(node.left);
        if(node.right) queue.push(node.right);
      }
   }
   return res;
}
// 时间复杂度O(n)
// 空间复杂度O(n)
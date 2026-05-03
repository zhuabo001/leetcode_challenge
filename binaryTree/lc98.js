// 验证二叉搜索树
// 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
// 有效 二叉搜索树定义如下：
// 节点的左子树只包含 小于 当前节点的数。
// 节点的右子树只包含 大于 当前节点的数。
// 所有左子树和右子树自身必须也是二叉搜索树。
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  // 先利用中序遍历将树转换成数组
  const arr = [];
  const traversal = (root) => {
    if(!root) return [];
    traversal(root.left);
    arr.push(root.val);
    traversal(root.right);
  }

  traversal(root);
  // 然后判断数组是否是升序的

  for(let i = 1; i < arr.length; i++){
    if(arr[i] <= arr[i - 1]/**二叉搜索树也不能有两个节点数值相同的情况 */) {
        return false;
    }
  }
  return true;
}
// 时间复杂度O(n)
// 空间复杂度O(n)： 最好是O(logn), 最坏是O(n）
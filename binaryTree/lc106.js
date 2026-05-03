// 从中序和后序遍历的序列构建二叉树
// 输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
// 输出：[3,9,20,null,null,15,7]

/**
 * tips
 * 如何根据两个顺序构造一个唯一的二叉树？
 * 1. 后序遍历的最后一个元素是根节点
 * 2. 在中序遍历中找到根节点的位置，根节点的左边是左子树，右边是右子树
 * 3. 递归构造左子树和右子树
 * 4. 递归的终止条件是中序遍历为空
 */

function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}
const buildTree = function (inorder, postorder) {
  if(postorder.length === 0) return null;
  if(postorder.length === 1) return new TreeNode(postorder[0]);
  // 如果后序数组不为空，那取后序数组的最后一个元素当作本轮的根节点
  const rootVal = postorder.pop();
  // 找到根节点在中序数组中的位置
  const index = inorder.indexOf(rootVal);
  // 构造根节点
  const root = new TreeNode(rootVal);
  // 递归构造左子树
  root.left = buildTree(inorder.slice(0, index/**[0, index)形成左的中序数组*/), postorder.slice(0, index/**[0, inde) 形成后序的左数组 */)); 
  // 后序的左子树postOrder[0, index)相当于左子树的后序遍历结果
  // 递归构造右子树
  root.right = buildTree(inorder.slice(index + 1/**[index + 1, ] */), postorder.slice(index/** [index, ] */));
  // 后序的右子树postOrder[index, ]相当于右子树的后序遍历结果
  return root;
}
// 关键洞察
/**
 * 为什么后序数组也用 index 来分割？
 * 因为 左子树的节点数量在中序和后序遍历中是相同的 ：
 * 中序左子树有 index 个节点
 * 后序左子树也应该有 index 个节点
 * 所以后序数组的前 index 个元素就是左子树的后序遍历
 */
// 时间复杂度O(n^2): 每次递归需要O(n)的时间来找到根节点在中序数组中的位置
// 递归需要O(n)的时间来构造左子树和右子树
// 空间复杂度O(n): 递归需要O(n)的空间来存储递归栈
// 优化：使用哈希表来存储中序数组中每个元素的位置，这样可以将时间复杂度优化到O(n)

// 优化
const buildTreeMap = function (inorder, postorder) {
    // 使用 Map 存储中序遍历中每个值的索引位置
    const inorderMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
        inorderMap.set(inorder[i], i);
    }
    
    function build(inStart, inEnd, postStart, postEnd) {
        if (inStart > inEnd) return null;
        
        // 后序遍历的最后一个元素是根节点
        const rootVal = postorder[postEnd];
        const root = new TreeNode(rootVal);
        
        // O(1) 时间查找根节点在中序遍历中的位置
        const rootIndex = inorderMap.get(rootVal);
        
        // 计算左子树的节点数量
        const leftSize = rootIndex - inStart;
        // 为什么后序数组也用 leftSize 来分割？
        // 因为左子树的节点数量在中序和后序遍历中是相同的：
        
        // 中序遍历：[左子树] [根] [右子树]
        // 后序遍历：[左子树] [右子树] [根]
        // 如果左子树有 leftSize 个节点，那么：
        
        // 后序数组的前 leftSize 个元素：[postStart, postStart + leftSize - 1] 就是左子树
        // 后序数组的中间部分：[postStart + leftSize, postEnd - 1] 就是右子树
        // 后序数组的最后一个元素：postEnd 就是根节点
        root.left = build(inStart, rootIndex - 1, postStart, postStart + leftSize - 1);
        root.right = build(rootIndex + 1, inEnd, postStart + leftSize, postEnd - 1);
        
        return root;
    }
    
    return build(0, inorder.length - 1, 0, postorder.length - 1);
};
// 时间复杂度O(n)
// 空间复杂度O(n)



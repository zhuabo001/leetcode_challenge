// 最大二叉树
// 给定一个不含重复元素的整数数组 nums 。一个以此数组直接递归构建的 最大二叉树 定义如下：
// 二叉树的根是数组 nums 中的最大元素。
// 左子树是通过数组中 最大值左边部分 递归构造出的最大二叉树。
// 右子树是通过数组中 最大值右边部分 递归构造出的最大二叉树。
// 返回有给定数组 nums 构建的 最大二叉树 。
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
// 递归：
// 1. 递归函数的参数和返回值
// 参数：数组 nums
// 返回值：构建出的节点
// 2. 递归函数的终止条件
// 如果数组长度为1，说明构建了叶子节点，返回该叶子节点
// 3. 单层递归的逻辑
// 找到数组中的最大值，构建节点
// 递归构建左子树
// 递归构建右子树
// 返回节点
const constructMaximumBinaryTree = function(nums) {
    const node = new TreeNode(0);
    // code here
    // 当传入数组长度为1时，返回该节点，代表此时到了构造叶子节点的时刻
    if(nums.length === 1) {
        node.val = nums[0];
        return node;
    }
    // 找到数组中的最大值
    let maxVal = 0, maxValIndex = 0;
    for(let i = 0; i < nums.length; i++){
        if(nums[i] > maxVal){
            maxVal = nums[i];
            maxValIndex = i;
        }
    }
    // 构建节点
    node.val = maxVal;
    // 在最大值的左区间递归构建左子树
    if(maxValIndex > 0) {
        node.left = constructMaximumBinaryTree(nums.slice(0, maxValIndex));
    }
    // 在最大值的右区间递归构建右子树
    // 为什么不用 maxValIndex < nums.length
    // 因为 maxValIndex 永远不可能等于 nums.length （数组索引最大是 nums.length - 1 ）
    // 所以 maxValIndex < nums.length 这个条件永远为真，没有意义
    if(maxValIndex < nums.length - 1/**这个条件是为了判断 最大值的右边是否还有元素 */) {
        // 如果 maxValIndex = nums.length - 1 ，说明最大值在数组的 最后一个位置
        // 此时最大值右边没有任何元素，不需要构建右子树
        // 如果 maxValIndex < nums.length - 1 ，说明最大值 不在最后位置 ，右边还有元素
        node.right = constructMaximumBinaryTree(nums.slice(maxValIndex + 1));
    }
    return node;
}
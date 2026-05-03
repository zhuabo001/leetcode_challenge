// 修剪二叉搜索树
// 给你二叉搜索树的根节点 root ，同时给定最小边界low 和最大边界 high。通过修剪二叉搜索树，使得所有节点的值在[low, high]中。
// 修剪树不应该改变保留在树中的元素的相对结构（即，如果没有被移除，原有的父代子代关系都应当保留）。 可以证明，存在唯一的答案。
// 所以结果应当返回修剪好的二叉搜索树的新的根节点。注意，根节点可能会根据给定的边界发生改变。
// 输入：root = [1,0,2], low = 1, high = 2
// 输出：[1,null,2]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */
const trimBST = (root, low, high) => {
    // 1. 确定递归函数的参数和返回值
    // 返回值的作用：它让每个递归调用都能向上级汇报"我这个子树修剪后的新根节点是谁"
    // 上级收到这个信息后，用新根节点更新自己的子指针
    // 2. 确定终止条件： 遇到空节点返回即可
    // 单层递归逻辑
    if(!root) return null;
    // 情况1：当前节点值小于下界
    if(root.val < low) {
        //  当前节点及其左子树都需要被修剪掉
        // 只保留右子树中可能符合条件的部分
        const right = trimBST(root.right, low, high);
        return right;
    }
    // 情况2：当前节点值大于上界
    if(root.val > high) {
        // 当前节点及其右子树都需要被修剪掉
        // 只保留左子树中可能符合条件的部分
        const left = trimBST(root.left, low, high);
        return left;
    }
    // 情况3：当前节点值在范围内
    // 递归修剪左右子树（因为子树节点值不一定在区间内）
    /**在修剪过程中，原来的左子树可能发生以下变化：
     * 原左子树根节点被删除 ：如果 root.left 的值超出 [low, high] 范围，它会被删除，返回值可能是它的左子树或右子树
     * 子树内部节点被删除 ：子树内部的某些节点可能被修剪掉，导致子树结构重组
     * 子树保持不变 ：如果左子树所有节点都在范围内，返回值就是原来的左子树 */
    /**
     * 如果没有返回值，我们无法知道：
     * 修剪后的子树的新根节点是什么
     * 修剪后的子树的新根节点需要如何连接到父节点
     * 子树的结构发生了什么变化
     */
    // 接收左子树修剪后的新根节点
    root.left = trimBST(root.left, low, high);
    root.right = trimBST(root.right, low, high);
    //将当前节点作为新的子树根节点返回给上层；上层说的是上一层递归，例如第三层递归的返回值被返回给第二层，此时就是所谓的返回给上层
    return root;
}
// 时间复杂度：O(n)
// - 最坏情况 ：需要访问树中的每个节点
// - 最好情况 ：如果根节点就超出范围，可能只访问部分节点
// - 平均情况 ：O(n)，其中 n 是树中节点的总数
// 空间复杂度：O(h)
// - 递归调用栈的深度 等于树的高度 h
// - 最坏情况 ：O(n)（完全倾斜的树）
// - 最好情况 ：O(log n)（完全平衡的树）
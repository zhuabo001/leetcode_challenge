// 二叉树的所有路径
// 给你一个二叉树的根节点 root ，按 任意顺序 ，返回所有从根节点到叶子节点的路径。
// 叶子节点 是指没有子节点的节点。
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined? null : left)
 *     this.right = (right===undefined? null : right)
 * }
 * */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
const binaryTreePaths = function(root) {
    if(!root) return [];
    const res = [];
    const path = [];
    const dfs = (node) => {
        // 将当前节点加入路径
        path.push(node.val);
        // 如果当前节点是叶子节点，将路径加入结果数组
        if(!node.left && !node.right) {
            res.push(path.join('->'));
        } else {
            // 如果当前节点不是叶子节点，递归遍历左子树和右子树
            node.left && dfs(node.left);
            node.right && dfs(node.right);
        }
        // 回溯，将当前节点从路径中移除
        path.pop();
    }
    dfs(root);
    return res;
}
// 时间复杂度O(n^2): - 每个节点访问一次：O(N)
// - 每次到达叶子节点时，需要 O(N) 时间构造路径字符串
// 空间复杂度O(n)

// 迭代法
const binaryTreePathsIteration = function(root) {
    if (!root) return [];
    
    const result = [];
    const nodeStack = [root];           // 节点栈
    const pathStack = [root.val + ''];  // 路径栈，存储字符串, 每个进入nodeStack的节点都有自己对应的路径字符串
    
    while (nodeStack.length > 0) {
        // 同时弹出节点和对应的路径
        const currentNode = nodeStack.pop();
        const currentPath = pathStack.pop();
        
        // 如果是叶子节点，将路径加入结果
        if (!currentNode.left && !currentNode.right) {
            /**
             * - 栈弹出叶子节点时，对应的路径字符串已经是完整的从根到叶的路径
             * - 路径的构建和节点的访问是同步的
             */
            result.push(currentPath);
        }
        /**
         * - 栈的特性 ：后进先出（LIFO）
         * - 期望顺序 ：先处理左子树，再处理右子树
         * - 实现方式 ：先入栈右子树，再入栈左子树
         */
        // 处理右子树（先入栈，后处理）
        if (currentNode.right) {
            nodeStack.push(currentNode.right);
            pathStack.push(currentPath + '->' + currentNode.right.val);
        }
        
        // 处理左子树（后入栈，先处理）
        if (currentNode.left) {
            nodeStack.push(currentNode.left);
            pathStack.push(currentPath + '->' + currentNode.left.val);
        }
    }
    
    return result;
};
// 时间复杂度O(n^2): n个节点，每个节点访问一次：O(N)
// - 每次到达叶子节点时，需要 O(N) 时间构造路径字符串
// 空间复杂度O(n^2): 栈的空间 + 路径字符串总长度
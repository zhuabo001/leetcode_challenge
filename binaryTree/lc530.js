// 530. 二叉搜索树的最小绝对差
// 给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。
// 差值是一个正数，其数值等于两值之差的绝对值。
/**
 * @param {TreeNode} root
 * @return {number}
 */
const getMinDiff = (root) => {
    const arr = [];
    const traversal = (node) => {
        if(!node) return;
        traversal(node.left);
        arr.push(node.val);
        traversal(node.right);
    }
    traversal(root);
    let minDiff = Infinity;
    for(let i = 1; i < arr.length; i++){
        // 其实本来应该是i、j两个变量去遍历计算差值，但是对于一个节点来说非相邻差值的绝对值一定比相邻的差值的绝对值大
        if(minDiff > Math.abs(arr[i] - arr[i - 1])){
            minDiff = Math.abs(arr[i] - arr[i - 1]);
        }
    }
    return minDiff;
}
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 优化版本
const getMinDiffBetter = (root) => {
    let minDiff = Infinity;
    let pre = null;
    const traversal = (node) => {
        if(!node) return;
        traversal(node.left);
        if(pre !== null){
            minDiff = Math.min(minDiff, Math.abs(node.val - pre.val));
        }
        pre = node;
        traversal(node.right);
    }
    traversal(root);
    return minDiff;
}
// 时间复杂度：O(n)
// 空间复杂度：O(1)

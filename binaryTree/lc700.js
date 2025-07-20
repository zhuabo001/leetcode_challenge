// 二叉搜索树中的搜索
// 给定二叉搜索树（BST）的根节点和一个值。 你需要在BST中找到节点值等于给定值的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 NULL。
// 输入：root = [4,2,7,1,3], val = 2
// 输出：[2,1,3]
var searchBST = function (root, val) {
    if(!root || root.val === val) return root;
    if(root.val > val) return searchBST(root.left, val);
    if(root.val < val) return searchBST(root.right, val);
}
// 时间复杂度O(n)
// 空间复杂度O(n)
// 优化：可以使用迭代的方法来实现
const searchBSTIterration = function (root, val) {
    while(root){
        if(root.val === val) return root;
        if(root.val > val) root = root.left;
        if(root.val < val) root = root.right;
    }
    return null;
}
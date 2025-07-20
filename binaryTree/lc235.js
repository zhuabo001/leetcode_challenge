// 二叉搜索树中的最近公共祖先
// 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
// 最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
// 例如，给定如下二叉搜索树:  root = [6,2,8,0,4,7,9,null,null,3,5]
// 输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
// 输出: 6 
// 解释: 节点 2 和节点 8 的最近公共祖先是 6。
// 输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
// 输出: 2
// 解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。
function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}
// 遍历二叉搜索树的时候就是寻找区间[p->val, q->val]（注意这里是左闭右闭），也就是本题的目的
const lowestCommonAncestor = (root, p, q) => {
    // 情况1：当前节点值大于p和q的值， 向左遍历，说明此时p和q在左子树上
    if(root.val > p.val && root.val > q.val){
        return lowestCommonAncestor(root.left, p, q);
    }
    // 情况2：当前节点值小于p和q的值 ， 需要向右遍历，说明此时p和q在右子树上
    if(root.val < p.val && root.val < q.val){
        return lowestCommonAncestor(root.right, p, q);
    }
    // 情况3：当前节点就是最近公共祖先
    // 当我们从上向下去递归遍历，第一次遇到 cur节点是数值在[q, p]区间中，那么cur就是 q和p的最近公共祖先
    return root;
}
// - 时间复杂度： O(h)，其中h是树的高度
// - 空间复杂度： O(h)，递归调用栈的深度
// - 高效性： 利用BST性质，每次递归都能排除一半的搜索空间
// 二叉搜索树的插入操作
// 给定二叉搜索树（BST）的根节点 root 和要插入树中的值 value ，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。 输入数据 保证 ，新值和原始二叉搜索树中的任意节点值都不同。
// 输入：root = [4,2,7,1,3], val = 5
// 输出：[4,2,7,1,3,5]
// 解释：另一个满足题目要求可以通过的树是：
// 输入：root = [40,20,60,10,30,50,70], val = 25
// 输出：[40,20,60,10,30,50,70,null,null,25]
// 解释：[40,20,60,10,30,50,70]
// 输入：root = [40,20,60,10,30,50,70], val = 75
// 输出：[40,20,60,10,30,50,70,null,null,25,75]
function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}
const insertIntoBST = (root, val) => {
    // 终止条件当遇到空节点时，创建新的TreeNode并返回
    if(!root) {
        return new TreeNode(val);
    }
    // 利用BST性质，根据值的大小决定插入方向
    if(root.val > val) {
        // 如果val小于当前节点的数值，就要用root.left接住
        root.left = insertIntoBST(root.left, val); 
        // 用递归返回值更新子节点指针
    }
    if(root.val < val) {
        // 如果val大于当前节点的数值，就要用root.right接住
        root.right = insertIntoBST(root.right, val);
    }
    return root; // 返回根节点 
}
// - 时间复杂度： O(h)，其中h是树的高度
// - 空间复杂度： O(h)，递归调用栈的深度

// 使用迭代法：
const insertIntoBSTIteration = (root, val) => {
    // 特殊情况处理
    if(!root) {
        return new TreeNode(val);
    }
    let cur = root; // 当前遍历到的节点
    let parent = null; // 用于记录父节点的指针
    // 遍历找到合适的位置
    while(cur) {
        parent = cur; // 记录父节点
        if(cur.val > val) {
            cur = cur.left; // 向左子树移动
        }
        if(cur.val < val) {
            cur = cur.right; // 向右子树移动
        }
    }
    // 找到合适的位置后，创建新节点插入
    if(parent.val > val) {
        parent.left = new TreeNode(val);
    }
    if(parent.val < val) {
        parent.right = new TreeNode(val);
    }
    return root;
}
// 迭代法虽然代码稍长，但在处理大型BST时具有更好的空间效率和性能表现
// - 时间复杂度： O(h)，其中h是树的高度
// - 空间复杂度： O(1)

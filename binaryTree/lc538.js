// 二叉搜索树转换为累加树
// 给出二叉 搜索 树的根节点，该树的节点值各不相同，请你将其转换为累加树（Greater Sum Tree），使每个节点 node 的新值等于原树中大于或等于 node.val 的值之和。
// 提醒一下，二叉搜索树满足下列约束条件：
// 节点的左子树仅包含键 小于 节点键的节点。
// 节点的右子树仅包含键 大于 节点键的节点。
// 左右子树也必须是二叉搜索树。
// 输入：[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
// 输出：[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
/**
 * 思路：递归
 * 递归函数：入参为树节点，返回值为累加值
 * 递归终止条件：节点为空时，返回0
 * 单层递归逻辑：先递归右子树，计算右子树的累加值，
 *             然后用当前节点值加上右子树累加值，得到当前节点的累加值，
 *             再递归左子树，计算左子树的累加值，
 *             最后返回当前节点的累加值
 */
// 累加树的定义是：每个节点的新值 = 所有大于等于该节点值的节点值之和

// 这意味着我们需要从 大到小 的顺序来处理节点，这样才能正确累加所以决定反向中序遍历（右根左）
const covertFromBST = (root) => {
    let preSum = 0;
    const traversal = (node) => {
        if(!node) return;
        // 1. 先访问右子树（右子树的值比较大）
        traversal(node.right);
        // 2. 访问当前节点，更新累加值；
        preSum += node.val;
        node.val = preSum; // 更新当前节点值
        // 3. 访问左子树
        traversal(node.left);
    }
    traversal(root);
    return root;
}
// 时间复杂度O(n)：每个节点都要遍历一次所以是O(n)， 每次单节点操作是o(1)
// 空间复杂度O(n)：递归栈的深度
// - 最深递归深度 = 树的高度 h
// - 每层递归需要常数空间存储局部变量
// - 总栈空间：O(h)

// 使用迭代法进行中序遍历
function convertBSTIterative(root) {
    if (!root) return root;
    
    let sum = 0;
    const stack = [];
    let current = root;
    
    // 反向中序遍历：右-根-左
    while (current || stack.length > 0) {
        // 1. 先走到最右边的节点
        while (current) {
            stack.push(current);
            current = current.right;
        }
        
        // 2. 处理当前节点
        current = stack.pop();
        sum += current.val;
        current.val = sum;
        
        // 3. 转向左子树
        current = current.left;
    }
    
    return root;
}
// 虽然复杂度并没有得到什么优化，但是在实际使用中，实际使用内存比递归少很多，并且栈溢出风险小很多

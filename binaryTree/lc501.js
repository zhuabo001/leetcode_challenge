// 501. 二叉搜索树中的众数
// 给你一个含重复值的二叉搜索树（BST）的根节点 root ，找出并返回 BST 中的所有 众数（即，出现频率最高的元素）。
// 如果树中有不止一个众数，可以按 任意顺序 返回。  
// 输入：root = [1,null,2,2]
// 输出：[2] 
// 进阶：你可以不使用额外的空间吗？（假设由递归产生的隐式调用栈的开销不被计算在内）
const findMode = (root) => {
    // 中序遍历二叉搜索树
    let count = 0; // 用于记录频率
    let maxCount = 0; // 用于记录最大频率
    const res = [];
    let pre = root; // 用于遍历节点与当前节点进行比较用
    const traversal = (cur) => {
        // 递归终止条件
        if(!cur) return;
        // 进行中序遍历
        // 遍历左子树
        traversal(cur.left);
        // 中间处理节点的逻辑
        if(pre.val === cur.val) {
            count++;
        } else {
            count = 1;
        }
        pre = cur;
        if(count === maxCount) {
            res.push(cur.val);
        }
        if(count > maxCount) {
            res.length = 0;// 这一步很重要；若当前频率值大于最大频率值，清空res数组，否则res数组中存放的都是当前频率值的众数
            maxCount = count; 
            res.push(cur.val);
        }
        // 遍历右子树
        traversal(cur.right);
    }
    traversal(root);
    return res;

}
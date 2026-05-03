// 删除二叉搜索树中的指定节点
// 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。
// 思路：
// 1. 搜索待删除节点：从根节点开始，利用二叉搜索树的性质（左子树节点值 < 根节点值 < 右子树节点值）进行搜索。
// 2. 处理待删除节点的情况：
//    a. 待删除节点无左子：其右子顶替其位置，删除了该节点。
//    b. 待删除节点无右子：其左子顶替其位置，删除了该节点。
//    c. 待删除节点左右子都有：其左子树转移到其右子树的最左节点的左子树上，然后右子顶替其位置，由此删除了该节点。
// 3. 返回根节点：如果删除的是根节点，返回更新后的根节点；如果不是根节点，返回原根节点。
// 
function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}
const deleteNode = (root, key) => {
    // 如果root为空，直接返回
    const traversal = (node, key) => {
        // 1. 没找到要删除的节点， 遍历到空节点直接返回
        if(!node) {
            return node;
        }
        if(node.val === key) {
            // 找到了要删除的节点
            // 2. 该节点为叶子节点， 左右都为空，直接删除节点即可
            if(!node.left && !node.right) {
                return null;
            }
            // 3.删除节点左孩子为空但是右孩子不为空，右孩子的根节点补位
            if(!node.left && node.right) {
                return node.right;
            }
            // 4.删除节点右孩子为空但是左孩子不为空，左孩子的根节点补位
            if(node.left && !node.right) {
                return node.left;
            }
            // 5.删除节点左右孩子都不为空，左子树转移到右子树的最左节点的左子树上，然后右子顶替其位置，由此删除了该节点
            if(node.left && node.right) {
                let cur = node.right;
                while(cur.left) {
                    cur = cur.left; // 找到右子树的最左节点
                }
                cur.left = node.left; // 待删除节点的左子树转移到右子树的最左节点的左子树上
                return node.right;
            }
        }
         if(node.val < key) {
            node.right = traversal(node.right, key);
         } 
         if(node.val > key) {
            node.left = traversal(node.left, key);
         }
         return node;
    }
    return traversal(root, key);
  
}
// 时间复杂度：O(h)，其中h为树的高度，最坏情况下，树为链表，h=n
// 空间复杂度：O(h)，递归调用栈的深度

// 108. 将有序数组转换为二叉搜索树
// 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。
// 高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。
function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
// 递归三部曲
// 1. 确定递归函数的参数（排序后的数组以及左右边界）和返回值（这里的返回值依然是新构造出的bst的根节点）
// 2. 确定递归终止条件： 左闭右闭区间，当left > right时，此时没有符合要求的节点了，返回null
// 3. 确定单层递归逻辑 a. 先取数组中间位置 
//                   b. 接着划分区间，root的左孩子接住下一层左区间的构造节点，右孩子接住下一层右区间构造的节点
const sortedArrayToBST = (nums) => {
    const traversal = (nums, left, right) => {
        if(left > right) return null;
        const mid = left + Math.floor((right - left) / 2);
        const root = new TreeNode(nums[mid]);
        root.left = traversal(nums, left, mid - 1);
        root.right = traversal(nums, mid + 1, right);
        return root;
    }
    return traversal(nums, 0, nums.length - 1);
}

/**
 * 时间复杂度：O(n)
- 每个数组元素都会被访问一次来创建对应的树节点
- 总共有 n 个节点，每个节点的创建时间为 O(1)
- 因此总时间复杂度为 O(n)
 */
/**
 * 空间复杂度：O(log n)
- 递归调用栈 ：由于构造的是高度平衡的BST，树的高度为 O(log n)，因此递归深度为 O(log n)
- 输出空间 ：虽然最终的BST占用 O(n) 空间，但这通常不计入空间复杂度分析
- 因此空间复杂度为 O(log n)
 */
// 对称二叉树
// 给定一个二叉树，检查它是否是镜像对称的。
// 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3 
// 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
//     1
//    / \
//   2   2
//    \   \
//    3    3
// 进阶：
// 你可以运用递归和迭代两种方法解决这个问题吗？
// 递归法
const isSymmetric = function(root) {
    if(!root) return true;
    return compare(root.left, root.right);
}
const compare = (left, right) => {
    // 首先排除空节点的情况
    if(left !== null && right === null) {
        return false;
    } else if(left === null && right !== null){
        return false;
    } else if(left === null && right === null){
        return true;
    } else if(left.val !== right.val){
        return false;
    }
    // 此时就是：左右节点都不为空，且数值相同的情况
    // 此时才做递归，做下一层的判断
    const outside = compare(left.left, right.right); // 左子树：左、 右子树：右
    const inside = compare(left.right, right.left); // 左子树：右、 右子树：左
    return outside && inside; // 左子树：中、 右子树：中 （逻辑处理）
}
// 时间复杂度O(n)
// 空间复杂度O(n)
// 迭代法 —— 使用队列
const isSymmetric1 = function(root) {
    if(!root) return true;
    const queue = [];
    queue.push(root.left);
    queue.push(root.right);
    while(queue.length){
        const leftNode = queue.shift();
        const rightNode = queue.shift();
        if(!leftNode && !rightNode) {
            continue;
        }
        // 如果有一个为空或者两个节点的值不相等，返回false
        if(!leftNode || !rightNode || leftNode.val !== rightNode.val) {
            return false;
        }
        /**
         * 由于我们每次从队列中取出两个节点进行比较（ queue.shift() 两次），
         * 所以入队时也必须成对入队，确保取出的两个节点是需要比较的对称节点。
         */
        queue.push(leftNode.left); // 必须先对比外侧再对比内侧， 不然会有错
        queue.push(rightNode.right);
        queue.push(leftNode.right);
        queue.push(rightNode.left);
    }
    return true;
}
// 迭代法 —— 使用栈
const isSymmetric2 = function(root) {
    if(!root) return true;
    const stack = [];
    stack.push(root.left);
    stack.push(root.right);
    while(stask.length){
        const rightNode = stack.pop();
        const leftNode = stack.pop(); // 这里是和使用队列不一样的地方
        // 这里和使用队列不一样的地方在于我们把左右两个节点都加入到栈中，
        // 所以出栈的时候也是成对成对的
        // 如果有一个为空或者两个节点的值不相等，返回false
        if(!leftNode && !rightNode) {
            continue;
        }
        if(!leftNode || !rightNode || leftNode.val !== rightNode.val) {
            return false;
        }
        stack.push(leftNode.left);
        stack.push(rightNode.right);
        stack.push(leftNode.right);
        stack.push(rightNode.left);
    }
    return true;
}   
// 时间复杂度O(n)
// 空间复杂度O(n)
// 迭代法遍历二叉树
// 前序遍历
// 1. 访问根节点
// 2. 遍历左子树
// 3. 遍历右子树
// 前序遍历的顺序是：根 -> 左 -> 右
// 先将根节点入栈，然后将右子节点入栈，最后将左子节点入栈
// 这样出栈的时候，就会先访问左子节点，然后再访问右子节点
const preOrderIteration = (root) => {
    const res = []; // 结果数组
    const stack = []; // 栈, 用于存储节点
    if(root) stack.push(root);
    while(stack.length) {
        const node = stack.pop();
        res.push(node.val);
        if(node.right) stack.push(node.right);
        if(node.left) stack.push(node.left);
    }
    return res;
}   

// 中序遍历
// 1. 遍历左子树
// 2. 访问根节点
// 3. 遍历右子树
// 中序遍历的顺序是：左 -> 根 -> 右
// 先将根节点入栈，然后将左子节点入栈（不断将左子节点入栈，直到左子节点为空）
// 这样出栈的时候，就会先访问左子节点，然后再访问根节点
// 中序遍历需要先找到最左的节点
const inOrderIteration = (root) => {
    const res = []; // 结果数组
    const stack = []; // 栈, 用于存储节点
    let cur = root; // 当前节点，使用指针可以帮助我们在不改变原树结构的情况下，灵活地移动和追踪当前正在处理的节点
    // 使用指针可以在遍历过程中保持对当前节点的饮用，同时不会丢失对原始根节点的引用
    while(cur || stack.length){
        while(cur) {
            stack.push(cur);
            cur = cur.left;
        } 
        // 此时cur为null，说明已经遍历到左子树的最左节点
        // 此时出栈，访问节点
        const node = stack.pop();
        res.push(node.val);
        // 然后将cur指向右子节点
        cur = node.right; // 我们需要访问的是刚刚从栈中弹出的节点的右子树
    }
    return res;
}
/**
 * 不用栈实现中序遍历
 * @param {*} root 
 * @returns 
 */

// 2. **处理节点1**：
// - 检查节点1是否有左子树 -> 没有
// - 因为没有左子树，直接访问节点1的值
// - 执行 `cur = cur.right`
// - 因为之前建立了线索，所以 `cur.right` 指向的是节点2
// - 这样 `cur` 就自然而然地回到了节点2

// 3. **回到节点2后**：
// - 发现节点2的前驱节点（节点1）的右指针指向自己
// - 说明左子树已经访问完成
// - 断开线索（将节点1的右指针恢复为null）
// - 访问节点2
// - 继续处理右子树（节点3）

// 所以，关键点在于：
// 1. 在第一次访问节点2时，我们建立了线索：将节点1的右指针指向了节点2
// 2. 这个线索就像一个"回程票"，当我们处理完节点1后，通过这个线索就能直接回到节点2
// 3. 这就避免了使用栈来保存父节点信息
// 4. 当我们第二次访问到节点2时，发现有线索指向自己，就知道左子树已经处理完了，可以断开线索并继续处理右子树

// 这就是Morris遍历的巧妙之处：利用树中的空闲指针（叶子节点的右指针）来临时存储遍历路径的信息，达到了空间复杂度O(1)的目标。
const inOrderIteration2 = (root) => {
    const res = []; // 结果数组
    const cur = root; // 当前节点
    while(cur){
        if(!cur.left){
            res.push(cur.val); // 访问节点
            cur = cur.right; // 转向右子树
        } else {
            // 找到当前节点的前驱节点（当前节点左子树的最右节点）
            let predecessor = cur.left;
            while(predecessor.right && predecessor.right !== cur){
                // 找到最右节点
                predecessor = predecessor.right;
            }
            if(!predecessor.right) {
                // 第一次访问 建立线索
                predecessor.right = cur;
                cur = cur.left;
            } else {
                // 第二次访问 撤销线索
                predecessor.right = null;
                res.push(cur.val); // 访问节点
                cur = cur.right; // 转向右子树
            }
        }
    }
    return res;
}

// 后序遍历
// 1. 遍历左子树
// 2. 遍历右子树
// 3. 访问根节点
// 后序遍历的顺序是：左 -> 右 -> 根
// 调整前序遍历的顺序，先将根节点入栈，然后将左子节点入栈，最后将右子节点入栈
// 这样反转中右左的顺序，就能得到后序遍历的结果
const postOrderIteration = (root) => {
    const res = [];
    const stack = [];
    if(root) stack.push(root);
    while(stack.length){
        const node = stack.pop();
        res.push(node.val);
        if(node.left) stack.push(node.left);
        if(node.right) stack.push(node.right);
    }
    return res.reverse();
}
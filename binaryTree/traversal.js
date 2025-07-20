// 二叉树前序遍历
const preOrder = (root, res) => {
    if(!root) return;
  res.push(root.val);
  root.left && preOrder(root.left, res);
  root.right && preOrder(root.right, res);
};
const traverseTree = (root) => {
    const res = [];
    preOrder(root, res);
    return res;
}
console.log(traverseTree([1, null, 2, 3]));

// 二叉树中序遍历
const inOrder = (root, res) => {
    if(!root) return;
    root.left && inOrder(root.left, res);
    res.push(root.val);
    root.right && inOrder(root.right, res);
}

// 二叉树后序遍历
const postOrder = (root, res) => {
    if(!root) return;
    root.left && postOrder(root.left, res);
    root.right && postOrder(root.right, res);
    res.push(root.val);
};


// 114. 二叉树展开为链表
// 给你二叉树的根结点 root ，请你将它展开为一个单链表：
// 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
// 展开后的单链表应该与二叉树 先序遍历 顺序相同。（根左右）
// 思路：后续遍历递归解法
// 如果我们不先递归处理子树，直接操作当前节点：
// - 左子树和右子树还是树形结构，不是链表
// - 我们无法知道左子树展开后的"尾节点"在哪里
// - 就无法正确地将右子树连接到左子树的末尾
const flatten = (root) => {
  if (!root) return;
  // 1. 先将左子树展开为链表
  flatten(root.left);
  // 2. 再将右子树展开为链表
  flatten(root.right);
  // 3. 将展开的左子树拼到root的右子树位置
  const left = root.left;
  const right = root.right;
  root.left = null;
  root.right = left;
  // 4. 将展开的右子树拼到展开的左子树的最右边
  let p = root; // 指向跟节点的指针开始遍历找到此时的root.right的最右侧（原先的root.left）
  while (p.right) {
    p = p.right;
  }
  p.right = right;
  return root;
};
// 时间复杂度：O(n) 每个节点访问一次
// 空间复杂度：O(h) 递归栈的深度

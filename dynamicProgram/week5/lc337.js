// 337. 打家劫舍 III
// 小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 root 。
// 除了 root 之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。
// 如果 两个直接相连的房子在同一天晚上被打劫 ，房屋将自动报警。 => 父子节点不能同时被偷
// 给定二叉树的 root 。返回 在不触动警报的情况下 ，小偷能够盗取的最高金额 。

// 核心思路：
// 1. 每个节点有两种状态：选中和不选中
// 2. 如果选中当前节点，那么左右子节点就不能选中
// 3. 如果不选中当前节点，那么左右子节点可以选中也可以不选中
// 4. 我们可以用一个数组来表示这两种状态，数组的第一个元素表示选中当前节点的最大金额，数组的第二个元素表示不选中当前节点的最大金额 【stealNode, notSteaNode】
// 5. 我们可以用递归的方式来计算这两种状态，最后返回数组的第一个元素即可
const rob = (root) => {
  const postTraversal = (node) => {
    if (!node) return [0, 0];
    // - 先处理子节点，再处理父节点
    // -确保子问题的结果可以用于父问题;
    const left = postTraversal(node.left);
    const right = postTraversal(node.right);
    // 对于每个节点，返回一个数组 [偷当前节点的最大金额, 不偷当前节点的最大金额]
    const stealNode = node.val + left[1] + right[1]; // left和right都是【stealNode， noStealNode】的结构表示偷当前节点的最大金额和不偷当前节点的最大金额
    const noStealNode =
      Math.max(left[0], left[1] /**每个节点都有两种状态： 偷 或 不偷 */) +
      Math.max(right[0], right[1]);
    return [stealNode, noStealNode];
  };
  const res = postTraversal(root);
  return Math.max(...res);
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

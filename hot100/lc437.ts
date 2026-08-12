// 路径总和 III
// 给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和
// 等于 targetSum 的 路径 的数目。
// 路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的
// （只能从父节点到子节点）。
// 示例 1：
//   输入：root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
//   输出：3
//   解释：三条和为 8 的路径：5 -> 3；5 -> 2 -> 1；-3 -> 11
// 示例 2：
//   输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
//   输出：3
// 提示：二叉树的节点个数的范围是 [0, 1000]
//       -10^9 <= Node.val <= 10^9
//       -1000 <= targetSum <= 1000
import { TreeNode } from './tree';
const totalPathSumNormal = (
  root: TreeNode | null,
  targetSum: number
): number => {
  if (!root) return 0;
  let count: number = 0;
  const countFrom = (node: TreeNode, curSum: number) => {
    curSum += node.val;
    if (curSum === targetSum) count++;
    if (node.left) {
      countFrom(node.left, curSum);
    }
    if (node.right) {
      countFrom(node.right, curSum);
    }
  };
  countFrom(root, 0);
  count += totalPathSumNormal(root.left, targetSum);
  count += totalPathSumNormal(root.right, targetSum);
  return count;
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(树的高度)

const totalPathSumOpt = (root: TreeNode | null, targetSum: number): number => {
  if (!root) return 0;
  let count: number = 0;
  const map = new Map<number, number>();
  // 虚拟父节点的前缀和为 0：让"以根为起点"的路径也能被数到
  map.set(0, 1);
  const countFrom = (node: TreeNode, curSum: number) => {
    curSum += node.val;
    // ① 先查：数"以当前节点为终点"的路径
    //    sum(X→node) = targetSum ⟺ prefix(parent(X)) = curSum - targetSum
    if (map.has(curSum - targetSum)) {
      count += map.get(curSum - targetSum)!;
    }
    // ② 再插：自己的前缀供子孙查询。必须后插——
    //    否则 targetSum=0 时会命中自己，数出"空路径"
    map.set(curSum, (map.get(curSum) || 0) + 1);
    // ③ 递归孩子
    if (node.left) {
      countFrom(node.left, curSum);
    }
    if (node.right) {
      countFrom(node.right, curSum);
    }
    // ④ 回溯：离开当前路径，前缀归还（兄弟子树看不见它）
    map.set(curSum, map.get(curSum)! - 1);
  };
  countFrom(root, 0);
  return count;
};
// 时间复杂度：O(n)
// 空间复杂度：O(树的高度)
//
// ── 本题总结 ────────────────────────────────────────────────────
// 要点           │ 内容
// ──────────────┼────────────────────────────────────────────────
// 路径计数拆解   │ 每条路径有唯一起点 → 数路径 = 每个节点当起点各数一遍
// 暴力版思路     │ 外层递归让每个节点当起点；内层 countFrom 带路径和往下走，
//                │ 相等就计数、永不提前停（负数）。O(n²) / O(树高)
// 核心洞察       │ 任意向下路径 X→Y 的和 = prefix(Y) − prefix(parent(X))
//                │ （parent(root) 视为虚拟节点，prefix = 0）
// 翻转           │ sum = targetSum ⟺ prefix(parent(X)) = prefix(Y) − targetSum
// 一次 DFS       │ 维护"当前路径"的前缀和哈希表，走到 Y 时
//                │ 查 map[prefix(Y) − targetSum]，命中一个 = 一条合法路径
// map 的语义     │ key = 前缀和，value = 出现次数（同值前缀可被多条路径共享）
// 三个关键细节   │ ① map 初始 {0: 1}（虚拟父节点 → 数到根起点的路径）
//                │ ② 先查后插（targetSum=0 时不会数出空路径）
//                │ ③ 返回前递减删除（兄弟子树不在当前路径上，不能互相看见）
// 复杂度         │ 时间 O(n)（每节点恰好一次）；空间 O(树高)（map 只存当前路径）
// 方法论         │ 树上的"路径和"问题 → 前缀和 + 哈希表
//                │ （和 lc560 子数组和、lc1 两数之和同款"查差"套路）
// 对比           │ 暴力版从"起点"视角拆（每个节点数一遍子树）；
//                │ 优化版从"终点"视角拆（每节点查一次哈希）——殊途同归

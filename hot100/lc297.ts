// 二叉树的序列化和反序列化
// 序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。
// 请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。

import { TreeNode } from './tree';

/** 序列化：把树编码成一个字符串 */
const serialize = (root: TreeNode | null): string => {
  const res: (number | string)[] = [];
  const dfs = (node: TreeNode | null) => {
    if (!node) {
      res.push('#');
      return;
    }
    res.push(node.val);
    dfs(node.left);
    dfs(node.right);
  };
  dfs(root);
  return res.join(',');
};

/** 反序列化：把字符串还原成树 */
const deserialize = (data: string): TreeNode | null => {
  const tempArr = data.split(',');
  let i = 0;
  const dfs = (): TreeNode | null => {
    const cur = tempArr[i++];
    if (cur === '#') {
      return null;
    }
    const node = new TreeNode(Number(cur));
    node.left = dfs();
    node.right = dfs();
    return node;
  };
  let root = dfs();
  return root;
};

// 时间复杂度 O(N) —— 每个节点在序列化/反序列化中各被访问一次
// 空间复杂度 O(H) —— 递归栈深度 = 树高（平衡树 O(logN)，斜树最坏 O(N)），外加数组 O(N)
//
// ── 本题总结 ────────────────────────────────────────────────────
// 要点        │ 内容
// ───────────┼──────────────────────────────────────────────────
// 核心洞察    │ 普通遍历丢失结构 → 记录空节点(#)后，单独前序即可唯一还原
// serialize  │ 前序遍历，null 写 '#'，dfs 契约："给我null我自己写#"
// deserialize│ split 后闭包指针 i，每次调用恰好消费 1 个元素
// 关键技巧    │ arr[i++] 读+移指针一步完成；'#' 是 base case 返回 null
// 填坑顺序    │ node.left = dfs() 必须先于 right，与前序写入顺序严格对应
// 易错点      │ null 处理要 early return；不要在调用 dfs 前用 if 过滤 null
// 复杂度      │ 时间 O(N)，空间 O(H)（递归栈）+ O(N)（数组）

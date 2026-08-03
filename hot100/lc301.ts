// 删除无效的括号
// 给你一个由若干括号和字母组成的字符串 s，删除最小数量的无效括号，使得输入的字符串有效。
// 返回所有可能的结果。答案可以按任意顺序返回。
// 示例 1：
//   输入：s = "()())()"
//   输出：["(())()", "()()()"]
// 示例 2：
//   输入：s = "(a)())()"
//   输出：["(a())()", "(a)()()"]
// 示例 3：
//   输入：s = ")("
//   输出：[""]
// 提示：1 <= s.length <= 25；s 由小写字母以及字符 '(' 和 ')' 组成；s 中至多含 20 个括号。

const removeInvalidParentheses = (s: string): string[] => {
  let leftRem = 0,
    rightRem = 0,
    balance = 0;
  for (const c of s) {
    if (c === '(') {
      balance++;
    } else if (c === ')') {
      if (balance === 0) {
        rightRem++; // 代表此时前面没有左括号来配对了
      } else {
        balance--; // 成功配对了
      }
    }
  }
  leftRem = balance;
  const ansSet = new Set<string>();
  const dfs = (
    index: number,
    tempArr: string,
    balance: number,
    leftRem: number,
    rightRem: number
  ) => {
    if (index === s.length) {
      if (leftRem === 0 && rightRem === 0 && balance === 0) {
        ansSet.add(tempArr);
      }
      return;
    }
    if (s[index] === '(') {
      // 删 / 留 是两条平行的分支，都要尝试
      if (leftRem > 0) {
        dfs(index + 1, tempArr, balance, leftRem - 1, rightRem); // 删
      }
      dfs(index + 1, tempArr + '(', balance + 1, leftRem, rightRem); // 留
    } else if (s[index] === ')') {
      if (rightRem > 0) {
        dfs(index + 1, tempArr, balance, leftRem, rightRem - 1); // 删
      }
      // 留 ')' 是唯一有守卫的分支：balance > 0 才能留，否则掉负
      if (balance > 0) {
        dfs(index + 1, tempArr + ')', balance - 1, leftRem, rightRem); // 留
      }
    } else {
      dfs(index + 1, tempArr + s[index], balance, leftRem, rightRem); // 字母只能留
    }
  };
  dfs(0, '', 0, leftRem, rightRem); // 起始 balance 永远是 0
  return Array.from(ansSet);
};
// 时间复杂度 O(2^n) —— 最坏情况每个括号都有删/留两条路（n ≤ 25）
// 空间复杂度 O(n) —— 递归栈深度，外加答案 Set
//
// ── 本题总结 ────────────────────────────────────────────────────
// 要点       │ 内容
// ──────────┼────────────────────────────────────────────────────
// 核心洞察   │ 先算"最少删几个"再搜"删哪些"——两个独立的病各配一个钱包
// 第一步     │ 一次扫描：掉负的 ')' → rrem++（balance 保持 0）；扫完剩下的 balance → lrem
// DFS 状态  │ (index, tempArr, balance, leftRem, rightRem) 五件套
// 分支表     │ '('：删/留平行；')'：删/留（留需 balance > 0 守卫）；字母：只留
// 验收       │ 走完 + 额度归零 + balance 归零 → 进 Set 去重
// 易错点     │ ①删/留是并行分支不是 if/else ②balance 条件挂在"留 )"上
//            │ ③传参别写 balance++（传的是旧值）④启动 balance 传 0 不是扫描剩值
// 复杂度     │ 时间 O(2^n)，空间 O(n) + 答案 Set

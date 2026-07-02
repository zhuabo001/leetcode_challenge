// 括号的生成
// 示例 1：

// 输入：n = 3
// 输出：["((()))","(()())","(())()","()(())","()()()"]
const generateParenthesis = (n: number): string[] => {
  const res: string[] = [],
    path: string[] = [];
  const backTrack = (left: number, right: number) => {
    if (left === n && right === n) {
      res.push(path.join(''));
      return;
    }
    if (left < n) {
      path.push('(');
      backTrack(left + 1, right);
      path.pop();
    }
    if (right < left) {
      path.push(')');
      backTrack(left, right + 1);
      path.pop();
    }
  };
  backTrack(0, 0);
  return res;
};
// 时间复杂度 O(n * C_n) - C_n 为卡特兰数，总结果数为 C_n = (2n)!/((n+1)!·n!)，近似 O(4^n / n^(3/2))
// 空间复杂度 O(n) - 递归栈深度 n，path 数组长度 n（不计输出结果）
//
// 题解分析：
// 回溯 + 剪枝。把括号生成看作一条路径，每次有两个选择：放 '(' 或放 ')'。
// 约束条件：
//   - 左括号最多用 n 个（left < n 时才能放 '('）
//   - 右括号不能超过左括号（right < left 时才能放 ')'）
// 当 left = right = n 时收集结果

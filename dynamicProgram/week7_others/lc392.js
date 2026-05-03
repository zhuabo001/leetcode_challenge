// 392. 判断子序列
// 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
// 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。
// 进阶：
// 如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？
// 示例 1：
// 输入：s = "abc", t = "ahbgdc"
// 输出：true
// 示例 2：
// 输入：s = "axc", t = "ahbgdc"
// 输出：false
const isSubsequence_dp = (s, t) => {
  if (s.length === 0) return true;
  if (s.length > t.length) return false;
  const len_1 = s.length,
    len_2 = t.length;
  const dp = new Array(len_1 + 1)
    .fill(0)
    .map(() => new Array(len_2 + 1).fill(0));
  // dp[i][j] 表示s的[0, i - 1]和t的[0, j - 1]的相同子序列长度
  // 状态转移方程 如果s[i - 1] === t[j - 1], 则有dp[i][j] = dp[i - 1][j - 1] + 1;若不相等,则dp[i][j] = dp[i][j - 1]; 也就是说此时的相同子序列长度同s[0, i - 2]和t[0, j - 2]的一样
  // 初始化dp数组
  for (let i = 0; i <= len_1; i++) {
    dp[i][0] = 0;
  }
  for (let j = 0; j <= len_2; j++) {
    dp[0][j] = 0;
  }
  for (let i = 1; i <= len_1; i++) {
    for (let j = 1; j <= len_2; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = dp[i][j - 1];
      }
    }
  }
  return dp[len_1][len_2] === s.length;
};
// 时间复杂度：O(n * m) - 遍历一次s和t
// 空间复杂度：O(n * m) - dp数组
const isSubsequence_2_pointers = (s, t) => {
  if (s.length === 0) return true;
  if (s.length > t.length) return false;
  let i = 0,
    j = 0; // i指向s, j指向t
  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) {
      i++; // 匹配成功, i指针后移
      j++;
    } else {
      j++; // 匹配失败, j指针后移
    }
  }
  return i === s.length;
};
// 时间复杂度：O(n) - 遍历一次t
// 空间复杂度：O(1) - 只使用了常数个变量

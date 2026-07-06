// 回文子串
// 给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。
// 回文字符串 是正着读和倒过来读一样的字符串。
// 子字符串 是字符串中的由连续字符组成的一个序列。

const countSubStrings = (s: string): number => {
  const len = s.length;
  let count = 0;
  const dp = new Array(len).fill(false).map(() => new Array(len).fill(false));
  for (let i = len - 1; i >= 0; i--) {
    for (let j = i; j < len; j++) {
      if (i === j) {
        dp[i][j] = true;
        count++;
      } else if (j - i === 1 && s[i] === s[j]) {
        dp[i][j] = true;
        count++;
      } else if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        count++;
      } else {
        dp[i][j] = false;
      }
    }
  }
  return count;
};

// 时间复杂度 O(N^2);
// 空间复杂度O(N^2);

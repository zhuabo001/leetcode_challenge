// 最长回文子串
const longestPalindrome = (s: string): string => {
  if (!s || s.length === 0) return '';
  let ans = s[0];
  const dp = new Array(s.length)
    .fill(false)
    .map(() => new Array(s.length).fill(false));
  for (let i = s.length - 1; i >= 0; i--) {
    for (let j = i; j < s.length; j++) {
      if (i === j) {
        dp[i][j] = true;
      } else if (j - i === 1 && s[i] === s[j]) {
        dp[i][j] = true;
      } else if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
      }
      if (dp[i][j] && j - i + 1 > ans.length) {
        ans = s.slice(i, j + 1);
      }
    }
  }
  return ans;
};
// 时间复杂度 O(n^2)
// 空间复杂度 O(n^2)

const longestPalindromeWith2Pointers = (s: string): string => {
  if (!s || s.length === 0) return '';
  let ans = '';

  const expand = (left: number, right: number) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    // 多走了一步，回文范围是 (left+1, right-1)
    return s.slice(left + 1, right);
  };

  for (let i = 0; i < s.length; i++) {
    const oddPal = expand(i, i);       // 奇数回文：中心一个字符
    const evenPal = expand(i, i + 1);  // 偶数回文：中心两个字符
    // oddPal 和 evenPal 无需直接比较大小，各自与全局 ans 判断即可
    // 较长的那个自然会更新 ans，较短的那个不会产生影响
    if (oddPal.length > ans.length) ans = oddPal;
    if (evenPal.length > ans.length) ans = evenPal;
  }
  return ans;
};
// 时间复杂度: O(n²)
// - 外层遍历每个字符 O(n)，每次扩展最多向两边走 O(n)，总 O(n²)

// 空间复杂度: O(1)
// - 只用了常数个变量（left, right, ans, oddPal, evenPal）

// 中心扩展法分析:
// 回文中心可以是单字符（奇数回文，如 "aba" 的中心 'b'）或双字符（偶数回文，如 "abba" 的中心 "bb"）。
// 遍历每个位置 i 时，不知道以 i 为中心的回文是奇数还是偶数，故两种都试:
//   - expand(i, i)      → 奇数回文
//   - expand(i, i + 1)  → 偶数回文
// 取两者中较长的更新全局最长回文。
// 相比 DP 解法，空间从 O(n²) 优化到 O(1)，但时间仍是 O(n²)。

// 无重复子串的最长子串
const longestSubstring = (s: string): number => {
  if (!s || s.length === 0) return 0;
  let left = 0,
    right = 0;
  const window: Record<string, number> = {};
  let maxLen = 0;
  while (right < s.length) {
    const c1 = s[right];
    window[c1] = (window[c1] || 0) + 1;
    right++;
    while (window[c1] > 1) {
      const c2 = s[left];
      window[c2]--;
      left++;
    }
    maxLen = Math.max(maxLen, right - left);
  }
  return maxLen;
};
// 时间复杂度 O(n)
// 空间复杂度 O(∣Σ∣) - window 大小取决于字符集规模，通常视为常数 O(1)

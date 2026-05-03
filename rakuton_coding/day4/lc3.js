// 3. 无重复字符的最长子串
// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
// 滑动窗口
const lengthOfLongestSubstring = function (s) {
  if (!s || s.length === 0) return 0;
  let left = 0,
    right = 0;
  let maxLen = 0;
  let window = {};
  while (right < s.length) {
    const c1 = s[right];
    window[c1] = (window[c1] || 0) + 1;
    right++;
    while (window[c1] > 1) {
      const c2 = s[left];
      window[c2]--; // 关键：移除的是左边界字符，不是重复字符
      left++;
    }
    maxLen = Math.max(maxLen, right - left);
  }
  return maxLen;
};
// 时间复杂度：O(n)，其中 n 是字符串的长度。左指针和右指针分别会遍历整个字符串一次。
// 空间复杂度：O(∣Σ∣)，其中 Σ 表示字符集（即字符串中可以出现的字符），∣Σ∣ 表示字符集的大小。

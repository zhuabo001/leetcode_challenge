// 无重复字符的最长子串
// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
//
// 示例 1:
// 输入: s = "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
//
// 示例 2:
// 输入: s = "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
//
// 示例 3:
// 输入: s = "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
//
// 提示：
// - 0 <= s.length <= 5 * 10^4
// - s 由英文字母、数字、符号和空格组成
//
// 请访问 https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/

const lengthOfLongestSubstring = (s: string): number => {
  if (!s || s.length === 0) return 0;
  if (s && s.length === 1) return 1;
  let left: number = 0,
    right: number = 0;
  let maxLen = 0;
  const window = new Map();
  while (right < s.length) {
    const charRight = s[right];
    window.set(charRight, (window.get(charRight) || 0) + 1);
    right++;
    while (window.get(charRight) > 1) {
      const charLeft = s[left];
      window.set(charLeft, (window.get(charLeft) || 1) - 1);
      left++;
    }
    maxLen = Math.max(maxLen, right - left);
  }
  return maxLen;
};

// 时间复杂度: O(n)
// - 左右指针各遍历字符串一次，每个字符进入和离开窗口各一次
// - 整体操作次数与字符串长度线性相关

// 空间复杂度: O(|Σ|)
// - Map 最多存储字符集大小个键值对
// - 字符集包含英文字母、数字、符号和空格，可视为常数范围 (O(1))

/**
 * LeetCode 395. 至少有 K 个重复字符的最长子串
 *
 * 给你一个字符串 s 和一个整数 k ，请你找出 s 中的最长子串，
 * 要求该子串中的每一字符出现次数都不少于 k 。返回这一子串的长度。
 *
 * 如果不存在这样的子字符串，则返回 0。
 *
 * 示例 1：
 * 输入：s = "aaabb", k = 3
 * 输出：3
 * 解释：最长子串为 "aaa" ，其中 'a' 重复了 3 次。
 *
 * 示例 2：
 * 输入：s = "ababbc", k = 2
 * 输出：5
 * 解释：最长子串为 "ababb" ，其中 'a' 重复了 2 次，'b' 重复了 3 次。
 *
 * 提示：
 * - 1 <= s.length <= 10^4
 * - s 仅由小写英文字母组成
 * - 1 <= k <= 10^5
 */

const longestSubString = (s: string, k: number): number => {
  return divideAndConquer(s, 0, s.length - 1, k);
};
const divideAndConquer = (
  s: string,
  left: number,
  right: number,
  k: number
): number => {
  if (right - left + 1 < k) {
    return 0;
  }
  // 1. 统计当前区间内每个字符出现的次数
  const freq: number[] = new Array(26).fill(0);
  for (let i = left; i <= right; i++) {
    freq[s.charCodeAt(i) - 97]++;
  }

  // 2. 用allValid来标记是否存在 出现次数不满k次的字符
  let allValid = true;
  for (let i = 0; i < 26; i++) {
    if (freq[i] > 0 && freq[i] < k) {
      allValid = false;
      break;
    }
  }
  if (allValid) {
    return right - left + 1;
  }

  // 3. 找到那个出现次数不满k次的字符，并用这个字符分割这个区间的字符串，然后递归处理

  let maxLen = 0;
  let start = left;
  for (let i = left; i <= right; i++) {
    if (freq[s.charCodeAt(i) - 97] < k /** s.charCodeAt(i) 作为分割符*/) {
      if (start <= i - 1) {
        maxLen = Math.max(maxLen, divideAndConquer(s, start, i - 1, k));
      }
      start = i + 1; // 下一段从i+1开始
    }
  }
  if (start <= right) {
    maxLen = Math.max(maxLen, divideAndConquer(s, start, right, k));
  }
  return maxLen;
};

// 时间复杂度 O(n²) — 最坏情况下每次分割产生新的递归层级，每层扫描 O(n)
// 空间复杂度 O(n) — 递归调用栈深度最坏为 O(n)

// 单词拆分
const wordSplit = (s: string, wordDict: string[]): boolean => {
  // 当我可以走到位置j并且j到i的这段字符串正好是一个单词，那么我就可以走到位置i
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  // dp[i] = 存在某个 j（0 ≤ j < i），使得 dp[j] = true 且 s[j...i-1] 在词典里
  const wordSet = new Set(wordDict);
  let maxLen = 0; // 有什么用？
  for (const word of wordSet) maxLen = Math.max(word.length, maxLen); // 有什么用
  for (let i = 1; i <= s.length; i++) {
    for (
      let j = i - 1;
      j >=
      Math.max(
        0,
        i -
          maxLen /**如果i - j > maxLen那么其实可以跳过这个内层循环 因为这样j + maxLen 一定到不了i*/
      );
      j--
    ) {
      if (!dp[j]) continue; // 到不了j的话那后面肯定也到不了i
      if (wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
};
// 时间复杂度 O(n ^ 2)
// 空间复杂度 O(n)

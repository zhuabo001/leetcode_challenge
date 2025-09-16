// 139. 单词拆分
// 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s 。
// 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
//
// 示例 1：
// 输入: s = "leetcode", wordDict = ["leet", "code"]
// 输出: true
// 解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
//
// 示例 2：
// 输入: s = "applepenapple", wordDict = ["apple", "pen"]
// 输出: true
// 解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
// 注意，你可以重复使用字典中的单词。
// 单词就是物品，字符串s就是背包，单词能否组成字符串s，就是问物品能不能把背包装满。
const wordBreak = (s, wordDict) => {
  // 1. 确定dp[i]的含义：字符串长度为i的时候能否被拆分成字典中出现的单词，能的话就是true
  // 2. 确定状态转移方程：如果dp[j]是true，并且[j, i]这个区间的子串出现在字典里，那么dp[i]就是true，
  // 所以状态转移方程为：if([j, i] 这个区间的子串出现在字典里 && dp[j]是true) 那么 dp[i] = true
  // 3. 初始化dp数组：dp[0] = true，因为空字符串一定可以被拆分成字典中出现的单词
  // 4. 确定遍历顺序： 完全背包问题，并且本题虽然没有明确表示是求组合还是排列数，但是单词需要基于一定顺序才能组成，所以本题还是求的排列数
  // 所以先遍历背包，再遍历物品
  // 5. 举例推导dp数组
  const dp = new Array(s.length + 1).fill(false);
  const wordSet = new Set(wordDict);
  dp[0] = true; // 其实没有意义完全是为了递推公式用
  for (let i = 0; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(n)
const wordBreakModified = (s, wordDict) => {
  const set = new Set(wordDict);
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  dp[0] = true;

  // 预计算最大单词长度，降低内层循环次数
  let maxLen = 0;
  for (const w of set) maxLen = Math.max(maxLen, w.length);

  for (let i = 1; i <= n; i++) {
    // 只需检查长度不超过 maxLen 的前缀分割点
    for (let j = i - 1; j >= Math.max(0, i - maxLen); j--) {
      if (!dp[j]) continue;
      const sub = s.slice(j, i);
      if (set.has(sub)) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[n];
};

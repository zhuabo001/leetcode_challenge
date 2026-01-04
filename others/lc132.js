// 分割回文串子ii
// 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是回文。
// 返回符合要求的 最少分割次数 。
// 示例 1：
// 输入：s = "aab" 输出：1 解释：只需一次分割就可将 s 分割成 ["aa","b"] 这样两个回文子串。
// 示例 2： 输入：s = "a" 输出：0
// 示例 3： 输入：s = "ab" 输出：1
const isPalindrome = (s) => {
  let left = 0,
    right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
};
const leastPartitionForSubPalidrome = (s) => {
  // 本题使用动态规划
  // 1. 确定dp数组含义： dp[i] - 分割[0, i]的子串最少分割次数为dp[i]
  // 2. 状态转移方程：对于[0, i] 的子串进行分割且分割位置为j， 如果[j + 1, i]是回文子串，有dp[i] = dp[j] + 1
  //    dp[i] = Math.min(dp[i], dp[j] + 1), 注意这里不是要dp[j] + 1和dp[i]去比大小，而要在遍历j的过程中取最小的dp[i]
  // 3. 初始化dp数组 dp[0] = 0, 因为dp[i] = Math.min(dp[i], dp[j] + 1)，所以非0下标的初始值应该是一个大数字 Infinity
  // 4. 确定遍历顺序
  // j是在[0，i]之间，所以遍历i的for循环一定在外层，这里遍历j的for循环在内层才能通过 计算过的dp[j]数值推导出dp[i]。
  // 5. 举例推导dp数组

  const dp = new Array(s.length).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i < s.length; i++) {
    // 如果整个子串 `[0, i]` 本身就是一个回文串，那么就不需要任何分割，直接将 `dp[i]` 设为 0
    if (isPalindrome(s.slice(0, i + 1))) {
      dp[i] = 0;
      continue;
    }
    for (let j = 0; j < i; j++) {
      if (isPalindrome(s.slice(j + 1, i + 1))) {
        dp[i] = Math.min(dp[i], dp[j] + 1);
      }
    }
  }
  return dp[s.length - 1];
};
// 时间复杂度
// 空间复杂度q

// 分割回文串
// 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。
// 回文串 是正着读和反着读都一样的字符串。
// 输入：s = "aab"
// 输出：[["a","a","b"],["aa","b"]]
// 输入：s = "a"
// 输出：[["a"]]
// 输入：s = "aabb"
// 输出：[["a","a","b","b"],["aa","b","b"],["a","a","bb"],["aa","bb"]]
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
const partition = (s) => {
  const res = [],
    path = [];
  const backTrack = (s, startIndex) => {
    // 判断条件错误：这个题目的要求是： 将字符串分割成多个子串，使得每个子串都是回文串 ，而不是要求整个路径拼接后是回文串
    // 所以path内存储的是多个回文子串（某个切割方案）
    // if(isPalindrome(path.join(""))){
    //     res.push([...path]);
    //     return;
    // }
    // startIndex就是切割线
    if (
      startIndex ===
      s.length /**切割线切到了字符串最后面，说明找到了一种切割方法，此时就是本层递归的终止条件 */
    ) {
      res.push([...path]);
      return;
    }
    for (let i = startIndex; i < s.length; i++) {
      // 应该在每次添加字符到 path 之前检查当前要添加的子串是否是回文串
      if (!isPalindrome(s.slice(startIndex, i + 1))) continue;
      path.push(s.slice(startIndex, i + 1));
      backTrack(s, i + 1);
      path.pop();
    }
  };
  backTrack(s, 0);
  return res;
};
// 时间复杂度：O(n * 2^n)：
// 对于长度为 N 的字符串，最多有 2^(N-1) 种分割方案
// 回文检查： 每次检查一个子串是否为回文需要 O(子串长度) 时间
// 总时间复杂度： O(分割方案数 × 回文检查时间) = O(2^N × N) = O(N × 2^N)
// 空间复杂度：O(n)
/**
 * 递归栈深度： 最深递归层数为 N（每层处理一个字符）
 * 递归栈空间：O(N)
 * path 数组： 最多存储 N 个子串
 * path 空间：O(N)
 * 结果存储： 不计入空间复杂度分析
 * 总空间复杂度： O(N) + O(N) = O(N)
 */
console.log(partition('aabb'));

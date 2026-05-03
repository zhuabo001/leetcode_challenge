// 763. 划分字母区间
// 字符串 S 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。返回一个整数数组，代表了每个字符串片段的长度。
// 示例：
// 输入：S = "ababcbacadefegdehijhklij"
// 输出：[9,7,8] 解释： 划分结果为 "ababcbaca", "defegde", "hijhklij"。
// 每个字母最多出现在一个片段中。 像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少
// 在遍历的过程中相当于是要找每一个字母的边界，如果找到之前遍历过的所有字母的最远边界，说明这个边界就是分割点了
// 思路：
// 1. 统计每一个字符最后出现的位置
// 2. 从头遍历字符，并更新字符的最远出现下标，如果找到字符最远出现位置下标和当前下标相等了，则找到了分割点
const partitionLabels = (s) => {
  const hash = {};
  for (let i = 0; i < s.length; i++) {
    hash[s[i]] = i; // 统计每个字符最后出现的位置
  }
  let left = 0,
    right = 0;
  const res = [];
  for (let i = 0; i < s.length; i++) {
    right = Math.max(right, hash[s[i]]);
    if (i === right) {
      res.push(right - left + 1);
      left = i + 1;
    }
  }
  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)

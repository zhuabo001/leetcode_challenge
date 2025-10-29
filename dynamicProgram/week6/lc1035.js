// 1035. 不相交的线
// 在两条独立的水平线上按给定的顺序写下 nums1 和 nums2 中的整数。
// 现在，可以绘制一些连接两个数字 nums1[i] 和 nums2[j] 的直线，这些直线需要同时满足满足：
// nums1[i] == nums2[j]
// 且绘制的直线不与任何其他连线（非水平线）相交。
// 请注意，连线即使在端点也不能相交：每个数字只能属于一条连线。
// 以这种方法绘制线条，并返回可以绘制的最大连线数。
// 示例 1：
// 输入：nums1 = [1,4,2], nums2 = [1,2,4]
// 输出：2
// 解释：可以画出两条不交叉的线，如上图所示。
// 但无法画出第三条不相交的直线，因为从 nums1[1]=4 到 nums2[2]=4 的直线将与从 nums1[2]=2 到 nums2[1]=2 的直线相交。
// 示例 2：
// 输入：nums1 = [2,5,1,2,5], nums2 = [10,5,2,1,5,2]
// 输出：3
// 示例 3：
// 输入：nums1 = [1,3,7,1,7,5], nums2 = [1,9,2,5,1]
// 输出：2
// 提示：
// 1 <= nums1.length, nums2.length <= 500
// 1 <= nums1[i], nums2[j] <= 2000
// 经分析
// 直线不能相交，这就是说明在字符串nums1中 找到一个与字符串nums2相同的子序列，且这个子序列不能改变相对顺序，只要相对顺序不改变，连接相同数字的直线就不会相交
// 在示例1中其实也就是说nums1和nums2的最长公共子序列是[1,4]，长度为2。 这个公共子序列指的是相对顺序不变（即数字4在字符串nums1中数字1的后面，那么数字4也应该在字符串nums2数字1的后面）
const maxUncrossedLines = (nums1, nums2) => {
  // 转化为lc1143的最长公共子序列问题
  const len_1 = nums1.length,
    len_2 = nums2.length;
  const dp = new Array(len_1 + 1)
    .fill(0)
    .map(() => new Array(len_2 + 1).fill(0));
  let res = 0;
  for (let i = 0; i <= len_1; i++) {
    dp[i][0] = 0;
  }
  for (let j = 0; j <= len_2; j++) {
    dp[0][j] = 0;
  }
  for (let i = 1; i <= len_1; i++) {
    for (let j = 1; j <= len_2; j++) {
      if (nums1[i - 1] === nums2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
      if (dp[i][j] > res) {
        res = dp[i][j];
      }
    }
  }
  return res;
};
// 时间复杂度：O(n x m) - 双循环
// 空间复杂度：O(n x m) - dp数组

// 718. 最长重复子数组
// 给两个整数数组 nums1 和 nums2 ，返回 两个数组中 公共的 、长度最长的子数组的长度 。
// 示例 1：
// 输入：nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
// 输出：3
// 解释：长度最长的公共子数组是 [3,2,1] 。
// 示例 2：
// 输入：nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]
// 输出：5
// 这里说的最长公共子数组其实就是最长的公共连续子序列
const longestPublicSubArray = (nums1, nums2) => {
  // 利用二维dp数组来记录两个数组的比较情况
  // dp[i][j]表示nums1[i - 1]和nums2[j - 1]的最长公共子序列的长度
  const len1 = nums1.length,
    len2 = nums2.length;
  const dp = new Array(len1 + 1).fill(0).map(() => new Array(len2 + 1).fill(0));
  let res = 0;
  // dp数组初始化
  dp[0][0] = 0;
  // 状态转移方程 dp[i][j]只能由dp[i - 1][j - 1]推导而来，当nums1[i] = nums2[j]时，有dp[i][j] = dp[i - 1][j - 1] + 1;
  // 确定dp数组遍历顺序
  // 举例推导dp数组
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      // 当i= 1， j=1时，我们实际比较的是nums1[0]和nums2[0]
      if (
        nums1[i - 1] ===
        nums2[
          j - 1
        ] /** 因为dp数组的定义是nums1[i-1]和nums2[j-1]的最长公共子数组长度，所以我们这里比较的是nums1[i - 1]和nums2[j - 1]*/
      ) {
        dp[i][j] = dp[i - 1][j - 1] + 1; // dp[i][j] 表示 nums1[i-1] 和 nums2[j-1] 为结尾的最长公共子数组长度
        if (dp[i][j] > res) {
          res = dp[i][j];
        }
      } else {
        dp[i][j] = 0;
      }
    }
  }
  return res;
};
// 时间复杂度：O(n x m) - 双循环
// 空间复杂度：O(n x m) - dp数组

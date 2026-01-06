// 最长递增子序列的个数
// 给定一个未排序的整数数组，找到最长递增子序列的个数。
// 示例 1:
// 输入: [1,3,5,4,7]
// 输出: 2
// 解释: 有两个最长递增子序列，分别是 [1, 3, 4, 7] 和[1, 3, 5, 7]。

// 示例 2:

// 输入: [2,2,2,2,2]
// 输出: 5
// 解释: 最长递增子序列的长度是1，并且存在5个子序列的长度为1，因此输出5。

const countOfLongestIncreasingSubSequence = (nums) => {
  // 本题需要维护两个数组，一个(dp[i])用来寻找最长递增子序列，一个(count[i])用来记录个数
  //1. 确定dp数组含义：dp[i]以nums[i]结尾的最长递增子序列的长度，count[i]表示以nums[i]结尾的最长递增子序列的个数
  //2. 状态转移方程： 找到更长时重置count，找到相等时累加count
  /**
   * 以nums[i]为结尾的字符串，最长递增子序列的个数是count[i];
   * 2-1.那么在nums[i] > nums[j]前提下，如果在[0, i-1]的范围内，找到了j，使得dp[j] + 1 > dp[i]，说明找到了一个更长的递增子序列
   * 那么以j为结尾的子串的最长递增子序列的个数，就是最新的以i为结尾的子串的最长递增子序列的个数，即：count[i] = count[j]
   * 2-2. 在nums[i] > nums[j]前提下，如果在[0, i-1]的范围内，找到了j，使得dp[j] + 1 == dp[i]，说明找到了两个相同长度的递增子序列
   * 那么以i为结尾的子串的最长递增子序列的个数 就应该加上以j为结尾的子串的最长递增子序列的个数，即：count[i] += count[j]
   */
  //3. 初始化dp数组
  /**
   * dp[0] - 以nums[0]结尾的最长递增子序列长度为1
   * count[0] - 以nums[0]结尾的最长递增子序列个数为1
   */
  const dp = new Array(nums.length).fill(1);
  const count = new Array(nums.length).fill(1);
  let maxLen = 0; // 最长递增子序列的长度
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        if (dp[j] + 1 > dp[i]) {
          count[i] = count[j];
        } else if (dp[j] + 1 === dp[i]) {
          count[i] += count[j];
        }
        dp[i] = Math.max(dp[j] + 1, dp[i]);
      }
      if (dp[i] > maxLen) maxLen = dp[i];
    }
  }

  //4. 确定dp数组遍历方向 —— 从前向后
  //5. 举例推导dp数组
  for (let i = 0; i < nums.length; i++) {
    if (maxLen === dp[i]) {
      // 当找到了对应最大长度的下标i时，结果记录count中对应下标的值
      result += count[i];
    }
  }
  return result;
};
// 时间复杂度 O(n²) - 外层循环遍历 i 从 0 到 n-1，共 n 次；
// 内层循环遍历 j 从 0 到 i-1，平均 n/2 次
// 最后还有一个循环遍历 i 从 0 到 n-1，共 n 次
// 总时间复杂度 = O(n²) + O(n) = O(n²)

// 空间复杂度：O(n)
// 空间复杂度 = O(n) + O(n) = O(n)； 分别是dp数组和count数组占用的空间

// 72. 编辑距离
// 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数 。
// 你可以对一个单词进行如下三种操作：
// 插入一个字符
// 删除一个字符
// 替换一个字符
// 示例 1：
// 输入：word1 = "horse", word2 = "ros"
// 输出：3
// 解释：
// horse -> rorse (将 'h' 替换为 'r')
// rorse -> rose (删除 'r')
// rose -> ros (删除 'e')
const editDistance = (word1, word2) => {
  const len_1 = word1.length,
    len_2 = word2.length;
  // 定义dp[i][j]: 以i-1为结尾的word1子串和以j-1为结尾的word2子串的最小编辑距离
  const dp = new Array(len_1 + 1).fill(0).map(new Array(len_2 + 1).fill(0));
  // 状态转移方程
  // 1. word1[i - 1] === word2[j - 1], 不用任何编辑操作， dp[i][j] = dp[i - 1][j - 1];
  // 2. word1[i - 1] !== word2[j - 1], 有三种操作方式：
  // 2.1 插入一个字符：dp[i][j] = dp[i][j - 1] + 1;
  // 2.2 删除一个字符：dp[i][j] = dp[i - 1][j] + 1;
  // 2.3 替换一个字符：dp[i][j] = dp[i - 1][j - 1] + 1;
  // 这里注意2.1和2.2， 例如word1 = ‘cat’, word2='cats', 那么我们可以通过word1插入s获得word2，也可以通过word2删除s来获得word1
  // 所以我们从word1的视角看 删除word2的一个字符操作数和插入word1的一个操作数是等价的，所以这里插入一个元素用dp[i][j - 1] + 1 (word2删除一个元素)
  // 初始化dp数组
  for (let i = 0; i <= len_1; i++) {
    dp[i][0] = i; // word1要删除字符i次才可以获得一个空串
  }
  for (let j = 0; j <= len_2; j++) {
    dp[0][j] = j; // 我们可以认为是初始空串word1要添加字符j次才可以得到word2
  }
  // 确定遍历顺序
  // 举例推导dp数组
  for (let i = 1; i <= len_1; i++) {
    for (let j = 1; j <= len_2; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1 /**替换字符*/,
          dp[i][j - 1] + 1 /**word1添加字符 */,
          dp[i - 1][j] + 1 /**word1删除字符 */
        );
      }
    }
  }
  return dp[len_1][len_2];
};

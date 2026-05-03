// 52. N皇后 II
//  n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
//  给你一个整数 n ，返回 n 皇后问题 不同的解决方案的数量。
// 示例 1：
// 输入：n = 4
// 输出：2
// 解释：如上图所示，4 皇后问题存在两个不同的解法。
// 示例 2：
// 输入：n = 1
// 输出：1
// 解释：如上图所示，1 皇后问题存在一个不同的解法。
const totalNQueens = (n) => {
  // 核心思路：
  // 1. 回溯算法
  // 2. 递归函数：backtrack(row, col, chessboard)
  //    - row：当前行
  //    - col：放置Q的列
  //    - chessboard：当前棋盘状态
  // 3. 递归终止条件：row === n，说明所有行都已放置皇后，方案数加一
  // 4. 递归过程：
  //    - 遍历当前行的所有列，判断是否可以放置皇后
  //    - 如果可以放置，递归调用下一行
  //    - 如果不可以放置，继续遍历下一列
  // 5. 返回方案数
  let count = 0;
  const backTrack /**核心函数 */ = (
    chessBoard /**棋盘， 树状结构下被视作一个节点 */,
    n,
    row
  ) => {
    if (row === n) {
      count++;
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isValid(row, col, n, chessBoard)) {
        chessBoard[row][col] = 'Q'; // 放置皇后
        backTrack(chessBoard, n, row + 1); // 递归棋盘下一行
        chessBoard[row][col] = '.'; // 回溯，撤销当前位置的皇后
      }
    }
  };
  const isValid = (
    row,
    /**当前要放置皇后的行 */ col /**当前要放置皇后的列 */,
    n,
    chessBoard
  ) => {
    //检查列、行、斜45度是否包含两个及以上的queen， 有的话就是inValid
    // 检查列
    for (let i = 0; i < row; i++) {
      if (chessBoard[i][col] === 'Q') return false; // 检查当前列的上方是否存在皇后
    }
    // 检查行
    for (let i = 0; i < col; i++) {
      if (chessBoard[row][i] === 'Q') return false; // 检查当前行的左侧是否存在皇后
    }
    // 检查45度斜线上是否有皇后
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (chessBoard[i][j] === 'Q') return false; // 检查45度斜线上是否有皇后 —— 右下到左上的对角线
    }
    // 检查135度斜线上是否有皇后
    for (
      let i = row - 1, j = col + 1;
      i >= 0 && j < n;
      i-- /**行向上 */, j++ /**列向右 */
    ) {
      if (chessBoard[i][j] === 'Q') return false; // 检查135度斜线上是否有皇后 —— 左下到右上的对角线
    }
    return true;
  };
  let chessBoard = Array.from({ length: n }, () => Array(n).fill('.'));
  backTrack(chessBoard, n, 0); // 从第0行开始回溯
  return count;
};
// 时间复杂度：O(n!)，其中 n 是皇后的数量。每个皇后必须在不同的行上，因此第一个皇后有 n 种可能的位置。第二个皇后最多有 n-1 种可能的位置，依此类推。因此，总共有 n! 种可能的位置。
// 空间复杂度：O(n)，其中 n 是皇后的数量。空间复杂度主要取决于递归调用的栈空间，递归栈的深度等于皇后的数量，最坏情况下，皇后的数量等于 n，空间复杂度为 O(n)。

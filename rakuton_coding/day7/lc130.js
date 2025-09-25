// 130. 被围绕的区域
// 给定一个二维的矩阵，包含 'X' 和 'O'（字母 O）。
// 找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。
// 示例:
// X X X X
// X O O X
// X X O X
// X O X X
// 运行你的函数后，矩阵变为：
// X X X X
// X X X X
// X X X X
// X O X X
const surroundedArea = (matrix) => {
  if (!matrix.length) return;
  const m = matrix.length,
    n = matrix[0].length;
  // 只有与边界相连的‘0’才不会被围绕
  // 核心思想：找出所有不被围绕的‘0’， 剩下的‘0’就是被围绕的
  // 1. 边界dfs标记： 从边界的每个0开始dfs，标记所有相连的0
  // 2. 遍历替换：遍历整个矩阵，未标记的0就是被围绕的，替换为x
  // 3. 恢复标记： 将标记的0恢复原状
  const dfs = (matrix, i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || matrix[i][j] !== '0') {
      return;
    }
    // 标记为临时字符，表示不会被围绕
    matrix[i][j] = '#';
    // 递归标记相邻的0
    dfs(matrix, i + 1, j);
    dfs(matrix, i - 1, j);
    dfs(matrix, i, j + 1);
    dfs(matrix, i, j - 1);
  };

  // 从边界开始dfs标记
  for (let i = 0; i < m; i++) {
    /**标记第一列和最后一列 */
    if (matrix[i][0] === '0') {
      dfs(matrix, i, 0);
    }
    if (matrix[i][n - 1] === '0') {
      dfs(matrix, i, n - 1);
    }
  }
  for (let i = 0; i < n; i++) {
    /**标记第一行和最后一行 */
    if (matrix[0][i] === '0') {
      dfs(matrix, 0, i);
    }
    if (matrix[m - 1][i] === '0') {
      dfs(matrix, m - 1, i);
    }
  }
  // 2. 遍历matrix，找到未被标记的0，替换为x， 找到被标记的0，恢复为0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === '0') {
        matrix[i][j] = '0';
      }
      if (matrix[i][j] === '#') {
        matrix[i][j] = '0';
      }
    }
  }
  return matrix;
};
// 时间复杂度：O(mn)，其中 m 和 n 分别为矩阵的行数和列数。
// 空间复杂度：O(mn)，其中 m 和 n 分别为矩阵的行数和列数。主要取决于递归调用的栈空间，而栈空间的深度不会超过 m 和 n 中的较大值。
// 找不被围绕的区域更简单（从边界开始

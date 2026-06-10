// 旋转数组
// 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。

// 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像
const rotate = (matrix: number[][]): number[][] => {
  const n = matrix.length;
  // 原来(row, col)的节点到新的位置是(col, n - row - 1);
  for (let row = 0; row < Math.floor(n / 2); row++) {
    // 想象是圈数？
    for (let col = row; col < n - row - 1; col++) {
      let temp = matrix[row][col];
      matrix[row][col] = matrix[n - col - 1][row];
      matrix[n - col - 1][row] = matrix[n - row - 1][n - col - 1];
      matrix[n - row - 1][n - col - 1] = matrix[col][n - row - 1];
      matrix[col][n - row - 1] = temp;
    }
  }
  return matrix;
};
// 时间复杂度 O(n^2)
// 空间复杂度 O(1)

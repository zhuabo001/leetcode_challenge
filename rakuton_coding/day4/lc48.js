// 48. 旋转图像
// 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
// 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。
// 示例 1：
// 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[[7,4,1],[8,5,2],[9,6,3]]
// 示例 2：
// 输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
// 输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
const rotate = (matrix) => {
  const len = matrix.length;
  for (
    let layer = 0 /** layer 表示当前层，从外向内旋转 */;
    layer < Math.floor(len / 2); // n * n的数组 一共就Math.floor(len / 2) 层（一圈为一层）
    layer++
  ) {
    for (
      let offset = layer /**随layer递增 */;
      offset < len - layer - 1 /**随layer递减，变现形式为向内收缩 */;
      offset++
    ) {
      const temp = matrix[layer][offset];
      matrix[layer][offset] = matrix[len - offset - 1][layer]; // 推导出旋转前后相同元素的坐标变化为
      //   原坐标 (i, j) → 新坐标 (j, n-1-i)
      matrix[len - 1 - offset][layer] =
        matrix[len - layer - 1][len - 1 - offset];
      matrix[len - layer - 1][len - offset - 1] =
        matrix[offset][len - layer - 1];
      matrix[offset][len - layer - 1] = temp;
    }
  }
};
// 时间复杂度：O(n^2)，其中 n 是矩阵 matrix 的边长。
// 空间复杂度：O(1)。

// 54. 螺旋矩阵
// 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
// 示例 1：
// 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[1,2,3,6,9,8,7,4,5]
const spiralOrder = (matrix) => {
  if (!matrix.length || !matrix[0].length) return [];
  const res = [];
  let left = 0,
    right = matrix[0].length - 1,
    top = 0,
    bottom = matrix.length - 1;
  while (left <= right && top <= bottom) {
    // 水平从左往右
    for (let i = left; i <= right; i++) {
      res.push(matrix[top][i]);
    }
    // 一行从左到右遍历完 top++
    top++;
    // 垂直从上到下
    for (let i = top; i <= bottom; i++) {
      res.push(matrix[i][right]);
    }
    // 一列从上到下遍历完 right--
    right--;
    // 水平从右往左
    if (top <= bottom) {
      // 确保还有行可以遍历， 防止单行重复
      for (let i = right; i >= left; i--) {
        res.push(matrix[bottom][i]);
      }
      // 一列从右到左遍历完 bottom--
      bottom--;
    }
    // 垂直从下到上
    if (left <= right) {
      // 确保还有列可以遍历， 防止单列重复
      for (let i = bottom; i >= top; i--) {
        res.push(matrix[i][left]);
      }
      left++;
    }
  }
  return res;
};
// 时间复杂度：O(mn)，其中 m 和 n 分别是输入矩阵的行数和列数。矩阵中的每个元素都要被访问一次。
// 空间复杂度：O(1)。除了输出数组以外，空间复杂度是常数。

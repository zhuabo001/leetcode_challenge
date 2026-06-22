// 搜索二维数组ii
// 行： 从左到右依次递增
// 列： 从上到下依次递增
const searchMatrix = (matrix: number[][], target: number) => {
  if (!matrix || matrix.length === 0) return false;
  const m = matrix.length,
    n = matrix[0].length;
  let row = 0,
    col = n - 1;
  while (row < m && col >= 0) {
    if (matrix[row][col] === target) {
      return true;
    } else if (matrix[row][col] > target) {
      col -= 1;
    } else {
      row += 1;
    }
  }
  return false;
};

// 时间复杂度 O(m + n)
// 空间复杂度 O(1)

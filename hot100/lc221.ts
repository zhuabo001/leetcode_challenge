// 最大正方形
const maximalSquare = (matrix: number[][]): number => {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;
  const m = matrix.length,
    n = matrix[0].length;
  const edge = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  let ans = 0;
  // 表示右下角位于(i，j)的全1正方形的最大边长为edge[i][j]
  // edge[i + 1][j + 1] = Math.min(edge[i][j + 1], edge[i + 1][j], edge[i][j]) + 1
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 1) {
        edge[i + 1][j + 1] =
          Math.min(edge[i + 1][j], edge[i][j + 1], edge[i][j]) + 1;
        ans = Math.max(ans, edge[i + 1][j + 1]);
      }
    }
  }
  return ans * ans;
};
// 时间复杂度 O(m * n)
// 空间复杂度 O(m * n)

// 搜索二维矩阵
// 给你一个满足下述两条属性的 m x n 整数矩阵：
// 每行中的整数从左到右按非严格递增顺序排列。
// 每行的第一个整数大于前一行的最后一个整数。
// 给你一个整数 target ，如果 target 在矩阵中，返回 true ；否则，返回 false 。
// 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
// 输出：true
// 示例 2：
// 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
// 输出：false
// 提示：
// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 100
// -104 <= matrix[i][j], target <= 104
const searchMatrix = (matrix, target) => {
  // 矩阵具有特殊的有序性质，所以应该使用二分查找来解决，判断是否存在这样的元素

  const m = matrix.length,
    n = matrix[0].length;

  // 将二维矩阵看作一维有序数组进行二分查找
  let left = 0,
    right = m * n - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const midValue = matrix[Math.floor(mid / n)][mid % n]; // 一维索引mid/n除以列数得到第几行； mid % n取余操作得到第几列

    if (midValue === target) return true;
    else if (midValue < target) left = mid + 1;
    else right = mid - 1;
  }

  return false;
};
// 时间复杂度：O(log(mn))
// 空间复杂度：O(1)

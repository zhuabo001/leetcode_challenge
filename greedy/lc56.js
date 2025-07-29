// 合并区间
// 给出一个区间的集合，请合并所有重叠的区间。
// 示例 1:
// 输入: intervals = [[1,3],[2,6],[8,10],[15,18]]
// 输出: [[1,6],[8,10],[15,18]]
// 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
// 示例 2:
// 输入: intervals = [[1,4],[4,5]]
// 输出: [[1,5]]
// 解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
const merge = (intervals) => {
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    if (intervals[i][0] <= last[1]) {
      // 当前区间的起始位置小于等于上一个区间的结束位置，说明当前区间和上一个区间有重叠
      last[1] = Math.max(last[1], intervals[i][1]); // 合并区间，取两个区间的结束位置的较大值
    } else {
      merged.push(intervals[i]);
    }
  }
  return merged;
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(n)

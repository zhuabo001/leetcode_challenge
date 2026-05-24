// 盛最多水的容器
const maxWater = (heights: number[]): number => {
  let area = 0;
  let left = 0,
    right = heights.length - 1;
  while (left < right) {
    let tempArea = Math.min(heights[left], heights[right]) * (right - left);
    if (tempArea > area) {
      area = tempArea;
    }
    if (heights[left] > heights[right]) {
      right--;
    } else {
      left++;
    }
  }
  return area;
};
// 时间复杂度 O(N)
// 空间复杂度 O(1)

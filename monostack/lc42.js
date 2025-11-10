// 42. 接雨水
// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
// 示例 1：
// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。
const trap = (heights) => {
  const len = heights.length;
  let area = 0;
  const stack = [];
  for (let i = 0; i < len; i++) {
    if (heights[i] < heights[stack[stack.length - 1]]) {
      stack.push(i);
    } else if (heights[i] === heights[stack[stack.length - 1]]) {
      stack.pop(); // 相等高度的柱子，取右边的柱子
      stack.push(i);
    } else {
      while (stack.length && heights[i] > heights[stack[stack.length - 1]]) {
        const top = stack.pop(); // 这个当底部
        if (stack.length === 0) break;
        const left = stack[stack.length - 1]; // 这个当作左边的柱子，left top i 这三者形成一个容器
        const curWidth = i - left + 1;
        const curHeight = Math.min(heights[i], heights[left]) - heights[top];
        area += curWidth * curHeight;
      }
    }
  }
  return area;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

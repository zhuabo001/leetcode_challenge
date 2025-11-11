// 84. 柱状图中最大的矩形
// 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
// 求在该柱状图中，能够勾勒出来的矩形的最大面积。
// 示例 1：
// 输入：heights = [2,1,5,6,2,3]
// 输出：10
// 解释：最大的矩形为图中红色区域，面积为 10
// 示例 2：
// 输入： heights = [2,4]
// 输出： 4
// 单调栈解题的核心是：
//    1. 为每个柱子找到它能扩展到的左右边界**
//    2. 当遇到比当前柱子更矮的柱子时，开始计算高度
//    3. 循环结束后处理剩余栈中的元素
//    4. 考虑栈为空时的边界情况
const largestRectangleArea = (heights) => {
  const stack = [0];
  let maxArea = 0;
  // 为了让栈中元素都能弹栈——头尾的柱子都能进行相邻性比较，在heights数组头和尾各添加一个0
  const len = heights.length;
  heights.push(0); // 数组本身是升序的， 不加这个0那么就一直无法进入else分支语句
  stack.unshift(0); // 数组本身是降序的， 不加这个0那么就一直无法弹栈
  for (let i = 0; i < len; i++) {
    if (
      heights[i] >
      heights[
        stack[stack.length - 1]
      ] /** 本题要找到第一个比heights[i]小的元素 */
    ) {
      stack.push(i);
    } 
    if (heights[i] === heights[stack[stack.length - 1]]) {
      stack.pop(); // 相等的话，弹出，保留第一个，因为要计算宽度
      stack.push(i);
    } 
    if (heights[i] < heights[stack[stack.length - 1]]) {
      while (
        stack.length &&
        heights[i] <
          heights[
            stack[stack.length - 1]
          ] /** 找到了第一个小于当前柱子高度的元素 */
      ) {
        const top = stack.pop();
         // 弹栈时，当前柱子位置是右边界，栈顶下一个位置是左边界
         const left = stack[stack.length - 1];
         const right = i;
         const width = right - left - 1;
         const height = heights[top];
         maxArea = Math.max(maxArea, width * height);
        
      }
      stack.push(i);
    }
  }
  return maxArea;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

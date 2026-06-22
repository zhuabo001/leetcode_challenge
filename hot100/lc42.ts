function trap(heights: number[]): number {
  if (heights.length === 0) return 0;
  let area = 0;
  const stack: number[] = [];
  for (let i = 0; i < heights.length; i++) {
    while (stack.length && heights[i] > heights[stack[stack.length - 1]]) {
      const middleBottom = stack.pop() as number;
      // 空栈保护！！lc739不需要空栈保护是因为 除了弹出的栈顶元素本身 不用拿剩下的栈中元素
      // 但是本题要取下一个栈顶元素，所以必须要有空栈保护
      if (stack.length === 0) break;
      const left = stack[stack.length - 1];
      const width = i - left - 1;
      area +=
        width * (Math.min(heights[i], heights[left]) - heights[middleBottom]);
    }
    stack.push(i);
  }
  return area;
}

// 时间复杂度 O(n)
// 空间复杂度 O(n)

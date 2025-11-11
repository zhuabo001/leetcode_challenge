// 调试版本，添加了错误检查
const largestRectangleArea = (heights) => {
  const len = heights.length;
  const stack = [];
  let maxArea = 0;
  
  for (let i = 0; i < len; i++) {
    // 检查栈是否为空
    if (stack.length === 0) {
      stack.push(i);
      continue;
    }
    
    if (
      heights[i] >
      heights[stack[stack.length - 1]]
    ) {
      stack.push(i);
    } else if (heights[i] === heights[stack[stack.length - 1]]) {
      stack.pop(); // 相等的话，弹出，保留第一个，因为要计算宽度
      stack.push(i);
    } else {
      while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
        const top = stack.pop();
        if (stack.length) {
          const left = stack[stack.length - 1];
          const right = i;
          const width = right - left - 1;
          const height = heights[top];
          maxArea = Math.max(maxArea, width * height);
        } else {
          // 栈为空的情况，当前索引就是右边界，左边界是0
          const width = i;
          const height = heights[top];
          maxArea = Math.max(maxArea, width * height);
        }
      }
      stack.push(i);
    }
  }
  
  // 处理剩余的栈元素
  while (stack.length) {
    const top = stack.pop();
    if (stack.length) {
      const left = stack[stack.length - 1];
      const right = len;
      const width = right - left - 1;
      const height = heights[top];
      maxArea = Math.max(maxArea, width * height);
    } else {
      const width = len;
      const height = heights[top];
      maxArea = Math.max(maxArea, width * height);
    }
  }
  
  return maxArea;
};

console.log("修复后的测试结果:");
console.log("测试案例 1:", largestRectangleArea([2,1,5,6,2,3]), "期望: 10");
console.log("测试案例 2:", largestRectangleArea([2,4]), "期望: 4");
console.log("测试案例 3:", largestRectangleArea([0,0,0]), "期望: 0");
console.log("测试案例 4:", largestRectangleArea([2,1,2]), "期望: 3");
console.log("测试案例 5:", largestRectangleArea([1,2,3,4,5]), "期望: 9");
console.log("边界测试 1:", largestRectangleArea([1]), "期望: 1");
console.log("边界测试 2:", largestRectangleArea([5,4,3,2,1]), "期望: 9");
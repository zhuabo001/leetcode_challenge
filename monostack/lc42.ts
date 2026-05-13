// 接雨水
function trap2(heights: number[]): number {
  if (heights.length === 0) return 0;
  let area = 0;
  const stack = [];
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] < heights[stack[stack.length - 1]]) {
      stack.push(i);
    } else if (heights[i] === heights[stack[stack.length - 1]]) {
      stack.pop();
      stack.push(i); // 高度相同时选更远的那个
    } else {
      while (stack.length && heights[i] > heights[stack[stack.length - 1]]) {
        const bottom = stack.pop() as number; // 找出低洼高度
        if (stack.length === 0) break;
        const left = stack[stack.length - 1];
        const width = i - left - 1;
        area +=
          width *
          (Math.min(heights[i], heights[left]) /** 更低的和低洼处的高度差 */ -
            heights[bottom]);
      }
      stack.push(i);
    }
  }
  return area;
}

// 时间复杂度: O(n)
// - 每个元素入栈一次、出栈至多一次
// - while 循环的总执行次数不超过出栈总次数，即 O(n)

// 空间复杂度: O(n)
// - 单调栈在最坏情况下（严格递减序列）存储 n 个索引

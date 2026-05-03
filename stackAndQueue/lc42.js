// 接雨水单调栈解法
const trap = (heights) => {
  let res = 0, stack = [];
  for(let i = 0; i < heights.length; i++){
    while(stack.length && heights[i] > heights[stack[stack.length - 1]]){
      const top = stack.pop();
      if(stack.length === 0) break;
      let left = stack[stack.length - 1]; // 单调栈中次顶元素
      let curWidth = i - left - 1;
      let curHeight = Math.min(heights[i], heights[left]) - heights[top];
      res += curHeight * curWidth;
    }
    stack.push(i);
  }
  return res;
};

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]))
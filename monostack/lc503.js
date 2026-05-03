// 503. 下一个更大元素 II
// 给定一个循环数组 nums （ nums[nums.length - 1] 的下一个元素是 nums[0] ），返回 nums 中每个元素的 下一个更大元素 。
// 数字 x 的 下一个更大的元素 是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1 。

var nextGreaterElements = function (nums) {
  // 核心思路： 结果数组res和输入数组相同长度；
  // 遍历两遍输入数组模拟循环，i < 2 * nums.length;
  const len = nums.length;
  const res = new Array(len).fill(-1);
  const stack = [];
  for (let i = 0; i < 2 * len; i++) {
    if (nums[i % len] < nums[stack[stack.length - 1]]) {
      stack.push(i % len);
    } else if (nums[i % len] === nums[stack[stack.length - 1]]) {
      stack.push(i % len);
    } else {
      while (stack.length && nums[i % len] > nums[stack[stack.length - 1]]) {
        const index = stack.pop();
        res[index] = nums[i % len];
      }
      stack.push(i % len);
    }
  }
  return res;
};

// 示例测试
// console.log(nextGreaterElements([1, 2, 1])); // [2, -1, 2]
// console.log(nextGreaterElements([1, 2, 3, 4, 3])); // [2, 3, 4, -1, 4]

// 时间复杂度：O(n) - 每个元素最多入栈出栈一次
// 空间复杂度：O(n) - 栈和结果数组的空间

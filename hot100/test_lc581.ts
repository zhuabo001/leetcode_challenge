const findUnsortedSubArray = (nums: number[]): number => {
  if (nums.length === 0 || nums.length === 1) return 0;
  let leftBoundry = Infinity,
    rightBoundry = 0;
  let maxSeen = 0;
  const stack: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    maxSeen = Math.max(maxSeen, nums[i]);
    if (maxSeen > nums[i]) {
      rightBoundry = i;
    }
    if (nums[i] > nums[stack[stack.length - 1]]) {
      stack.push(i);
    } else if (nums[i] === nums[stack[stack.length - 1]]) {
      stack.push(i);
    } else {
      while (stack.length && nums[i] < nums[stack[stack.length - 1]]) {
        const top = stack.pop() as number;
        leftBoundry = Math.min(leftBoundry, top);
      }
      stack.push(i);
    }
  }
  return leftBoundry === Infinity ? 0 : rightBoundry - leftBoundry + 1;
};

// 测试用例
const tests = [
  { input: [2,6,4,8,10,9,15], expected: 5 },
  { input: [1,2,3,4], expected: 0 },
  { input: [2,2,2], expected: 0 },
  { input: [1,3,2,2,2], expected: 4 },
  { input: [-5, -4, -3, -2], expected: 0 },
  { input: [-5, -4, -10], expected: 3 },
  { input: [-1, 0], expected: 0 },
  { input: [1, 0, -1], expected: 3 },
  { input: [0, -1], expected: 2 },
  { input: [1,2,3,3,3], expected: 0 },
  { input: [2,1], expected: 2 },
  { input: [1,2,4,5,3], expected: 3 },
];

for (const t of tests) {
  const result = findUnsortedSubArray(t.input);
  const pass = result === t.expected;
  console.log(`${pass ? '✅' : '❌'} [${t.input.join(',')}] => ${result}, expected ${t.expected}`);
}

function dailyTemperature(temperatures: number[]): number[] {
  if (temperatures.length === 0) return [];
  const res: number[] = new Array(temperatures.length).fill(0);
  const stack: number[] = [];
  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const top = stack.pop() as number;
      res[top] = i - top;
    }
    stack.push(i);
  }
  return res;
}
// 时间复杂度 O(n) —— 最坏情况所有元素进一次栈
// 空间复杂度 O(n)

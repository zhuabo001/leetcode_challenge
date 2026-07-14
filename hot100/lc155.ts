// 最小栈
// 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
// 实现 MinStack 类:
// MinStack() 初始化堆栈对象。
// void push(int value) 将元素 value 推入堆栈。
// void pop() 删除堆栈顶部的元素。
// int top() 获取堆栈顶部的元素。
// int getMin() 获取堆栈中的最小元素。

class MinStack {
  stack: number[];
  min_stack: number[];
  constructor() {
    this.stack = [];
    this.min_stack = [Infinity];
  }
  push(val: number) {
    this.stack.push(val);
    this.min_stack.push(
      Math.min(val, this.min_stack[this.min_stack.length - 1])
    );
  }
  pop() {
    this.stack.pop();
    this.min_stack.pop();
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
  getMin() {
    return this.min_stack[this.min_stack.length - 1];
  }
}

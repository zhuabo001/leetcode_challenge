// 请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）：
// 实现 MyQueue 类：
// void push(int x) 将元素 x 推到队列的末尾
// int pop() 从队列的开头移除并返回元素
// int peek() 返回队列开头的元素
// boolean empty() 如果队列为空，返回 true ；否则，返回 false
/**
 * Initialize your data structure here.
 */
const MyQueue = function () {
    this.stackIn = [];
    this.stackOut = [];
};
/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
    this.stackIn.push(x);
};
MyQueue.prototype.pop = function () {
    const size = this.stackOut.length;
    if(size){
        this.stackOut.pop();
    }
    while(this.stackIn.length){
        // 将stackIn中的元素全部推入stackOut中
        // 这样stackOut中的元素顺序就和stackIn中的元素顺序相反了
        // 这样就可以实现队列的先进先出了
        this.stackOut.push(this.stackIn.pop());
    }
    return this.stackOut.pop();
};
MyQueue.prototype.peek = function () { /** 用于返回队列的头部元素 */
    return this.stackOut[this.stackOut.length - 1] /**stackOut的最后一个元素是第一个被推入的元素 */ || this.stackIn[0] /** 第一个被推入的元素 */;
};
MyQueue.prototype.empty = function () {
    return !this.stackIn.length && !this.stackOut.length;
};
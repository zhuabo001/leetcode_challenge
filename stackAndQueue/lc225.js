// 用队列实现栈
/**
 * Initialize your data structure here.
 */
var MyStack = function() {
    this.queue = []; // 用一个队列实现栈
    // 只要将队列的头部元素（除了最后一个元素）取出，再将其重新加入队列，就可以实现栈的后进先出
    // 例如：队列 [1, 2, 3, 4]，取出 1、2、3，再将 1、2、3 加入队列，队列变为 [4, 1, 2, 3]，实现了栈的后进先出
};
/**
 * Push element x onto stack.
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
    this.queue.push(x);
};

MyStack.prototype.pop = function() {
    let size = this.queue.length;
    while(size-- > 1){
        this.queue.push(this.queue.shift()); // 将队列头部元素（除了最后一个元素）取出，再将其重新加入队列
    }
    return this.queue.shift(); // 返回的元素就是之前最后一个推进队列的元素
};
MyStack.prototype.top = function() {
    const topElement = this.pop();
    this.queue.push(topElement); // 将取出的元素重新加入队列,因为top方法只是为了获取栈顶元素，所以不需要将其弹出队列，保持原来的队列顺序
    return topElement;
}
MyStack.prototype.empty = function() {
    return !this.queue.length;
}

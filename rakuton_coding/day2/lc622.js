// 622. 设计循环队列
// 设计你的循环队列实现。 循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为“环形缓冲器”。
// 循环队列的一个好处是我们可以利用这个队列之前用过的空间。在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。
// 你的实现应该支持如下操作：
// MyCircularQueue(k): 构造器，设置队列长度为 k 。
// Front: 从队首获取元素。如果队列为空，返回 -1 。
// Rear: 获取队尾元素。如果队列为空，返回 -1 。
// enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
// deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
// isEmpty(): 检查循环队列是否为空。
// isFull(): 检查循环队列是否已满。
// 输入：
// ["MyCircularQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]
// [[3], [1], [2], [3], [], [], [], [4], []]
// 输出：
// [null, true, true, true, 3, true, true, true, 4]
// 解释：
// MyCircularQueue circularQueue = new MyCircularQueue(3); // 设置长度为 3
// circularQueue.enQueue(1);  // 返回 true
// circularQueue.enQueue(2);  // 返回 true
// circularQueue.enQueue(3);  // 返回 true
// circularQueue.Rear();  // 返回 3
// circularQueue.isFull();  // 返回 true
// circularQueue.deQueue();  // 返回 true
// circularQueue.enQueue(4);  // 返回 true
// circularQueue.Rear();  // 返回 4
// 提示：
// 1 <= k <= 1000
// 0 <= value <= 1000
// 最多可以调用 enQueue、deQueue、Front、Rear、isEmpty、isFull 方法 500 次
const MyCircularQueue = function (k) {
  this.queue = new Array(k); // 队列数组
  this.head = 0; // 队头指针
  this.tail = 0; // 队尾指针
  this.size = k; // 队列长度
  this.count = 0; // 队列当前元素数量
};
// 获取队首元素
MyCircularQueue.prototype.Front = function () {
  if (this.isEmpty()) return -1;
  return this.queue[this.head];
};
// 获取队尾元素
MyCircularQueue.prototype.Rear = function () {
  if (this.isEmpty()) return -1;
  // 步骤1：this.tail - 1
  // 步骤2：+ this.size (确保结果为正数)
  // 步骤3：% this.size (取模得到正确的循环索引)
  //   通过加上 this.size ，我们确保：
  // - 即使 this.tail - 1 是负数
  // - this.tail - 1 + this.size 也会是非负数
  // - 最后取模得到正确的循环索引
  const rearIndex = (this.tail - 1 + this.size) % this.size;
  return this.queue[rearIndex];
};
// 通用模式
// 处理 循环数组负索引 的标准模式：const safeIndex = (index + arraySize) % arraySize;
// 插入一个元素，成功插入则返回true
MyCircularQueue.prototype.enQueue = function (value) {
  // 插入一个元素，队尾指针tail循环移动 tail = (tail + 1) % size
  if (this.isFull()) return false;
  this.queue[this.tail] = value;
  this.tail = (this.tail + 1) % this.size;
  this.count++;
  return true;
};
// 删除一个元素，成功删除则返回true
MyCircularQueue.prototype.deQueue = function () {
  // 删除一个元素，队头指针head循环移动 head = (head + 1) % size
  if (this.isEmpty()) return false;
  // 2. 核心操作：head指针循环向前移动
  this.head = (this.head + 1) % this.size; // 数据其实还是在，只是逻辑上删除了
  // - 当 head < size-1 时： head 正常递增
  // - 当 head = size-1 时： head 变为 0（回到数组开头）
  // 3. 更新计数器
  this.count--;
  return true;
};
// 检查队列是否为空
MyCircularQueue.prototype.isEmpty = function () {
  return this.count === 0;
};
// 检查队列是否已满
MyCircularQueue.prototype.isFull = function () {
  return this.count === this.size;
};
// 时间复杂度：O(1)
// 空间复杂度：O(n)

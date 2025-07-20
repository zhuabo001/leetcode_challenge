// URL_ADDRESScode.cn/problems/sliding-window-maximum/
// 滑动窗口最大值
// 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
// 返回滑动窗口中的最大值。 
// 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
// 输出：[3,3,5,5,6,7]

// 单调队列
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
class MonoQueue { /** 单调队列 */
    queue;
    constructor() {
        this.queue = [];
    }
    // 入队时保证单调递减
    enqueue(val){
        let back = this.queue[this.queue.length - 1]; // 获取队尾元素
        // 如果新元素大于队尾元素，则将队尾元素出队，直到队列为空或者新元素小于队尾元素
        while(back !== undefined && back < val){
            this.queue.pop();
            back = this.queue[this.queue.length - 1];
        }
        this.queue.push(val);
    }
    // 出队时如果当前窗口左侧的元素等于队首元素，则将队首元素出队
    dequeue(val) {
        let front = this.front();
        if(front === val){/** 如果窗口左边界的元素正好是在队列中，则需要出队 */
            this.queue.shift();
        }
        // 如果窗口左边界的元素不是在队列中，则不需要出队
    }
    // 获取队首元素, 也就是滑动窗口内的最大值（因为维持了一个单调递减的队列）
    front() {
        return this.queue[0];
    }
}
var maxSlidingWindow = function (nums, k) {
  let helperQueue = new MonoQueue(); // 维护一个单调递减的队列
  let i = 0, j = 0; // 滑动窗口的左右边界
  let res = [];
  while(j < k) {/** 先将第一个窗口内的元素入队 */
    helperQueue.enqueue(nums[j]);
    j++;
  }
  res.push(helperQueue.front()); // 将第一个窗口内的最大值入队
  while(j < nums.length){
    helperQueue.enqueue(nums[j]); // 入队
    helperQueue.dequeue(nums[i]); // 判断是否需要出队——不一定要出队
    res.push(helperQueue.front()); // 将最大值入队
    i++;
    j++;
  }
  return res;
}
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3));
// 时间复杂度：O(n)
// 空间复杂度：O(k)
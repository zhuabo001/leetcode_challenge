import {
    PriorityQueue,
    MinPriorityQueue,
    MaxPriorityQueue,
    PriorityQueueOptions, // queue options interface
    PriorityQueueItem // queue item interface for min/max queue
  } from '@datastructures-js/priority-queue';
var topKFrequentTool = function (nums, k) { /** 使用js内置的PriorityQueue */
  const map = new Map();
  let res = [];
  for(const num of nums) {
    map.set(num, map.get(num) + 1 || 0);
  }
  const heap = new PriorityQueue({
    // 返回值 < 0: a 的优先级高于 b
    // 返回值 > 0: b 的优先级高于 a
    // 返回值 = 0: 优先级相同
    // 优先队列在内部维护堆结构时，会把 优先级高 的元素放在更靠近堆顶的位置
    // 此代码中value值越小，优先级越高（大顶堆相反）
    compare: (a, b) => a.value - b.value /**这里用小顶堆来维护当前出现频率最高的k个元素。堆顶是频率最小的元素 */
    // compare: (a, b) => b.value - a.value /**这就是一个大顶堆*/  
    });
  for(const [key, value] of map) {
    heap.enqueue({key, value});
    if(heap.size() > k) {
        heap.dequeue();
    }
  }
  while(heap.size()) {
    res.push(heap.dequeue().key);
  }
  return res;
}
// 时间复杂度：O(nlogk)
// 空间复杂度：O(n)
console.log(topKFrequentTool([1,1,1,2,2,3], 2));
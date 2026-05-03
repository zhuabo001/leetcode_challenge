// 前k个高频元素
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
  // 统计出现次数
  const map = new Map();
  for(const num of nums){
      map.set(num, (map.get(num) || 0) + 1);
  }
  // 如果元素数量少于k
  if(map.size <= k) {
      return [...map.keys()];
  }
  // 如果元素数量大于k，遍历map，构建小顶堆
  const res = [];
  let len = 0; // len是res的长度
  map.forEach((value, key) => {
      if(len < k){
          // 取前k个建堆，此时没到k个，插入堆
          res.push(key);
          // 因为len是从0开始的，所以此时堆中已经有k个元素了，原地建堆
          if(len === k - 1) {
              buildHeap(res, map, k)
          }
      } else {
          if(map.get(res[0]) < value){
              res[0] = key; // 小顶堆的顶部为最小，如果有比它更大的就更改，相当于找到了频率更高的元素，弹出了原先频率更小的元素；
              heapify(res, map, k, 0); // 更改堆顶元素破坏了堆结构，执行heapify重新调整
          }
      }
      len += 1;
  });
  return res;
  
};
// 将数组变为堆（是一个调整堆的过程）
function heapify(heap, map, k, index) {
  let left = index * 2 + 1, right = index * 2 + 2;
  let minIndex = index;
  if(map.get(heap[left]) < map.get(heap[minIndex]) && left < k){
      minIndex = left;
  }
  if(map.get(heap[right]) < map.get(heap[minIndex]) && right < k){
      minIndex = right;
  }
  if(minIndex !== index){
      [heap[minIndex], heap[index]] = [heap[index], heap[minIndex]];
      heapify(heap, map, k, minIndex);
  }
}
// 构建堆
function buildHeap(arr, map, k) {
    for(let i = Math.floor(arr.length / 2); i >= 0; i--){
        heapify(arr, map, k, i);
    }
}

const result = topKFrequent([1, 1, 1, 2, 3, 3], 2);
console.log('result', result);
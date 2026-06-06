// 前k个高频元素
const topKFrequent = (nums: number[], k: number) => {
  const map = new Map();
  for (const num of nums) {
    map.set(num, map.has(num) ? map.get(num) + 1 : 1);
  }
  if (map.size < k) {
    return [...map.keys()];
  }

  // sink
  const heapify = (heap, map, index, k) => {
    let left = 2 * index + 1,
      right = 2 * index + 2;
    let minIndex = index;
    if (
      left < k /**防止数组越界，将边界判断提前 */ &&
      map.get(heap[left]) < map.get(heap[minIndex])
    ) {
      minIndex = left;
    }
    if (right < k && map.get(heap[right]) < map.get(heap[minIndex])) {
      minIndex = right;
    }

    if (heap[minIndex] !== heap[index]) {
      [heap[minIndex], heap[index]] = [heap[index], heap[minIndex]];
      heapify(heap, map, minIndex, k);
    }
  };

  // 建堆
  const buildHeap = (arr: number[], map: any, k: number) => {
    for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
      heapify(arr, map, i, k);
    }
  };

  const res: number[] = [];
  let len = 0;
  map.forEach((value, key) => {
    if (len < k) {
      // 取前k个建堆，此时没到k个，插入堆
      res.push(key);
      if (len === k - 1) {
        // 因为len是从0开始的，所以此时堆中已经有k个元素了，原地建堆
        buildHeap(res, map, k);
      }
    } else {
      // 此时res数组已经到满了，所以要及时替换小顶堆内的元素
      if (map.get(res[0]) < value) {
        // 小顶堆顶部是最小的 - 也就是说res[0]的频率比较低，应该要将更高的频率纳入res数组
        res[0] = key;
        // 破坏了小顶堆所以要重新建堆
        heapify(res, map, 0, k);
      }
    }
    len += 1;
  });
  return res;
};
// 时间复杂度 O(n + nlogk) = O(nlogk)
// 空间复杂度 O(n + K) = O(n)

//   - 先用 Map 统计频率
//   - 维护一个大小为 k 的最小堆，堆顶是当前第 k 高的频率
//   - 遇到更高频率的元素就替换堆顶并下沉调整
//   - 最终堆里就是前 k 个高频元素

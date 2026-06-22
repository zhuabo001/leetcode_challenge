// 数组中第k大的元素
const theKthLargestNum = (nums: number[], k: number): number => {
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  // sink, 下沉
  // 下标 i 的节点的左孩子在 2i+1，右孩子在 2i+2，父节点在 Math.floor((i-1)/2)
  const maxHeapify = (arr: number[], index: number, heapSize: number) => {
    let left = 2 * index + 1,
      right = 2 * index + 2;
    let larger = index;
    if (left < heapSize && arr[left] > arr[larger]) {
      larger = left;
    }
    if (right < heapSize && arr[right] > arr[larger]) {
      larger = right;
    }

    if (larger !== index) {
      swap(arr, index, larger);
      maxHeapify(arr, larger, heapSize);
    }
  };

  // 构建堆
  const buildHeap = (arr: number[], heapSize: number) => {
    for (let index = Math.floor(heapSize / 2) - 1; index >= 0; index--) {
      maxHeapify(arr, index, heapSize);
    }
  };

  let heapSize = nums.length;
  buildHeap(nums, heapSize);
  for (let i = nums.length - 1; i >= nums.length - (k - 1); i--) {
    swap(nums, 0, i); // 此时0处就是当前最大的数字，和i处交换，就是将最大的数字丢到最尾部，因为i是倒序
    heapSize -= 1; // 这就是弹出那个最大的数
    maxHeapify(nums, 0, heapSize); // 下沉，恢复为一个大顶堆
  }
  return nums[0];
};

// 时间复杂度 O(n + k log n) k = 1时，只建堆但是不弹 O(n), k = n时 退化为O(nlogn)
// 空间复杂度  O(1)

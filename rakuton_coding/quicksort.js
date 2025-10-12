// 快速排序模版
const sortArray = (nums) => {
  if (nums.length === 0) return [];
  // 快速排序
  const quickSort = (arr, left, right) => {
    if (left < right) {
      const pivotIndex = partition(arr, left, right);
      quickSort(arr, left, pivotIndex - 1);
      quickSort(arr, pivotIndex + 1, right);
    }
  };
  // 分区函数
  const partition = (arr, left, right) => {
    const pivot = arr[right];
    let i = left - 1; // 小于基准值的区域边界， 其实就是[left, right] 这个区间的左侧区间的最右侧
    for (let j = left; j < right; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1; // 返回基准值的最终位置
  };
  quickSort(nums, 0, nums.length - 1);
  return nums;
};
console.log(sortArray([5, 2, 3, 1]));

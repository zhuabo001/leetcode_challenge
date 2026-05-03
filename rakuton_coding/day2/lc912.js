// 排序数组
// 给你一个整数数组 nums，请你将该数组升序排列。你必须在 不使用任何内置函数 的情况下解决问题，
// 时间复杂度为 O(nlog(n))，并且空间复杂度尽可能小 —— 快速排序，空间复杂度为 O(logn)，归并排序和堆排序为 O(n)
// 示例 1：
// 输入：nums = [5,2,3,1]
// 输出：[1,2,3,5]
// 示例 2：
// 输入：nums = [5,1,1,2,0,0]
// 输出：[0,0,1,1,2,5]
// 提示：
// 1 <= nums.length <= 5 * 104
// -5 * 104 <= nums[i] <= 5 * 104
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
  const partition = (arr, left, right) => {
    // 选择右边作为基准值
    const pivot = arr[right];
    let i = left - 1; // 小于基准值的区域边界， 其实就是[left, right] 这个区间的左侧区间的最右侧
    for (let j = left; j < right; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    // 将基准值放到正确位置
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1; // 返回基准值的最终位置
  };
  quickSort(nums, 0, nums.length - 1);
  return nums;
};
// - 1.
// i 的作用 ：维护"≤pivot区域"的右边界
// - 2.
// 为什么从 left-1 开始 ：初始时该区域为空
// - 3.
// 交换逻辑 ：遇到 ≤pivot 的元素就扩展该区域
// - 4.
// 最终交换 ：将 pivot 放到分界点，完成分区
// 时间复杂度：O(nlogn)
// 空间复杂度：O(logn)

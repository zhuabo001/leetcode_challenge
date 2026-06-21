// 颜色分类
// 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地 对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
// 我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
// 必须在不使用库内置的 sort 函数的情况下解决这个问题。

const swap = (arr: number[], i: number, j: number) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

const colorSort = (nums: number[]): void => {
  let left = 0 /**left 永远卡在0区域的尾巴+1的位置上 */,
    right = nums.length - 1,
    i = 0; // 需要三个指针，两个来界定0和2的边界,一个负责扫描
  while (i <= right) {
    if (nums[i] === 0) {
      swap(nums, i, left);
      left++;
      i++; // 因为从left位置的值已经先前被i扫过了，所以它不可能是0或2
    } else if (nums[i] === 1) {
      // 不用交换直接移动i继续扫
      i++;
    } else {
      swap(nums, i, right);
      right--; // 不移动i是因为不确定此时i位置上的数字是什么，因为是从right位置换过来的
    }
  }
};
// 时间复杂度 O(N)
// 空间复杂度 O(1)

// 思路摘要：
// 荷兰国旗问题（Dutch National Flag），三指针原地分区
//
// 指针分工：
//   left:  0 的右边界，[0, left) 全是 0
//   right: 2 的左边界，(right, n-1] 全是 2
//   i:     当前扫描位置，[left, i) 全是 1（已处理）
//
// 三条规则：
//   nums[i] === 0 → swap(i, left), left++, i++     （left 换来的必是 1，理由： 发现 0 → swap(i, left) → left++ → i++，可以看出来left绝不会停在0上，i 安全前进）
//   nums[i] === 1 → i++                             （1 本来就在中间）
//   nums[i] === 2 → swap(i, right), right--          （right 换来的未知，i 原地待命）
//
// 循环条件：while (i <= right)，i > right 时待处理区为空
//
// 为什么 0 的 case 里 i++ 安全？
//   left 位置的数已经被 i 扫过，不可能是 0 或 2 → 一定是 1
// 为什么 2 的 case 里 i 不能动？
//   right 位置的数从未被 i 扫过，可能是 0/1/2 → 必须下一轮再看

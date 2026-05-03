// 496. 下一个更大元素 I
// 给你两个 没有重复元素 的数组 nums1 和 nums2 ，
// 其中nums1 是 nums2 的子集。
// 请你找出 nums1 中每个元素在 nums2 中的下一个比其大的值。
// nums1 中数字 x 的下一个更大元素是指 x 在 nums2 中对应位置的右边的第一个比 x 大的元素。
// 如果不存在，对应位置输出 -1 。
// 示例 1：
// 输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
// 输出：[-1,3,-1]
// 解释：nums1 中每个值的下一个更大元素如下所述：
// 4 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
// 1 ，用加粗斜体标识，nums2 = [1,3,4,2]。下一个更大元素是 3 。
// 2 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
// 示例 2：
// 输入：nums1 = [2,4], nums2 = [1,2,3,4].
// 输出：[3,-1]
// 解释：nums1 中每个值的下一个更大元素如下所述：
// 2 ，用加粗斜体标识，nums2 = [1,2,3,4]。下一个更大元素是 3 。
// 4 ，用加粗斜体标识，nums2 = [1,2,3,4]。不存在下一个更大元素，所以答案是 -1 。

var nextGreaterElement = function (nums1, nums2) {
  if (nums2.length === 0) return [];
  const stack = [];
  const map = new Map();
  const res = new Array(nums1.length).fill(-1);
  for (let i = 0; i < nums1.length; i++) {
    map.set(nums1[i], i);
  }
  stack.push(0);
  for (let i = 1; i < nums2.length; i++) {
    if (nums2[i] < nums2[stack[stack.length - 1]]) {
      stack.push(i);
    } else if (nums2[i] === nums2[stack[stack.length - 1]]) {
      stack.push(i);
    } else {
      while (stack.length && nums2[i] > nums2[stack[stack.length - 1]]) {
        if (map.has(nums2[stack[stack.length - 1]])) {
          const index = map.get(nums2[stack[stack.length - 1]]);
          res[index] = nums2[i];
        }
        stack.pop();
      }
      stack.push(i);
    }
  }
  return res;
};
// 时间复杂度：O(n) - 每个元素最多入栈出栈一次
// 空间复杂度：O(n) - 栈的空间

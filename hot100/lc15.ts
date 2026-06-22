// 三数之和
const sumOfThreeNums = (nums: number[]) => {
  const len = nums.length;
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < len; i++) {
    let left = i + 1,
      right = len - 1;
    const a = nums[i];
    if (a > 0) break;
    if (a === nums[i - 1]) continue;
    while (left < right) {
      const b = nums[left],
        c = nums[right];
      const sum = a + b + c;
      if (sum < 0) {
        left++;
      } else if (sum > 0) {
        right--;
      } else {
        res.push([a, b, c]);
        while (left < right && b === nums[left + 1]) {
          left++;
        }
        while (left < right && c === nums[right - 1]) {
          right--;
        }
        left++;
        right--;
      }
    }
  }
  return res;
};
// 时间复杂度 O(nlogn + n ^ 2) = O(n^2);
// 空间复杂度 O(logn + n); logn是排序栈的大小；

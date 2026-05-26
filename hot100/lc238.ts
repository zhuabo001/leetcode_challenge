// 除自身之外的乘积
const productExceptSelf = (nums: number[]) => {
  if (nums.length === 0) return [];
  if (nums.length === 1) return [nums[0]];
  const ans = [];
  let prefix = 1,
    suffix = 1;
  for (let i = 0; i < nums.length; i++) {
    prefix = prefix * nums[i - 1];
    ans[i] = prefix;
  }
  for (let j = nums.length - 1; j >= 0; j--) {
    suffix = suffix * nums[j + 1];
    ans[j] = ans[j] * suffix;
  }
  return ans;
};
// 时间复杂度 O(n)
// 空间复杂度 O(1) —— 输出的结果数组不计入复杂度计算

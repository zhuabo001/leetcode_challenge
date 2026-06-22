// 除自身之外的乘积
const productExceptSelf = (nums: number[]) => {
  if (nums.length === 0) return [];
  if (nums.length === 1) return [nums[0]];
  const ans = [];
  let prefix = 1,
    suffix = 1;
  for (let i = 0; i < nums.length; i++) {
    ans[i] = prefix;
    prefix *= nums[i];
  }
  for (let j = nums.length - 1; j >= 0; j--) {
    ans[j] *= suffix;
    suffix *= nums[j];
  }
  return ans;
};
// 时间复杂度 O(n)
// 空间复杂度 O(1) —— 输出的结果数组不计入复杂度计算

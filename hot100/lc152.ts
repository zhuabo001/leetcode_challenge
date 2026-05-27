// 乘积最大的子数组
const maxProduct = (nums: number[]) => {
  const maxDp = new Array(nums.length + 1).fill(0),
    minDp = new Array(nums.length + 1).fill(0);
  let ans = -Infinity;
  maxDp[0] = 1;
  minDp[0] = 1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= 0) {
      maxDp[i + 1] = Math.max(maxDp[i] * nums[i], nums[i]);
      minDp[i + 1] = Math.min(minDp[i] * nums[i], nums[i]);
    } else {
      maxDp[i + 1] = Math.max(minDp[i] * nums[i], nums[i]);
      minDp[i + 1] = Math.min(maxDp[i] * nums[i], nums[i]);
    }
    ans = Math.max(ans, maxDp[i + 1]);
  }
  return ans;
};

// 时间复杂度 O(n)
// 空间复杂度 O(n)

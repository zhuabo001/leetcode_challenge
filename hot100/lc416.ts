// 分割等和子集
const canPartition = (nums: number[]) => {
  const sum = nums.reduce((pre, cur) => pre + cur, 0);
  if (sum % 2 === 1) {
    return false;
  }
  const target = Math.floor(sum / 2);
  const maxNum = Math.max(...nums);
  if (target < maxNum) return false;
  // 现在就是看是否能挑选出一些元素组成和为target
  // dp[i][j] 代表了从[0, i]中是否可以选取到数字组合成和为j的组合, 选取的个数可以是0个
  const dp = new Array(nums.length)
    .fill(false)
    .map(() => new Array(target + 1).fill(false));
  for (let i = 0; i < nums.length; i++) {
    dp[i][0] = true;
  }
  dp[0][nums[0]] = true;
  for (let i = 1; i < nums.length; i++) {
    let num = nums[i];
    for (let j = 1; j <= target; j++) {
      if (j >= nums[i]) {
        dp[i][j] =
          dp[i - 1][j] /**不选nums[i] */ || dp[i - 1][j - num] /**选nums[i] */;
      } else {
        dp[i][j] = dp[i - 1][j]; // 因为此时nums[i] 比目标和j大, 所以无法选中nums[i];
      }
    }
  }
  return dp[nums.length - 1][target];
};

// 时间复杂度 O(n x target)
// 空间复杂度 O(n x target)

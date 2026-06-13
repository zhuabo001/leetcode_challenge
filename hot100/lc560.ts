// 和为k的子数组
// 给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数
const numOfSubArray = (nums: number[], k: number): number => {
  if (nums.length === 0) return 0;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum === k) {
        count += 1;
      }
    }
  }
  return count;
};
// 时间复杂度 O(n ^ 2)
// 空间复杂度 O(1)

const sumOfSubArrayNew = (nums: number[], k: number) => {
  // 前缀和
  // 要找sum[i, j], 就是sum[...j] - sum[...i - 1]
  // 本题就是考察sum[i, j] === k 的个数
  let count = 0;
  let prefixSum = 0;
  const map = new Map();
  map.set(0, 1);
  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i]; // 先更新前缀和
    const times = map.get(prefixSum - k) || 0; // 看看符合目标的前缀和是否出现过 也就是找 sum[...i - 1] = sum[,,,j] - sum[i, j]
    count += times;
    map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
  }
  return count;
};

// 时间复杂度 O(n)
// 空间复杂度 O(n)

// 只出现一次的数字
const findNumOnlyOnce = (nums: number[]) => {
  if (nums.length === 1) return nums[0];
  const map = new Map();
  const ans = [];
  for (const num of nums) {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (map.get(nums[i]) === 1) {
      ans.push(nums[i]);
    }
  }
  return ans;
};
// 时间复杂度 O(N)
// 空间复杂度 O(N)

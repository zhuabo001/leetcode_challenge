// 找出所有消失的数字
const findAllMissedNum = (nums: number[]) => {
  const ans = [];
  const map = new Map();
  const len = nums.length;
  for (const num of nums) {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  }
  for (let i = 1; i <= len; i++) {
    if (!map.has(i)) {
      ans.push(i);
    }
  }
  return ans;
};
// 时间复杂度 O(n)
// 空间复杂度 O(n)

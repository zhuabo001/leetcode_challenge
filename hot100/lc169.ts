// 多数元素
const majorityElement = (nums: number[]) => {
  const len = nums.length;
  const map = new Map();
  for (const num of nums) {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }

    if (map.get(num) > Math.floor(len / 2)) {
      return num;
    }
  }
};

// 时间复杂度 o(n)
// 空间复杂度 o(1)

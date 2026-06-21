// 梦开始的地方
// 两数之和
// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

// 你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。
const twoSum = (
  nums: number[],
  target: number
): [number, number] | undefined => {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const anotherNum = target - nums[i];
    if (map.has(anotherNum)) {
      return [i, map.get(anotherNum)];
    } else {
      map.set(nums[i], i);
    }
  }
};
// 时间复杂度 O(n * 1 = n)
// 空间复杂度 O(n)

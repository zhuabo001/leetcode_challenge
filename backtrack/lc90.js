// 子集ii
// 给定一个可能包含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
// 说明：解集不能包含重复的子集。
// 示例
// 输入：nums = [1,2,2]
// 输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
// 与78不同的点在于，数组中可能包含重复元素， 那么思路就是78的思路加上去重
// 这里去重使用数组used来判断原nums中每一位是否使用过，举例：选取1 那么used就是[true, false, false];
// 去重的思路：
// 1. 首先对数组进行排序， 这样重复的元素就会挨在一起
// 2. 去重的核心： if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
// 3. 这里的!used[i - 1]表示如果i-1没有使用过，那么i就不能使用，因为i-1和i是重复的，i-1没有使用过，那么i也一定没有使用过，所以i不能使用
const subsetII = (nums) => {
  const res = [],
    path = [];
  // const used = new Array(nums.length).fill(false); // used数组 用于去重
  nums.sort((a, b) => a - b);
  const backTrack = (nums, startIndex, used) => {
    res.push([...path]);
    if (startIndex >= nums.length) return;
    for (let i = startIndex; i < nums.length; i++) {
      if (i > 0 && nums[i] === nums[i - 1] && used[i - 1] === false) {
        // "如果前一个相同元素没有被使用，那么当前相同元素也不能使用"
        // 这样做的目的是：
        // 强制相同元素按照从左到右的顺序使用
        // 避免 [第2个2] 和 [第1个2] 这种本质相同但顺序不同的子集
        // 确保每个唯一的子集只会被生成一次
        // 这个去重条件通过 强制相同元素的使用顺序 来避免重复子集的产生，是回溯算法中处理重复元素的经典技巧
        continue;
      }
      path.push(nums[i]);
      used[i] = true;
      backTrack(nums, i + 1, used);
      used[i] = false;
      path.pop();
    }
  };
  const backtrackWithSet = (nums, startIndex) => {
    res.push([...path]);
    if (startIndex >= nums.length) return;
    const uset = new Set(); // 使用set去重的的效率比used数组低
    for (let i = startIndex; i < nums.length; i++) {
      if (uset.has(nums[i])) continue;
      uset.add(nums[i]);
      path.push(nums[i]);
      backtrackWithSet(nums, i + 1);
      path.pop();
      //   uset.delete(nums[i]);// 错误做法 这会导致同一层的后续选择仍可能重复
    }
  };
  // backTrack(nums, 0, used); // used数组方式
  backtrackWithSet(nums, 0);
  return res;
};
// 时间复杂度依然 O(2^N * N)
// 空间复杂度 O(N)： 使用set去重的话空降复杂度是O(N^2)，因为每一层都有一个set；used数组则是全局变量
console.log(subsetII([1, 2, 2]));

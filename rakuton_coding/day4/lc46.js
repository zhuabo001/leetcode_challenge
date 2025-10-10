// 46. 全排列
// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
// 回溯算法
const permute = (nums) => {
  const res = [],
    path = [];
  const used = new Array(nums.length).fill(false);
  const backTrack = (nums) => {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      path.push(nums[i]);
      used[i] = true;
      backTrack(nums, used);
      used[i] = false;
      path.pop();
    }
  };
  return res;
};
// 时间复杂度：O(n * n!)，其中 n 是数组 nums 的长度。
// 空间复杂度：O(n)，其中 n 是数组 nums 的长度。

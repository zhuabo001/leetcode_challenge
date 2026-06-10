// 全排列
// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

const permute = (nums: number[]): number[][] => {
  const res: number[][] = [],
    path: number[] = [];
  const used = new Array(nums.length).fill(false);
  const backTrack = (arr: number[]) => {
    if (path.length === arr.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (used[i]) continue;
      path.push(arr[i]);
      used[i] = true;
      backTrack(arr);
      used[i] = false;
      path.pop();
    }
  };
  backTrack(nums);
  return res;
};
// 时间复杂度 O(n)
// 空间复杂度 O(n)

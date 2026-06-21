// 子集
// 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

// 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

const subsets = (nums: number[]) => {
  const res: number[][] = [],
    path: number[] = [];
  const backTrack = (arr: number[], startIndex: number) => {
    res.push([...path]);
    if (startIndex === arr.length) {
      return;
    }
    for (let i = startIndex; i < arr.length; i++) {
      path.push(arr[i]);
      backTrack(arr, i + 1);
      path.pop();
    }
  };
  backTrack(nums, 0);
  return res;
};
// 时间复杂度 O(n × 2^n)  子集总数 2^n(n个元素的数组子集就是2^n)，每个拷贝需要 O(n)
// 空间复杂度 O(n) 递归深度

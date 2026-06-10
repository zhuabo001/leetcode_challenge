// 组合总和
// 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
// candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的
// 无限制重复选取是不是意味着可以不用添加一个额外的数组来记录是否被访问过
const combinationSum = (candidates: number[], target: number) => {
  const res: number[][] = [],
    path: number[] = [];
  const backTrack = (
    candidates: number[],
    target: number,
    sum: number,
    startIndex: number
  ) => {
    if (sum > target) return;
    if (sum === target) {
      res.push([...path]);
      return;
    }
    for (let i = startIndex; i < candidates.length; i++) {
      path.push(candidates[i]);
      sum += candidates[i];
      backTrack(candidates, target, sum, i);
      sum -= candidates[i];
      path.pop();
    }
  };
  backTrack(candidates, target, 0, 0);
  return res;
};
// 时间复杂度 O(N^(T/MIN + 1)) — 指数级，N=candidates.length, T=target, MIN=min(candidates)
// 空间复杂度 O(T/MIN) — 递归栈深度

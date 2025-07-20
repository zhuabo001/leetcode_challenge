// 39. 组合总和
// 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
// candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。
// 对于给定的输入，保证和为 target 的不同组合数少于 150 个。
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 递归三部曲
// 1. 确定递归函数的参数（candidates, target, startIndex）和返回值（符合条件的组合）
// 2. 确定递归终止条件：path的和等于target
// 3. 确定单层递归逻辑 a. 从startIndex开始遍历candidates
//                   b. 每次递归时，将当前元素加入path，并且将target减去当前元素
//                   c. 递归完后，将当前元素从path中弹出
const combinationSum = (candidates, target) => {
  const res = [],
    path = [];
  // 优化 candidates排序
  candidates.sort((a, b) => a - b);
  const backTrack = (candidates, target, sum, startIndex) => {
    if (sum > target) return;
    if (sum === target) {
      res.push([...path]);
      return;
    }
    for (let i = startIndex; i < candidates.length; i++) {
      if (sum + candidates[i] > target) break; // 提前终止
      sum += candidates[i];
      path.push(candidates[i]);
      backTrack(
        candidates,
        target,
        sum,
        i /**使用 i 的原因 ：允许在下一层递归中继续使用当前数字 */
      );
      // 回溯
      sum -= candidates[i];
      path.pop();
    }
  };
  backTrack(candidates, target, 0, 0);
  return res;
};
// - 最好情况 ：目标值很小或数组中有较大的数字，递归深度较浅
// - 最坏情况 ：目标值很大且数组中都是小数字，需要深度递归
// 时间复杂度： O(N^(T/M))，其中 N 是数组长度，T 是目标值，M 是数组中的最小值
// 空间复杂度： O(T/M) 递归栈的深度
console.log(combinationSum([2, 3, 6, 7], 7));

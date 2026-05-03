// 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
// candidates 中的每个数字在每个组合中只能使用 一次 。
// 注意：解集不能包含重复的组合。 
// 输入: candidates = [10,1,2,7,6,1,5], target = 8,
// 输出:
// [
// [1,1,6],
// [1,2,5],
// [1,7],
// [2,6]
// ]
// 输入: candidates = [2,5,2,1,2], target = 5,
// 输出:
// [
// [1,2,2],
// [5]
// ]
const combinationSum2 = (candidates, target) => {
    const res = [], path = [];
    candidates.sort((a, b) => a - b); // 先对数组进行排序，方便后序使用startIndex进行去重
    // startIndex 是回溯函数中用来 控制搜索起始位置 的参数，它决定了在当前递归层中从数组的哪个位置开始遍历
    const backTrack = (candidates, target, sum, startIndex) => {
        if(sum > target) return;
        if(sum === target) {
            res.push([...path]);
            return;
        }
        for(let i = startIndex; i < candidates.length; i++){
            if(i > startIndex/**含义 ：确保不是当前递归层的第一个元素 */ && candidates[i] === candidates[i - 1]) continue; // 去重(横向，树层去重)
            sum += candidates[i];
            path.push(candidates[i]);
            backTrack(candidates, target, sum, i + 1/** 数组中的每个数字在每个组合中 只能使用一次；使用 i + 1 的原因 ：确保下一层递归不会再使用当前数字*/);
            sum -= candidates[i];
            path.pop();
        }
    }
    backTrack(candidates, target, 0, 0);
    return res;
}
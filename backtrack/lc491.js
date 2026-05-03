// 递增子序列
// 给定一个整型数组, 你的任务是找到所有该数组的递增子序列，递增子序列的长度至少是2。
// 示例:
// 输入: [4, 6, 7, 7]
// 输出: [[4, 6], [4, 7], [4, 6, 7], [4, 6, 7, 7], [6, 7], [6, 7, 7], [7,7], [4,7,7]]
// 说明:
// 给定数组的长度不会超过15。
// 数组中的整数范围是 [-100,100]。
// 给定数组中可能包含重复数字，相等的数字应该被视为递增的一种情况。
const findSubsequences = (nums) => {
    const res = [], path = [];
    const backTrack = (nums, startIndex) => {
        if (path.length >= 2) {
            res.push([...path]);
        }
        // 正确代码
        const usedSet = new Set(); // 将 used Set 移到循环外，确保在同一层递归中有效去重
        for(let i = startIndex; i < nums.length; i++){
            // 错误代码
            // const newSet = new Set();
            
            // if ((path.length > 0 && nums[i] < path[path.length - 1]) || newSet.has(nums[i])) {
            //     continue;
            // }
            // 正确代码
            if (usedSet.has(nums[i])) {
                continue;
            }
            if(path.length === 0 || nums[i] >= path[path.length - 1]) {
                usedSet.add(nums[i]);
                path.push(nums[i]);
                backTrack(nums, i + 1);
                path.pop();
            }
            
        }
    }
    backTrack(nums, 0);
    return res;
}
// 时间复杂度： O(2^n * n); 2^n是每个节点都有选或者不选两种情况， 最坏情况下就是2^n个节点， 每个节点都需要O(n)的时间复制到结果数组
// - res.push([...path]) 需要复制当前路径，最坏情况下路径长度为 n
// - Set 的 has() 和 add() 操作是 O(1)
// 所以结果是 O(2^n) * O(n) * O(1)
// 空间复杂度：O(n)
console.log(findSubsequences([4, 6, 7, 7]));

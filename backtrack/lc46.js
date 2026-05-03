// 全排列
// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
// 示例：
// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
const permute = (nums) => {
    const res = [], path = [];
    const used = new Array(nums.length).fill(false);
    const backTrack = (nums, used) => {
        if(path.length === nums.length/**此时path长度和nums长度相等，说明找到了一个全排列 */) {
            res.push([...path]);
            return;
        }
        for(let i = 0/**不使用startIndex, 因为排列问题每次都要从头开始 */; i < nums.length; i++) {
            if (used[i]) { 
                continue;
            }
            path.push(nums[i]);
            used[i] = true;
            backTrack(nums, used);
            used[i] = false;
            path.pop();
        }
    }
    backTrack(nums, used);
    return res;
}
// 时间复杂度：O(n! * n); n!是全排列的个数，n是每个全排列的长度
// - 全排列的总数量 ：对于 n 个不重复的数字，总共有 n! 种全排列

// - 第一个位置有 n 种选择
// - 第二个位置有 (n-1) 种选择
// - 第三个位置有 (n-2) 种选择
// - ...
// - 最后一个位置有 1 种选择
// - 总计：n × (n-1) × (n-2) × ... × 1 = n!
// - 每个全排列的构建成本 ：每当找到一个完整的排列时，需要执行 res.push([...path])

// - 这里的 [...path] 需要复制整个 path 数组
// - 复制操作的时间复杂度是 O(n)
// - 总时间复杂度 ：n! × n = O(n! × n)
// 空间复杂度：O(n)
// - path 数组：最大长度为 n
// - used 数组：长度为 n
// - 递归调用栈：最大深度为 n
console.log(permute([1,2,3]));
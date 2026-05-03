// 全排列ii
// 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
// 示例：
// 输入：nums = [1,1,2]
// 输出：
// [[1,1,2],
//  [1,2,1],
//  [2,1,1]]
// 思路：回溯
// 与全排列的区别在于，nums中可能有重复的数字，所以需要去重
// 去重的思路：在回溯的过程中，如果当前数字与前一个数字相同，并且前一个数字没有被使用过，那么当前数字就不能被使用
// 因为如果前一个数字没有被使用过，那么当前数字就会与前一个数字组成重复的排列
const permuteii = (nums) => {
    const res = [], path = [];
    const used = new Array(nums.length).fill(false);
    nums.sort((a, b) => a - b); // 去重之前一定要先排序！
    const backTrack = (nums, used) => {
        if(path.length === nums.length) {
            res.push([...path]);
        }
        for(let i = 0; i < nums.length; i++) {
            if( i > 0 && nums[i - 1] === nums[i] && !used[i - 1]) {
                continue; // 去重
            }
            if(used[i] === false) {
                path.push(nums[i]);
                used[i] = true;
                backTrack(nums, used);
                used[i] = false;
                path.pop();
            }
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
// - 每个全排列的构建成本 ：每当找到一个完整的排列时，需要执行 res.push([...path])
// - 这里的 [...path] 需要复制整个 path 数组
// - 复制操作的时间复杂度是 O(n)
// - 总时间复杂度 ：n! × n = O(n! × n)
// 空间复杂度：O(n)
// - path 数组：最大长度为 n
// - used 数组：长度为 n
// 
console.log(permuteii([1,1,2]));
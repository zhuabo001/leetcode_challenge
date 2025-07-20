// 四数之和
// 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：
// 0 <= a, b, c, d < n
// a、b、c 和 d 互不相同
// nums[a] + nums[b] + nums[c] + nums[d] == target
// 你可以按 任意顺序 返回答案 。
// 输入：nums = [1,0,-1,0,-2,2], target = 0
// 输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
// 输入：nums = [2,2,2,2,2], target = 8
// 输出：[[2,2,2,2]]
// 提示：
// 1 <= nums.length <= 200
// -109 <= nums[i] <= 109
// -109 <= target <= 109
// 思路：
// 1. 排序
// 2. 双指针
// 3. 剪枝
// 4. 去重
// 5. 返回结果
// 6. 时间复杂度：O(n^3)
// 7. 空间复杂度：O(1)
const fourSum = (nums, target) => {
    nums.sort((a, b) => a - b);
    let res = [];
    let len = nums.length;
    for(let i = 0; i < len - 3; i++){
        // 以[1,1,2,3,4]为例
        // 如果 i=0 时已经计算了所有以 nums[0]=1 开头的四元组，那么 i=1 时就不需要再计算以 nums[1]=1 开头的四元组了
        // 这种方式可以在遍历过程中立即进行剪枝，不需要额外的存储或后处理
        if(i > 0 && nums[i] === nums[i - 1]) continue;
        for(let j = i + 1; j < len - 2; j++){
            if(j > i + 1 && nums[j] === nums[j - 1]) continue;
            let left = j + 1, right = len - 1;
            while(left < right){
                let sum = nums[i] + nums[j] + nums[left] + nums[right];
                if(sum === target){
                    res.push([nums[i], nums[j], nums[left], nums[right]]);
                    while(left < right && nums[left] === nums[left + 1]) left++;
                    while(left < right && nums[right] === nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < target){
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    return res;
}
// ij的剪枝与left和right的去重不同：
// i 和 j 是在 单向循环 中移动的，它们只会从小到大遍历一次
// 当前处理到 i 或 j 时，i-1 或 j-1 位置的元素已经被完全处理过 ***
// left 和 right 是在 双指针对撞 过程中移动的
// left 向右移动，所以与右侧元素 (left+1) 比较
// right 向左移动，所以与左侧元素 (right-1) 比较
// i、j 指针：在找到一个重复元素时，直接跳过当前循环，进入下一次循环 ***
// left、right 指针：在找到满足条件的四元组后，需要移动到下一个不同的元素位置继续寻找 ***
// 四数之和
// 给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。
// 注意：
// 答案中不可以包含重复的四元组。
// 示例：
// 给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。
// 满足要求的四元组集合为：
// [
//   [-1,  0, 0, 1],
//   [-2, -1, 1, 2],
//   [-2,  0, 0, 2]
// ]
// 思路：
// 1. 排序
// 2. 双指针
// 3. 剪枝
// 4. 去重
// 5. 返回结果
// 6. 时间复杂度：O(n^3)
// 7. 空间复杂度：O(1)
// 8. 代码如下：
const fourSum = (nums, target) => {
    const len = nums.length;
    if(len < 4) return [];
    nums.sort((a, b) => a - b);
    const res = [];
    for(let i = 0; i < len - 3; i++){
        if(i > 0 && nums[i] === nums[i - 1]) continue; // 去重i
        for(let j = i + 1; j < len - 2; j++){
            if(j > i + 1 && nums[j] === nums[j - 1]) continue; // 去重j
            let left = j + 1, right = len - 1;
            while(left < right){
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                if(sum === target){
                    res.push([nums[i], nums[j], nums[left], nums[right]]);
                    while(left < right && nums[left]===nums[left + 1]) left++; // 去重left
                    while(left < right && nums[right] === nums[right - 1]) right--; // 去重right
                    left++;
                    right--;
                } else if(sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    return res;
}
console.log(fourSum([1, 0, -1, 0, -2, 2], 0));
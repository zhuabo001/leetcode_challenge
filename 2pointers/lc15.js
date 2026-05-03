// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let res = [];
    let len = nums.length;
    nums.sort((a, b) => a - b); // 升序排序
    for(let i = 0; i < len; i++) {
        let left = i + 1, right = len - 1;
        let a = nums[i];
        if(a > 0) return res; // 如果a大于0，说明后面的数字都大于0，三数之和不可能为0， 直接返回res
        if(a === nums[i - 1]) continue; // 如果a和前面的数字一样，就跳过
        while(left < right) {
            let b = nums[left], c = nums[right];
            let sum = a + b + c;
            if(sum === 0) {
                res.push([a, b, c]); // 如果三数之和为0，就把a,b,c加入res
                // 对b和c去重
                while(left < right && nums[left] === nums[left + 1]) left++; // 如果b和b后面的数字一样，就跳过，因为答案里面不允许有重复
                while(left < right && nums[right] === nums[right - 1]) right--; // 如果c和c前面的数字一样，就跳过，因为答案里面不允许有重复
                left++;
                right--;
            } else if (sum < 0) {
                left++; // 如果三数之和小于0，说明b太小了，需要增大b
            } else {
                right--; // 如果三数之和大于0，说明c太大了，需要减小c
            }
        }
    }
    return res;
}
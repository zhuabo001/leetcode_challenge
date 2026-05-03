// 三数之和
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。
/**
 * @param {number[]} nums
 * @return {number[][]}
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 * 示例 2：
 * 输入：nums = []
 * 输出：[]
 * 示例 3：
 * 输入：nums = [0]
 * 输出：[]
 * */
const threeSum = (nums) => {
    let res = [];
    let len = nums.length;
    nums.sort((a, b) => a - b);
    for(let i = 0; i < len; i++){
        let left = i + 1, right = len - 1;
        let a = nums[i];
        // 对a去重
        if(a > 0) return res;
        if(a === nums[i - 1]) continue;
        while(left < right){
            let b = nums[left], c = nums[right];
            let sum = a + b + c;
            if(sum === 0){
                res.push([a, b, c]);
                // 对b和c去重
                while(left < right && nums[left] === nums[left + 1]) left++; // 如果b和b+1相等，就跳过
                while(left < right && nums[right] === nums[right - 1]) right--; // 如果c和c-1相等，就跳过
                left++;
                right--;
            } else if(sum < 0){ // 说明此时b太小了，需要增大b
                left++;
            } else{ // 说明此时c太大了，需要减小c
                right--;
            }
        }
    }
    return res;
}
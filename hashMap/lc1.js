// 两数之和
// URL_ADDRESScode.cn/problems/two-sum/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
    // 时间复杂度：O(n)
    // 空间复杂度：O(n)
    const map = new Map(); // key是值，value是key在数组中的下标
    for(let i = nums.length - 1; i >= 0; i--){
        const diff = target - nums[i];
        if(map.has(diff)){
            return [map.get(diff), i];
        } else {
            map.set(nums[i], i);
        }
    }
}
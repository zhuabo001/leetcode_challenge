// 四数相加II
// 给你四个整数数组 nums1、nums2、nums3 和 nums4 ，数组长度都是 n ，请你计算有多少个元组 (i, j, k, l) 能满足：
// 0 <= i, j, k, l < n
// nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0
// 输入：nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
// 输出：2
// 解释：
// 两个元组如下：
// 1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
// 2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0
// 示例 2：
// 输入：nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
// 输出：1
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
const fourSumCount = (nums1, nums2, nums3, nums4) => {
    // 思路：将四数之和问题拆分为两组，降低时间复杂度
    // 1. 先计算nums1和nums2中所有元素两两组合的和，并记录每种和出现的次数
    // 2. 再计算nums3和nums4中所有元素两两组合的和，寻找其相反数在第一个map中出现的次数
    // 3. 这样将O(n^4)的复杂度降低到O(n^2)
    
    // 时间复杂度：O(n^2)
    // 空间复杂度：O(n^2)，最坏情况下nums1和nums2的组合有n^2种不同的和
    const map = new Map();
    let count = 0;
    
    // 第一步：统计nums1和nums2中所有元素两两组合的和及其出现次数
    for(let i = nums1.length - 1; i >= 0; i--){
        for(let j = nums2.length - 1; j >= 0; j--){
            const sum = nums1[i] + nums2[j];
            map.set(sum, (map.get(sum) || 0) + 1);
        }
    }
    
    // 第二步：计算nums3和nums4中所有元素两两组合的和，寻找其相反数在map中出现的次数
    for(let i = nums3.length - 1; i >= 0; i--){
        for(let j = nums4.length - 1; j >= 0; j--){
            const sum = nums3[i] + nums4[j];
            // 如果-(nums3[i]+nums4[j])在map中存在，说明找到了和为0的四元组
            // 累加这种情况出现的次数
            count += (map.get(0 - sum) || 0);
        }
    }
    return count;
}

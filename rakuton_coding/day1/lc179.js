// 最大数
// 给定一组非负整数 nums，重新排列每个数的顺序（每个数不可拆分）使之组成一个最大的整数。
// 注意：输出结果可能非常大，所以你需要返回一个字符串而不是整数。
// 示例 1：
// 输入：nums = [10,2]
// 输出："210"
// 示例 2：
// 输入：nums = [3,30,34,5,9]
// 输出："9534330"
// 提示：
// 1 <= nums.length <= 100
// 0 <= nums[i] <= 109
const largestNumber = (nums) => {
  // 于任意两个数字 a 和 b ：
  // - 计算 a + b （a在前）和 b + a （b在前）
  // - 如果 b + a > a + b ，则 b 应该排在 a 前面
  // - 否则 a 排在 b 前面
  const newNums = nums.map((item) => item.toString());
  //   newNums.sort((a, b) => {
  //     if ( b + a > a + b ) {
  //         return 1;
  //     } else {
  //         return -1;
  //     }
  //   });
  newNums.sort((a, b) => {
    const order1 = a + b; // a在前
    const order2 = b + a; // b在前
    // 如果 b+a > a+b，说明b应该排在a前面
    return order2.localeCompare(order1); // a.localeCompare(b) 是升序，b.localeCompare(a) 是降序
  });
  // 处理前导零的情况: 此时已经经过排序的newNums，如果第一个元素是0，那么整个数组都是0
  if (newNums[0] === '0') return '0';
  return newNums.join('');
};
// 时间复杂度：O(nlogn x k): n是数组的长度，k是数字的平均位数
// 空间复杂度：O(n x k)

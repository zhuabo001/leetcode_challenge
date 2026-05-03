// 打乱数组
// 给你一个整数数组 nums ，设计算法来打乱一个没有重复元素的数组。打乱后，数组的所有排列应该是 等可能 的。
// 实现 Solution class:
// Solution(int[] nums) 使用整数数组 nums 初始化对象
// int[] reset() 重设数组到它的初始状态并返回
// int[] shuffle() 返回数组随机打乱后的结果
const Solution = function (nums) {
  this.nums = nums;
  this.original = nums.slice();
};
// 时间复杂度：O(n)
// 重置数组到初始状态
Solution.prototype.reset = function () {
  this.nums = this.original.slice();
  return this.nums;
};
// 时间复杂度：O(n)
// 随机打乱数组
Solution.prototype.shuffle = function () {
  const shuffled = new Array(this.nums.length).fill(0);
  const list = [];
  this.nums.forEach((num) => list.push(num));
  for (let i = 0; i < this.nums.length; i++) {
    const randomIndex = Math.floor(Math.random() * list.length);
    shuffled[i] = list.splice(randomIndex, 1)[0];
  }
  this.nums = shuffled;
  return this.nums;
};
// 时间复杂度：O(n^2)

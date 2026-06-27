// 跳跃游戏
// 给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false

const canJump = (nums: number[]): boolean => {
  let cover = 0;
  for (
    let i = 0;
    i <= cover;
    /**循环要限制在可达范围内，用nums.length的话就会超 */ i++
  ) {
    cover = Math.max(cover, i + nums[i]);
    if (cover >= nums.length - 1) {
      return true;
    }
  }
  return false;
};

// 时间复杂度 O(n)
//空间复杂度 O(1)

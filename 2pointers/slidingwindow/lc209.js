// 滑动窗口，查找长度最小的子数组，满足子数组的和为target
const minSubArrayLen = (target, nums) => {
  let ans = Infinity, left = 0, sum = 0;
  for(let right = 0; right < nums.length; right++){
    sum += nums[right];
    while(sum >= target){
      const subLength = right - left + 1;
      ans = ans < subLength ? ans : subLength;
      sum -= nums[left++];
    }
  }
  return ans === Infinity ? 0 : ans;
}
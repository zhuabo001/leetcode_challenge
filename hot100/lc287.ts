// 寻找重复数
const findDuplicate = (nums: number[]) => {
  // 快慢指针判圈法， 想象链表找环
  let fast = nums[nums[0]],
    slow = nums[0];
  while (slow !== fast) {
    // 判断有没有环
    slow = nums[slow];
    fast = nums[nums[fast]]; // 类似链表中的fast = fast.next.next
  }
  slow = 0; // 类似找环里的将一个节点置回head，然后再同时前进一步
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
};
// 时间复杂度 O(n)
// 空间复杂度 O(1)

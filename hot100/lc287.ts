// 寻找重复数
const findDuplicate = (nums: number[]): number => {
  let fast = nums[nums[0]], // 初始化时先错开一步，否则 fast === slow，while 直接跳过
    slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[nums[fast]]; // 类似链表中的 fast = fast.next.next
  }
  slow = 0; // 类似找环入口：将一个指针置回 head，然后两指针同速前进
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
};
// 时间复杂度 O(n)
// 空间复杂度 O(1)
//
// ── 本题总结 ────────────────────────────────────────────────────
// 要点        │ 内容
// ───────────┼──────────────────────────────────────────────────
// 问题转化    │ 数组下标跳跃 i → nums[i] 等价于链表 next；重复数 = 环入口
// 为什么有环  │ 鸽巢原理：n+1 个数落在值域 [1,n]，重复值导致两个下标指向同一位置
// 第一阶段    │ 快慢指针相遇（证明有环），fast 走 2 步 slow 走 1 步
// 第二阶段    │ 一个指针重置回 0，两指针同速前进，相遇点即环入口（重复数）
// 数学原理    │ a = (k-1)(b+c) + c：从头走 a 步 ≡ 从相遇点走 c 步加绕整圈
// 易错点      │ 初始 fast === slow 时 while 直接跳过 → 初始化要先错开一步，或用 do-while
// 复杂度      │ 时间 O(n)，空间 O(1)

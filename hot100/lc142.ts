// 环形链表 ii
// 找到环的入口
import { ListNode } from './type';
function hasCycleII(head: ListNode | null) {
  if (!head || !head.next) {
    return null;
  }
  let fast = head,
    slow = head;
  while (fast && fast.next) {
    fast = fast.next.next as ListNode;
    slow = slow.next as ListNode;
    if (slow === fast) {
      fast = head;
      while (fast !== slow) {
        fast = fast.next as ListNode;
        slow = slow.next as ListNode;
      }
      return fast;
    }
  }
  return null;
}

// 时间复杂度 O(n)
// 空间复杂度 O(1)

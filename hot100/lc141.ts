// 环形链表
import { ListNode } from './type';
function hasCycle(head: ListNode | null) {
  if (!head || !head.next) return false;
  let fast = head,
    slow = head;
  while (fast && fast.next) {
    fast = fast.next.next as ListNode;
    slow = slow.next as ListNode;
    if (slow === fast) {
      return true;
    }
  }
  return false;
}

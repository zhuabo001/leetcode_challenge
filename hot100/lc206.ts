// 反转链表
import { ListNode } from './type';
const reverseLinkedList = (head: ListNode) => {
  if (!head || !head.next) return head;
  let pre = null,
    cur = head;
  while (cur) {
    let nxt = cur.next;
    cur.next = pre;
    pre = cur;
    cur = nxt;
  }
  return pre;
};

// 删除链表的倒数第N个元素。

import { ListNode } from './type';
const deleteLastKNode = (head: ListNode | null, n: number) => {
  let dummy: ListNode = { value: 0, next: head };
  let fast = dummy,
    slow = dummy;
  while (n--) {
    fast = fast.next as ListNode;
  }
  while (fast && fast.next) {
    slow = slow.next as ListNode;
    fast = fast.next as ListNode;
  }
  slow.next = (slow.next as ListNode).next as ListNode;
  return dummy.next;
};

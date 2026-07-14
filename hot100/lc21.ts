// 合并两个有序链表。
import { ListNode } from './type';
const mergedList = (list_1: ListNode, list_2: ListNode) => {
  const preHead = { value: -1, next: null } as ListNode;
  let cur = preHead;
  while (list_1 && list_2) {
    if (list_1.value < list_2.value) {
      cur.next = list_1;
      list_1 = list_1.next as ListNode;
    } else {
      cur.next = list_2;
      list_2 = list_2.next as ListNode;
    }
    cur = cur.next;
  }
  cur.next = list_1 ? list_1 : list_2;
  return preHead.next;
};

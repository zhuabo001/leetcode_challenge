// 排序链表
// 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
import { ListNode } from './type';
const merge = (head1: ListNode | null, head2: ListNode | null) => {
  const dummy = { value: -1, next: null } as ListNode;
  let prev = dummy;
  while (head1 && head2) {
    if (head1.value <= head2.value) {
      prev.next = head1;
      head1 = head1.next as ListNode;
    } else {
      prev.next = head2;
      head2 = head2.next as ListNode;
    }
    prev = prev.next as ListNode;
  }
  prev.next = head1 ? head1 : head2;

  return dummy.next;
};

const splitList = (head: ListNode | null) => {
  let slow = head,
    fast = head,
    prev: ListNode | null = null;
  while (fast && fast.next) {
    prev = slow;
    slow = (slow as ListNode).next;
    fast = (fast.next as ListNode).next;
  }
  // prev 是前半段最后一个节点，slow 是后半段头结点
  (prev as ListNode).next = null;

  return slow;
};
const sortLinkedList = (head: ListNode | null): ListNode | null => {
  // 1. 如果链表为空或者只有一个节点直接返回
  if (!head || !head.next) return head;
  // 2. 切开这个链表
  const anotherHead = splitList(head);
  // 3. 递归排序两个链表
  let sortedHead = sortLinkedList(head),
    sortedAnotherHead = sortLinkedList(anotherHead);

  // 4. merge两个已经排序过的链表
  return merge(sortedHead, sortedAnotherHead);
};
// 时间复杂度 O(n log n) — 归并排序，每一层合并 O(n)，递归深度 O(log n)
// 空间复杂度 O(log n) — 递归调用栈深度

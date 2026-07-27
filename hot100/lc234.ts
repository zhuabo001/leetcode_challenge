// 回文链表
import { ListNode } from './type';
const palindromeList = (head: ListNode | null): boolean => {
  let fast: ListNode | null = head,
    slow: ListNode | null = head;
  // 先找到链表中点
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow!.next;
  }
  // 反转后半部分
  let pre: ListNode | null = null,
    cur: ListNode | null = slow; // dumb节点的思路
  while (cur) {
    let nxt = cur.next;
    cur.next = pre;
    pre = cur;
    cur = nxt;
  }
  // 反转后（pre 指向最后一个 1）假设本来后半段是 3 -> 2 -> 1, 反转后就是 3 <- 2 <- 1;
  // 两个指针分别从head和pre处移动进行比较，若不同则不是回文链表
  let p1: ListNode | null = head,
    p2: ListNode | null = pre;
  while (p2) {
    if (p1!.value !== p2.value) return false;
    p1 = p1!.next;
    p2 = p2.next;
  }
  return true;
};

// 时间复杂度 O(n)
// 空间复杂度 O(1)

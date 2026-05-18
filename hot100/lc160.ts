import { ListNode } from './type';
const getIntersectedNodeList = (headA: ListNode, headB: ListNode): ListNode => {
  let curA = headA,
    curB = headB;
  while (curA !== curB) {
    //    相交的情况：
    // - A 走完 A 链 → 跳到 B 链起点
    // - B 走完 B 链 → 跳到 A 链起点
    // - 两人走过的总路程相等，在相交点相遇
    curA = (curA ? curA.next : headB) as ListNode;
    curB = (curB ? curB.next : headA) as ListNode;
  }
  return curA;
};

// 时间复杂度 O(m + n)
// 空间复杂度O(1)

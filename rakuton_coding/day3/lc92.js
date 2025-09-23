// 92. 反转链表 II
// 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。
// 请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
//
const revesedLinkedList = (head, left, right) => {
  if (!head || left === right) return head;
  let dummy = new ListNode(0, head);
  let pre = dummy; // pre 是反转操作的固定参考点
  for (let i = 0; i < left - 1; i++) {
    pre = pre.next; // pre指向待反转节点的前一个节点处
  }
  let cur = pre.next; // 待反转区的第一个节点， 固定不动的，cur 始终是原始待反转区域的第一个节点
  for (let i = left; i < right; i++) {
    let nxt = cur.next;
    cur.next = nxt.next; // cur跳过nxt
    nxt.next = pre.next; // nxt插入到已反转部分的头部
    pre.next = nxt; // pre指向新的头部
  }
  return dummy.next;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)

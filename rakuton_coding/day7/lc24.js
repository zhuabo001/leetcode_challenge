// 24. 两两交换链表中的节点
// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
const swapPairs = (head) => {
  if (!head || !head.next) return head;
  const dummy = new ListNode(0, head);
  let pointer = dummy;
  while (pointer.next && pointer.next.next) {
    let pre = pointer.next;
    cur = pointer.next.next;
    let nxt = cur.next;
    pre.next = nxt;
    cur.next = pre;
    pointer.next = cur; // 亮亮交换的节点的前一个节点的next指针指向现在的cur 例如 A B C其中 A 是pointer, 交换的是B、C
    pointer = pre;
  }
  return dummy.next;
};
// 时间复杂度：O(n)，其中 n 是链表的长度。
// 空间复杂度：O(1)。

// 19. 删除链表的倒数第 N 个结点
const removeNthFromEnd = (head, n) => {
  const dummy = new ListNode(0, head);
  let fast = dummy,
    slow = dummy;
  while (n--) {
    fast = fast.next;
  }
  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
};
// 时间复杂度：O(n)，其中 n 是链表的长度。
// 空间复杂度：O(1)。

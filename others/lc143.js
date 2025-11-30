// 143. 重排链表
// 给定一个单链表 L：L0→L1→…→Ln-1→Ln ，
// 将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
// 示例 1:
// 输入: 1->2->3->4
// 输出: 1->4->2->3
// 示例 2:
// 输入: 1->2->3->4->5
// 输出: 1->5->2->4->3
// 进阶：
// 你能否在 O(n) 时间复杂度和 O(1) 空间复杂度下解决此题？
// 1. 找到分割点 —— 快慢指针找到中点
// 2. 反转后半部分链表
// 3. 合并前半部分和后半部分链表
const reorderLinkedList = (head) => {
  if (!head || !head.next) return head;
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  // 2. 反转后半部分链表
  let pre = null,
    cur = slow.next; // 指向第二段链表的头节点
  slow.next = null; // 断开前半部分和后半部分的连接
  while (cur) {
    let nxt = cur.next;
    cur.next = pre;
    // 更新pre和cur
    pre = cur;
    cur = nxt;
  }
  // 3. 合并两段链表
  let first = head,
    second = pre;
  while (second) {
    let nxt = second.next;
    second.next = first.next;
    first.next = second;
    first = second.next;
    second = nxt;
  }
  return head;
};

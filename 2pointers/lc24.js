// URL_ADDRESScode.com/problems/swap-nodes-in-pairs/
// 两两交换链表中的节点
// 给定 1->2->3->4, 你应该返回 2->1->4->3.
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
// 思路：
// 1. 先交换两个节点，再递归交换后面的节点
function ListNode(val) {
  this.val = val;
  this.next = null;
}
var swapPairs = function(head) {
  const dummy = new ListNode(0);
  let pointer = dummy;
  while(pointer.next && pointer.next.next /**确保有两个节点可以交换 */){
    let pre = pointer.next, cur = pointer.next.next;
    let nxt = cur.next; // 保存下一个节点
    pointer.next = cur; // pointer 指向当前节点
    cur.next = pre; // 当前节点指向之前的节点
    pre.next = nxt; // 之前的节点指向下一个节点nxt
    pointer = pre; // 指针移动到之前的节点,下一轮的pre将是pointer后面的节点
  }
  return dummy.next;
}
// 时间复杂度：O(n)
// 空间复杂度：O(1)
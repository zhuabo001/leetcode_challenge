// lc24 两两交换链表中的节点
// 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
// 示例 1：
// 输入：head = [1,2,3,4]
// 输出：[2,1,4,3]
// 示例 2：
// 输入：head = []
// 输出：[]
// 示例 3：
// 输入：head = [1]
// 输出：[1]
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
const swapPairs = (head) => {
  let dummyHead = new ListNode(0, head);
  let pointer = dummyHead;
  while (pointer.next && pointer.next.next) {
    let pre = pointer.next,
      cur = pointer.next.next;
    let nxt = cur.next;
    pointer.next = cur;
    cur.next = pre;
    pre.next = nxt;
    pointer = pre; // 将pointer指向此时的pre， 此时的pre作为下一段链表的虚拟头节点
  }
  return dummyHead.next;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)

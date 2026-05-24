// 两数相加
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val: number | string, next: any = null) {
  //@ts-ignore

  (this as any).val = val === undefined ? 0 : val;
  //@ts-ignore

  (this as any).next = next === undefined ? null : next;
}
const add2Numbers = (l1: ListNode, l2: ListNode) => {
  let addOne = 0;
  //@ts-ignore

  let sum = new ListNode(0);
  let head = sum;
  while (addOne || l1 || l2 /**链表还没走完或者最后还有进位 */) {
    let val1 = l1 ? l1.val : 0; // 走完了链表用0补位
    let val2 = l2 ? l2.val : 0;
    let res = val1 + val2 + addOne;
    addOne = res >= 10 ? 1 : 0;
    //@ts-ignore
    sum.next = new ListNode(res % 10); // 创建新链表
    sum = sum.next;
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  return head.next;
};
// 时间复杂度：O(max(m, n))
// 空间复杂度：O(max(m, n)) - 创建了一个新的结果链表

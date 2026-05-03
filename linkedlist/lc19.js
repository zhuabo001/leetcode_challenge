// 删除链表的倒数第 N 个结点
// 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
// 进阶：你能尝试使用一趟扫描实现吗？
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * } 
 */
 /**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = (head, n) => {
    const dummy = new ListNode(0, head);
    let fast = dummy, slow = dummy;
    while(n--){
        fast = fast.next;
    }
    while(fast.next !== null) {
        // 此时 fast指向最后一个节点
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return dummy.next;
}

// 两两交换链表中的元素
// 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
// 输入：head = [1,2,3,4]
// 输出：[2,1,4,3]
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const swapPairs = function(head) {
    const dummy = new ListNode(0, head); // 创建虚拟头节点
    let pointer = dummy; // 定义一个指针指向虚拟头节点
    while(pointer.next && pointer.next.next){ // 如果有两个节点可以交换
        let pre = pointer.next, cur = pointer.next.next; // 定义两个指针指向要交换的两个节点
        let nxt = cur.next; // 保存下一个节点
        pointer.next = cur; // 第一步 将虚拟头节点的指针指向cur
        cur.next = pre; // 将cur指向的节点的next指向pre指向的节点
        pre.next = nxt; // 将pre指向的节点的next指向原cur的下一个节点
        pointer = pre; // 将pointer指向此时的pre， 此时的pre作为下一段链表的虚拟头节点
    }
    return dummy.next;// 
}
console.log(swapPairs([1, 2, 3, 4]))
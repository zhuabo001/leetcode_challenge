// 链表相交
// 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */ 
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
 var getIntersectionNode = function(headA, headB) {
    const getListLength = (head) => {
        let cur = head;
        let length = 0;
        while(cur){
            cur = cur.next;
            length++;
        }
        return length;
    }
    const lenA = getListLength(headA);
    const lenB = getListLength(headB);
    let diff = Math.abs(lenA - lenB);
    let curA = headA;
    let curB = headB;
    if(lenA < lenB){
      [lenA, lenB] = [lenB, lenA];
      [curA, curB] = [curB, curA];
    }
    while(diff--){
        curA = curA.next;
    }
    while(curA && curA !== curB){
        curA = curA.next;
        curB = curB.next;
    }
    return curA;
}
// 时间复杂度：O(m+n)
// 空间复杂度：O(1)
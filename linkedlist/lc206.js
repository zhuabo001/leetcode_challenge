// 反转链表
// 双指针法
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function(head) {
    if(!head || !head.next) {
        return head;
    }
    let pre = null, cur = head; // 定义两个指针
    while(cur){
        let next = cur.next; // 先保存下一个节点
        cur.next = pre; // 反转
        pre = cur; // 更新pre
        cur = next; // 更新cur
    }
    // 退出循环时cur为null，pre为尾节点，也就是反转后的头节点
    return pre;
}

// ... 原有代码保持不变 ...

// 递归法
const reverseListRecursive = function(head) {
    // 递归终止条件：节点为空或只有一个节点
    if(!head || !head.next) {
        return head;
    }
    
    // 递归调用，反转除了头节点以外的链表
    const newHead = reverseListRecursive(head.next);
    
    // 将原头节点接到反转后链表的末尾
    head.next.next = head;
    head.next = null;
    
    // 返回新的头节点
    return newHead;
}
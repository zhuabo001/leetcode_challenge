// 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。
// 图示两个链表在节点 c1 开始相交：
// 题目数据 保证 整个链式结构中不存在环。
// 注意，函数返回结果后，链表必须 保持其原始结构 。
// 自定义评测：
// 评测系统 的输入如下（你设计的程序 不适用 此输入）：
// intersectVal - 相交的起始节点的值。如果不存在相交节点，这一值为 0
// listA - 第一个链表
// listB - 第二个链表
// skipA - 在 listA 中（从头节点开始）跳到交叉节点的节点数
// skipB - 在 listB 中（从头节点开始）跳到交叉节点的节点数
// 评测系统将根据这些输入创建链式数据结构，并将两个头节点 headA 和 headB 传递给你的程序。如果程序能够正确返回相交节点，那么你的解决方案将被 视作正确答案 。
// 示例 1：
// 输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
// 输出：Intersected at '8'
const getListLen = (head) => {
    let length = 0, cur = head;
    while(cur){
        length++;
        cur = cur.next;
    }
    return length;
}
const getIntersectionNode = function(headA, headB) {
  let curA = headA, curB = headB;
  let lenA = getListLen(headA), lenB = getListLen(headB);
  if(lenB > lenA){
      [curA, curB] = [curB, curA];
      [lenA, lenB] = [lenB, lenA];
  }
  // 想象两条链表一长一短，先将指向长链表的指针移动到某一个位置，此时长链表剩余的节点与短链表节点数一致
    // 同时移动两个指针并且比较两个指针指向的元素是否相等
    // 复杂度为O(n+m)
    let diff = lenA - lenB;
    while(diff-- > 0){
        curA = curA.next;
    }
    while(curA & curA !== curB){
        curA = curA.next;
        curB = curB.next;
    }
    return curA;
}
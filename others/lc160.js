// 160. 相交链表
// 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。
// 图示两个链表在节点 c1 开始相交：
// 题目数据 保证 整个链式结构中不存在环。
// 注意，函数返回结果后，链表必须 保持其原始结构
// 自定义评测：
// 评测系统 的输入如下（你设计的程序 不适用 此输入）：
// intersectVal - 相交的起始节点的值。如果不存在相交节点，这一值为 0
// listA - 第一个链表
// listB - 第二个链表
// skipA - 在 listA 中（从头节点开始）跳到交叉节点的节点数
// skipB - 在 listB 中（从头节点开始）跳到交叉节点的节点数
// 评测系统将根据这些输入创建链式数据结构，并将两个头节点 headA 和 headB 传递给你的程序。如果程序能够正确返回相交节点，那么你的解决方案将被 视作正确答案 。

// 方法1. 长度差法
// 思路：
// 1. 先遍历两个链表，分别得到它们的长度lenA和lenB
// 2. 计算长度差diff = Math.abs(lenA - lenB)
// 3. 让较长的链表先遍历diff个节点
// 4. 然后两个链表同时遍历，直到找到相交节点或者遍历到链表末尾
// 5. 如果遍历到链表末尾，说明两个链表不相交，返回null
// 6. 如果找到相交节点，返回该节点
const getIntersectionNode = (headA, headB) => {
  const getListLen = (head) => {
    let cur = head;
    let len = 0;
    while (cur) {
      len++;
      cur = cur.next;
    }
    return len;
  };
  // 先分别获取两个链表的长度
  const lenA = getListLen(headA);
  const lenB = getListLen(headB);
  // 计算长度差
  const diff = Math.abs(lenA - lenB);
  // 让比较长的链表先遍历diff个节点
  let curA = headA,
    curB = headB;
  if (lenA > lenB) {
    while (diff--) {
      curA = curA.next;
    }
  } else {
    while (diff--) {
      curB = curB.next;
    }
  }
  // 两个链表同时遍历，直到找到相交节点或者遍历到链表末尾
  while (curA && curB) {
    if (curA === curB) {
      return curA;
    }
    curA = curA.next;
    curB = curB.next;
  }
  return null;
};
// 时间复杂度：O(n + m) - n和m分别是两个链表的长度
// 空间复杂度：O(1) - 只使用了常数个额外变量

// 方法2: 双指针法
// 思路：
// 1. 用两个指针curA和curB分别指向两个链表的头节点headA和headB
// 2. 两个指针同时遍历，当遍历到链表末尾时，将指针指向另一个链表的头节点
// 3. 两个指针遍历的距离相等，当它们指向的节点相同时，说明找到相交节点，返回该节点
// 4. 如果遍历到链表末尾，说明两个链表不相交，返回null
// ps. 假设链表a的非公共部分长度为a，链表b的非公共部分长度为b， 相交部分的长度为c
// 当curA遍历到链表a的末尾时， 将它重置到链表b的头节点，curA = headB
// 当curB遍历到链表b的末尾时， 将它重置到链表a的头节点，curB = headA
// 由于a + c + b = b + c + a， 所以两个指针会在相交节点相遇
const findInterNode = (headA, headB) => {
  let curA = headA,
    curB = headB;
  while (curA !== curB) {
    curA = curA ? curA.next : headB; // curA遍历链表a，当遍历到链表末尾时，将指针指向链表b的头节点
    curB = curB ? curB.next : headA; // curB遍历链表b，当遍历到链表末尾时，将指针指向链表a的头节点
  }
  return curA; // 当curA和curB相遇时，返回相交节点
};
// 时间复杂度：O(n + m) - n和m分别是两个链表的长度
// 空间复杂度：O(1) - 只使用了常数个额外变量

// 环形链表ii
// 头节点到环的入口为x
// 环的入口到相遇点为y
// 相遇点到环的入口为z
// 相遇时快指针走的距离为x + y + (z + y) * n , n为快指针在环内走的圈数，假设n = 1
// 相遇时慢指针走的距离为x + y
// 因为快指针的速度是慢指针的两倍，所以有x + y + z + y = 2(x + y)
// 化简得x = z
// 也就是说，当快慢指针相遇时，一个指针从相遇点开始走，另一个指针从头节点开始走，它们会在环的入口相遇。
const detectCycle = function (head) {
  if (!head || !head.next) {
    return null;
  }
  let fast = head,
    slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      // 有环
      let index1 = fast,
        index2 = head; // 一个指针指向相遇节点，一个指针指向头节点
      while (index1 !== index2) {
        index1 = index1.next;
        index2 = index2.next;
      }
      return index1;
    }
  }
  return null;
};
// 找环形列表入口的题不用在意那么多数学推导，只需要知道相遇时，一个指针从相遇点开始走，另一个指针从头节点开始走，它们会在环的入口相遇。

interface LinkedlistNode {
  value: number;
  next: LinkedlistNode | null;
}

const getIntersectedNodeList = (
  headA: LinkedlistNode,
  headB: LinkedlistNode
): LinkedlistNode => {
  let curA = headA,
    curB = headB;
  while (curA !== curB) {
    //    相交的情况：
    // - A 走完 A 链 → 跳到 B 链起点
    // - B 走完 B 链 → 跳到 A 链起点
    // - 两人走过的总路程相等，在相交点相遇
    curA = (curA ? curA.next : headB) as LinkedlistNode;
    curB = (curB ? curB.next : headA) as LinkedlistNode;
  }
  return curA;
};

// 时间复杂度 O(m + n)
// 空间复杂度O(1)

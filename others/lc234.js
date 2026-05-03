// 234. 回文链表
// 请判断一个链表是否为回文链表
// 示例 1:
// 输入: 1->2
// 输出: false
// 示例 2:
// 输入: 1->2->2->1
// 输出: true
// 进阶：
// 你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？—— 切割链表并反转后半部分链表，然后从头比较是否相等
const isPalindromLinkedList = (head) => {
  if (!head || !head.next) return true;
  // 创建空数组
  let cur = head;
  let arr = [];
  while (cur) {
    arr.push(cur.val);
    cur = cur.next;
  }
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    if (arr[left] !== arr[right]) return false;
    left++;
    right--;
  }
  return true;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
const isPalindromLinkedList2 = (head) => {
  if (!head || !head.next) return true;
  // 1. 找到分割点 —— 快慢指针找到中点
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  // 2. 反转后半部分链表
  let pre = null,
    cur = slow; // slow就是分割点，从slow开始反转
  while (cur) {
    let nxt = cur.next;
    cur.next = pre;
    pre = cur;
    cur = nxt;
  }
  // 3. 比较前半部分和后半部分是否相等
  let pointer_1 = head,
    pointer_2 = pre;
  while (pointer_2) {
    if (pointer_1.val !== pointer_2.val) return false;
    pointer_1 = pointer_1.next;
    pointer_2 = pointer_2.next;
  }
  return true;
};

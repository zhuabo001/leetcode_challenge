// 移出链表元素
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
 }

 var removeElements = function(head, val) {
  let ptn = new ListNode(0, head);
  let cur = ptn;
  while(cur.next){
    if(cur.next.val === val){
      cur.next = cur.next.next;
      continue;
    }
    cur = cur.next;
  }
  return ptn.next;
};
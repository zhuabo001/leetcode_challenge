// LRU
function Node(key = 0, value = 0) {
  this.key = key;
  this.value = value;
  this.prev = null;
  this.next = null;
}
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.dummy = new Node();
  this.dummy.prev = this.dummy;
  this.dummy.next = this.dummy;
  this.keyToNode = new Map();
};

LRUCache.prototype.getNode = function (key) {
  if (!this.keyToNode.has(key)) {
    return null;
  }
  const node = this.keyToNode.get(key);
  this.remove(node);
  this.pushFront(node);
  return node;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const node = this.getNode(key); // getNode 会把对应节点移到链表头部
  return node ? node.value : -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  let node = this.getNode(key);
  if (node) {
    node.value = value;
    return;
  }
  node = new Node(key, value);
  this.keyToNode.set(key, node);
  this.pushFront(node); // 放到最上面
  if (this.keyToNode.size > this.capacity) {
    const backNode = this.dummy.prev;
    this.keyToNode.delete(backNode.key);
    this.remove(backNode);
  }
};

LRUCache.prototype.remove = function (node) {
  node.prev.next = node.next;
  node.next.prev = node.prev;
};

LRUCache.prototype.pushFront = function (x) {
  x.prev = this.dummy;
  x.next = this.dummy.next;
  x.prev.next = x;
  x.next.prev = x;
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

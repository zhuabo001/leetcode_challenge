// 前k个高频元素
// 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。
// 输入: nums = [1,1,1,2,2,3], k = 2
// 输出: [1,2]



class MinHeap {
    constructor(compareFn) {
        this.compareFn = compareFn;
        this.queue = [];
    }
    size() {
        return this.queue.length;
    }
    /**
     * 
     * @param {*} index1 
     * @param {*} index2 
     * @returns 
     */
    compare(index1, index2) {
        /**对于堆底部的节点，计算出的子节点索引可能超出数组的实际范围。
         * 这些边界检查确保了：
         * 当比较父节点和子节点时，如果子节点索引无效（越界），父节点会被认为优先级更高（值更小），从而不会尝试与不存在的子节点进行比较或交换。
         * 当比较左子节点和右子节点时，如果其中一个不存在，存在的那个子节点会被认为优先级更高。
         * 总结： 存在的元素总是比不存在的元素具有更高的优先级 （在小顶堆中意味着值更小
         * */
        if(this.queue[index1] === undefined) {
            // 第二个参数（ index2 处的元素）优先级 高于 第一个参数（ index1 处的元素）， 也就是说在小顶堆里index2处的值更小。
            return 1; 
        }
        if(this.queue[index2] === undefined) {
            // 第一个参数（ index1 处的元素）优先级 高于 第二个参数（ index2 处的元素）
            return -1;
        }
        return this.compareFn(this.queue[index1], this.queue[index2]);
    }
    push(item) {
        this.queue.push(item);
        // 上浮
        let index = this.size() - 1;
        let parent = Math.floor((index - 1) / 2); // 父节点的索引
        while(parent >= 0 && this.compare(parent, index) > 0/**当前节点还没有到达堆顶且违反了小顶堆性质 */) {
            // this.compare(parent, index) > 0 表示父节点的优先级大于子节点的优先级
            // 当前节点的值比父节点值还要小
            // 违反了小顶堆的性质
            // 交换当前节点和父节点的值
            [this.queue[parent], this.queue[index]] = [this.queue[index], this.queue[parent]];
            index = parent;
            parent = Math.floor((index - 1) / 2);
        }  
    }
    pop() { /** pop 方法的目的是 返回 被移除的堆顶元素（即原始的最小值） */
        // 边界情况，只有一个元素或没有元素应直接弹出
        if(this.size() === 1) {
            return this.queue.pop();
        }
        if(this.size() === 0) {
            return null; 
        }
        // 弹出堆顶元素， 本函数的目的，剩下的步骤都是为了维护小顶堆的特性
        const head = this.queue[0];
        // 将堆顶元素替换为堆底元素
        this.queue[0] = this.queue.pop();
        // 下沉
        let index = 0, left = 1/**左子节点 */, right = left + 1/**右子节点 */;
        let searchChild = this.compare(left, right) > 0 ? right : left; // 较小的子节点
        // 当当前节点的值大于子节点的值时，交换它们的值，然后继续下沉
        while(this.compare(index, searchChild) /** 比较当前节点和其较小的子节点 */> 0){
            // 大于0说明index处的值大于searchChild处的值
            // 违反了小顶堆的性质
            // 交换当前节点和较小的子节点的值
          [this.queue[index], this.queue[searchChild]] = [this.queue[searchChild], this.queue[index]];
          index = searchChild;
          left = 2 * index + 1; // 左子节点
          right = left + 1;
          searchChild = this.compare(left, right) > 0 ? right : left;
        }
        return head;
    }
}
/**
 * 
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const topKFrequent = (nums, k) => {
    const map = new Map();
    let res = [];
    for(const num of nums){
        map.set(num, (map.get(num) || 0) + 1);
    }
    const heap = new MinHeap((a, b) => a[1] - b[1]);
    for(const entry of map.entries()) {
        console.log("entry:", entry);
        heap.push(entry);
        if(heap.size() > k) {
            heap.pop();
        }
    }
    // 此时堆中剩下的元素就是前k个高频元素
    while(heap.size()){
        res.push(heap.pop()[0]);
    }
    return res;
}
console.log(topKFrequent([1,1,1,2,2,3], 1));
// 时间复杂度：O(nlogk)
// 空间复杂度：O(n)
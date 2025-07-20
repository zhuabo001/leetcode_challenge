// 332. 重新安排行程
// https://leetcode.cn/problems/reconstruct-itinerary/
// 给你一份航线列表 tickets ，其中 tickets[i] = [fromi, toi] 表示飞机出发和降落的机场地点。请你对该行程进行重新规划排序。
// 所有这些机票都属于一个从 JFK（肯尼迪国际机场）出发的先生，所以该行程必须从 JFK 开始。如果存在多种有效的行程，请你按字典排序返回最小的行程组合。
// 例如，行程 ["JFK", "LGA"] 与 ["JFK", "LGB"] 相比就更小，排序更靠前。
// 假定所有机票至少存在一种合理的行程。且所有的机票 必须都用一次 且 只能用一次。
// 示例 1：
// 输入：tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
// 输出：["JFK","MUC","LHR","SFO","SJC"]
// 示例 2：
// 输入：tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
// 输出：["JFK","ATL","JFK","SFO","ATL","SFO"]
// 解释：另一种有效的行程是 ["JFK","SFO","ATL","JFK","ATL","SFO"] ，但是它字典排序更大更靠后。
// 示例 3：
// 输入：tickets = [["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]]
// 输出：["JFK","NRT","JFK","KUL"]
// 解释：另一种有效的行程是 ["JFK","KUL"] ，但是它字典排序更大更靠后。
const findIterationary = (tickets) => {
    // code here 
    // 构建邻接表
    const graph = new Map();
    // 初始化邻接表
    for(const [from, to] of tickets) {
        if(!graph.has(from)) {
            graph.set(from, []);
        }
        graph.get(from).push(to);
    }
    // 对每个起点和目的地进行字典序排序
    for(const destinations/** 每个from对应的to数组 */ of graph.values()) {
        destinations.sort();
    }
    // 回溯递归函数

    // const res = []; // 只存储一个结果的话没必要存数组，因为拷贝数组也要O（n）
    let res = null;
    const totalTickets = tickets.length;
    const backTrack = (current, path, used) => {
        // 如果所有机票都用完了说明找到了有效路径
        if (path.length === totalTickets + 1) { // path里面存的是地点 totalTickets是机票数量是“边”，本来比地点少1
            res = [...path];
            return true;
        }
        // 如果当前机场没有出发的航班，返回false
        if(!graph.has(current)) {
            return false;
        }
        const destinations = graph.get(current);
        // 尝试每个可能的目的地
        for(let i = 0; i < destinations.length; i++) {
            // 使用这张机票
            const next = destinations[i];
            const ticketKey = `${current}-${next}-${i}`;
            // destinations.splice(i, 1); // 表示用掉了这张机票 删除这个to
            // 使用set
            if (used.has(ticketKey)) {
                continue;
            }
            used.add(ticketKey);
            path.push(next); // 加入路径
            // 递归搜索
            if (backTrack(next, path, used)) {
                return true;
            }

            // 回溯 撤销选择
            path.pop();
            // destinations.splice(i, 0, next); // 把这个目的地塞回去
            used.delete(ticketKey);
        }
        return false;
    }
    // 返回结果
    const path = ["JFK"]; // 起始机场
    const used = new Set();
    backTrack("JFK", path, used);
    // return res[0]; // 第一个找到的完整路径就是答案
    return res || path;
}
// 时间复杂度 O(n ^ m) n代表tickets的长度， 每个起点可以飞往m个目的地
// 空间复杂度 O(n) —— 邻接表和递归栈的空间 O(n) = O(n + n);
console.log(findIterationary([["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]))


const findIterationaryNew = (tickets) => {
    // 构建邻接表，使用Map存储目的地及其数量
    const graph = new Map();
    
    for (const [from, to] of tickets) {
        if (!graph.has(from)) {
            graph.set(from, new Map());
        }
        const destinations = graph.get(from);
        destinations.set(to, (destinations.get(to) || 0) + 1);
    }
    
    // 对每个起点的目的地进行字典序排序
    for (const destinations of graph.values()) {
        const sortedEntries = [...destinations.entries()].sort((a, b) => b[0].localeCompare(a[0]));
        destinations.clear();
        for (const [dest, count] of sortedEntries) {
            destinations.set(dest, count);
        }
    }
    
    const result = [];
    const stack = ['JFK'];
    
    while (stack.length > 0) {
        const current = stack[stack.length - 1];
        let hasNext = false;
        
        if (graph.has(current)) {
            const destinations = graph.get(current);
            for (const [dest, count] of destinations) {
                if (count > 0) {
                    destinations.set(dest, count - 1);
                    stack.push(dest);
                    hasNext = true;
                    break;
                }
            }
        }
        
        if (!hasNext) {
            result.push(stack.pop());
        }
    }
    
    return result.reverse();
}
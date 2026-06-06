// 除法求值
const calcEquations = (equations: any, values: any, queries: any) => {
  const dfs = (current, target, graph, visited, product) => {
    if (current === target) {
      return product;
    }
    visited.add(current);
    for (const { neighbour, weight } of graph.get(current)) {
      if (!visited.has(neighbour)) {
        const result: any = dfs(
          neighbour,
          target,
          graph,
          visited,
          product * weight
        );
        if (result !== -1) return result;
      }
    }
    return -1;
  };
  // 建表
  const graph = new Map();
  for (let i = 0; i < equations.length; i++) {
    const [from, to] = equations[i];
    const weight = values[i];
    if (!graph.has(from)) graph.set(from, []);
    if (!graph.has(to)) graph.set(to, []);
    graph.get(from).push({ neighbour: to, weight });
    graph
      .get(to)
      .push({ neighbour: from, weight: 1 / weight /**反向边权重 */ });
  }

  // 对queries的每一项做dfs
  const result = [];
  for (const [from, to] of queries) {
    // 出现了equations中未出现的点，那么直接返回-1
    if (!graph.has(from) || !graph.has(to)) {
      result.push(-1);
    } else if (from === to) {
      result.push(1);
    } else {
      const visited = new Set();
      const val = dfs(from, to, graph, visited, 1 /**product */);
      result.push(val);
    }
  }
  return result;
};
// 时间复杂度 O(N ^2)
// 空间复杂度 O(n)

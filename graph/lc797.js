// 所有可达路径
// 给你一个有 n 个节点的 有向无环图（DAG），请你找出从节点 0 到节点 n-1 的所有路径并输出（不要求按特定顺序）
// graph[i] 是一个从节点 i 可以访问的所有节点的列表（即从节点 i 到节点 graph[i][j]存在一条有向边）

// 示例1
// 输入：graph = [[1,2],[3],[3],[]]
// 输出：[[0,1,3],[0,2,3]]
// 解释：有两条路径 0 -> 1 -> 3 和 0 -> 2 -> 3

// 示例2
// 输入：graph = [[4,3,1],[3,2,4],[3],[4],[]]
// 输出：[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]

const allPathsSourceTarget = (graph) => {
  let res = [] /**用来存放最终结果 */,
    path = []; /**用来存放单一路径 */
  const len = graph.length;
  const dfs = (graph /**图 */, currentNode /**当前遍历到的节点 */) => {
    if (currentNode === len - 1) {
      res.push([...path]);
      return;
    }

    for (let i = 0; i < graph[currentNode].length; i++) {
      path.push(graph[currentNode][i]);
      dfs(graph, graph[currentNode][i]);
      path.pop();
    }
  };
  path.push(0);
  dfs(graph, 0);
  return res;
};

// 时空复杂度分析：
// 时间复杂度：O(2^n * n)
//   - 最坏情况下，每个节点都与其他所有节点相连（完全DAG），路径数量是指数级的 O(2^n)
//   - 每条路径需要 O(n) 时间复制到结果中
//   - 因此总时间复杂度为 O(2^n * n)
//
// 空间复杂度：O(n)
//   - 递归栈深度最多为 n（最长路径长度）
//   - path 数组最多存储 n 个节点
//   - 不考虑结果数组 res 的空间占用
//   - 因此额外空间复杂度为 O(n)

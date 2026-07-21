// 课程表
// 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。
// 在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程  bi 。
// 例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
// 请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。

const canFinish = (numCourses: number, prerequisites: number[][]): boolean => {
  const buildGraph = (numCourses: number, prerequisites: number[][]) => {
    const graph = new Array(numCourses);
    for (let i = 0; i < graph.length; i++) {
      graph[i] = [];
    }
    for (const [to, from] of prerequisites) {
      graph[from].push(to);
    }
    return graph;
  };
  const visited = new Array(numCourses).fill(0); // 0 未访问；1 正在访问；2 访问结束， 被标记为2代表这个链路是安全的
  const dfs = (graph: number[][], visited: number[], courseNum: number) => {
    if (visited[courseNum] === 1) {
      return false; // 有环了！
    }
    // 重要 要检查是否为2
    if (visited[courseNum] === 2) {
      return true;
    }
    visited[courseNum] = 1;
    for (const course of graph[courseNum]) {
      const result = dfs(graph, visited, course);
      if (!result) {
        return false; // 因为如果result为true，说明这条链路安全，可以继续递归别的课程找别的链路了
      }
    }
    visited[courseNum] = 2;
    return true;
  };
  const courseGraph = buildGraph(numCourses, prerequisites);

  for (let i = 0; i < courseGraph.length; i++) {
    if (!dfs(courseGraph, visited, i)) {
      return false;
    }
  }
  return true;
};
// 时间复杂度 O(V + E)
// - V = numCourses（课程数），E = prerequisites.length（先修关系数）
// - 建邻接表需要遍历所有 prerequisites → O(E)
// - DFS 三色标记法中，每个节点（课程）最多访问一次 → O(V)
// - 每条边（先修关系）最多遍历一次 → O(E)
// - 因此总复杂度 O(V + E)
//
// 空间复杂度 O(V + E)
// - 邻接表存储图 → O(V + E)
// - visited 数组 → O(V)
// - 递归调用栈深度最多 O(V)（最坏情况一条链）
// - 因此总空间复杂度 O(V + E)

// === 拓扑排序（Kahn's Algorithm / BFS）===
const canFinishBFS = (
  numCourses: number,
  prerequisites: number[][]
): boolean => {
  // 1. 建邻接表 & 入度数组
  const graph: number[][] = Array.from({ length: numCourses }, () => []);
  const inDegree: number[] = new Array(numCourses).fill(0);

  for (const [to, from] of prerequisites) {
    graph[from].push(to); // from → to
    inDegree[to]++; // to 的先修 +1
  }

  // 2. 队列初始放入所有入度为 0 的课
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  // 3. BFS
  let count = 0;
  while (queue.length) {
    // TODO: 从队列取出一门课，count++
    const course = queue.shift() as number;
    count++;
    // TODO: 遍历它的后继，入度减1，减到0的入队列
    for (const nextCourse of graph[course]) {
      inDegree[nextCourse]--;
      if (inDegree[nextCourse] === 0) {
        queue.push(nextCourse);
      }
    }
  }

  // 4. 判断是否所有课都上完了
  return count === numCourses;
};
// 时间复杂度 O(V + E)
// - 建邻接表和入度数组需遍历所有先修关系 O(E)
// - BFS 中每个节点入队出队一次 O(V)
// - 每条边被访问一次（遍历后继时）O(E)
// - 因此总复杂度 O(V + E)
//
// 空间复杂度 O(V + E)
// - 邻接表 O(V + E)
// - inDegree 数组 O(V)
// - queue 最多 O(V)
// - 因此总空间复杂度 O(V + E)

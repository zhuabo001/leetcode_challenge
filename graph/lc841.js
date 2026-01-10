// 房间和钥匙
// 有 N 个房间，开始时你位于 0 号房间。每个房间有不同的号码：0，1，2，...，N-1，并且房间里可能有一些钥匙能使你进入下一个房间。
// 在形式上，对于每个房间 i 都有一个钥匙列表 rooms[i]，每个钥匙 rooms[i][j] 由 [0,1，...，N-1] 中的一个整数表示，
// 其中 N = rooms.length。 钥匙 rooms[i][j] = v 可以打开编号为 v 的房间
// 最初，除 0 号房间外的其余所有房间都被锁住。
// 你可以自由地在房间之间来回走动。
// 如果能进入每个房间返回 true，否则返回 false。
// 示例 1：
// 输入: [[1],[2],[3],[]]
// 输出: true
// 解释: 我们从 0 号房间开始，拿到钥匙 1。 之后我们去 1 号房间，拿到钥匙 2。 然后我们去 2 号房间，拿到钥匙 3。 最后我们去了 3 号房间。 由于我们能够进入每个房间，我们返回 true。
// 示例 2：
// 输入：[[1,3],[3,0,1],[2],[0]]
// 输出：false
// 解释：我们不能进入 2 号房间。
const canVisitAllRooms = (rooms) => {
  // 如果有房间没有和其他房间连通，也就是说这个房间是孤立的，那就是不能进入所有房间
  // 本题是有向图，在有向图中，即使所有节点都有连接，依然无法从0出发遍历所有节点，例如 [[5], [], [1, 3], [5]]
  // 所以本题是一个有向图搜索全路径的问题 —— 只能用dfs或者bfs来进行搜索
  // dfs
  const dfs = (rooms, room, visited) => {
    if (visited[room] === true) {
      return;
    }
    visited[room] = true;
    const nextRooms = rooms[room];
    for (const room of nextRooms) {
      dfs(rooms, room, visited);
    }
    // 为什么这里不用撤销 —— 因为这个题是让我们确定能不能，而不是找出具体的一条路径；
  };
  const visited = new Array(rooms.length).fill(false);
  dfs(rooms, 0, visited);
  for (let isVisited of visited) {
    if (!isVisited) return false;
  }
  return true;
};
// 时间复杂度 O(N + E) —— N 是房间数量（节点数）+ E 是所有钥匙的总数（边数）+ 个房间最多访问一次，每把钥匙（边）最多遍历一次
// 空间复杂度 O(N) —— visited 数组需要 O(N) 空间 + 归调用栈最坏情况下需要 O(N) 空间

// 单词搜索
// 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。
// 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。
// 同一个单元格内的字母不允许被重复使用。
const exist = (board: string[][], word: string): boolean => {
  // 思路拆解：
  // 单词作为固定路径，本体考察的是是否能找到一个能按照word这个单词走完的路径
  // 在一张图中找到一条可达的路径，并且题目中要求同一个单元格内的字母不允许被重复使用，所以需要一个方式来表示某个字符已经被访问过
  // 方案1: 用一个同样大小的visited二维数组
  // 方案2: 用#来覆盖board[i][j],回溯的时候改回去
  const m = board.length,
    n = board[0].length;
  const dfs = (
    x: number,
    y: number,
    k: number /** k用来表示word的第k个字符 */
  ): boolean => {
    // 失败的情景
    if (
      // 索引判断应该放在最前面
      x < 0 ||
      x >= m ||
      y < 0 ||
      y >= n ||
      board[x][y] === '#' ||
      board[x][y] !== word[k]
    ) {
      return false;
    }
    // 成功的情况
    if (k === word.length - 1) {
      return true;
    }
    // 为什么必须先失败后成功？
    // 如果反过来先判断 k === L - 1，那么当走到最后一个位置但字母不匹配时，你会错误地返回 true。
    // 先过了失败判断，就意味着 board[i][j] === word[k] 已经成立，这时候再判断 k === L - 1 才安全 —— 说明最后一个字符也匹配上了。

    // 标记已经访问过
    let temp = board[x][y];
    board[x][y] = '#';
    // dfs四个方向递归
    const result =
      dfs(x - 1, y, k + 1) ||
      dfs(x + 1, y, k + 1) ||
      dfs(x, y - 1, k + 1) ||
      dfs(x, y + 1, k + 1);
    // 回溯
    board[x][y] = temp;
    return result;
  };
  // 外层dfs循环
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  return false;
};

// 时间复杂度 O(m * n * 3^word.length);3^word.length是dfs的时间复杂度，每个点都要走另外三个方向 —— 不能走回头路，因为来的方向已经被标记为#
// 空间复杂度 O(word.length);递归栈深度就是word的长度

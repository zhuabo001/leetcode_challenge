// 解数独
// 编写一个程序，通过填充空格来解决数独问题。
// 数独的解法需 遵循如下规则：
// 数字 1-9 在每一行只能出现一次。
// 数字 1-9 在每一列只能出现一次。
// 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
// 数独部分空格内已填入了数字，空白格用 '.' 表示。
const isValid = (row, col, board, val) => {
  // 二维数组board[row][col]
  // 同行不重复
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === val) {
      // row固定不变，col变化, 表示在遍历同一行的元素
      return false;
    }
  }
  // 同列不重复
  for (let j = 0; j < 9; j++) {
    if (board[j][col] === val) {
      // col固定不变，row变化, 表示在遍历同一列的元素
      return false;
    }
  }
  // 3x3的九宫格内不重复
  // Math.floor(row / 3) 确定当前行属于哪个九宫格行组（0、1、2）
  // 再乘以 3 得到该九宫格行组的起始行号
  let startRow = Math.floor(row / 3) * 3;
  let startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === val) {
        return false;
      }
    }
  }
  return true;
};
const backTrack = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] !== '.') continue; // 遇到数字跳过只处理空白处
      for (let val = 1; val <= 9; val++) {
        if (isValid(i, j, `${val}`, board)) {
          board[i][j] = `${val}`;
          if (backTrack(board)) {
            return true;
          }

          board[i][j] = `.`;
        }
      }
      return false;
    }
  }
  return true;
};
const solveSudoku = (board) => {
  // code here
  backTrack(board);
  return board;
};

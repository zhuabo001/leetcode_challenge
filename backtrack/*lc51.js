// n皇后
// 给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。
// 每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
// 示例:
// 输入: 4
// 输出: [
//  [".Q..",  // 解法 1
//   "...Q",
//   "Q...",
//   "..Q."],

//  ["..Q.",  // 解法 2
//   "Q...",
//   "...Q",
//   ".Q.."]
// ]
// 解释: 4 皇后问题存在两个不同的解法。
const solveNQueens = (n) => {
    const ans = [];
	const path = [];
	const matrix = new Array(n).fill(0).map(() => new Array(n).fill("."));
    const backTrack = (matrix, row, col) => {
        if (path.length === matrix.length) {
            ans.push([...path]);
            return;
        }
        for (let i = row; i < matrix.length; i++) {
            for (let j = col; j < matrix.length; j++) {
                // 当前位置会有皇后互相攻击
                if (canAttack(matrix, i, j)) {
                    continue;
                }
                matrix[i][j] = "Q";
                path.push(matrix.join(""));
                // 另起一行 同一行只能有一个皇后
                backTrack(matrix, i + 1, 0);
                matrix[i][j] = ".";
                path.pop();
            }
        }
    }
    backTrack(matrix, 0, 0);
    return ans;
    
}
// 时间复杂度： O(n!)
// 空间复杂度：O(n)
// 
const canAttack = (matrix, row, col) => {
	let i;
	let j;
	// 判断正上方和正下方是否有皇后
	for (i = 0, j = col; i < n; i++) {
		if (matrix[i][j] === "Q") {
			return true;
		}
	}
	// 判断正左边和正右边是否有皇后
	for (i = row, j = 0; j < n; j++) {
		if (matrix[i][j] === "Q") {
			return true;
		}
	}
	// 判断左上方是否有皇后
	for (i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
		if (matrix[i][j] === "Q") {
			return true;
		}
	}
        // 判断右上方是否有皇后
	for (i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
		if (matrix[i][j] === "Q") {
			return true;
		}
	}
	return false;
};

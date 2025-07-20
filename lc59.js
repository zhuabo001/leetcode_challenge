// 59. 螺旋矩阵 II
// 给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。
// 示例 1：
// 输入：n = 3
// 输出：[[1,2,3],[8,9,4],[7,6,5]]
// 示例 2：
// 输入：n = 1
// 输出：[[1]]
const generateMatrix = (n) => {
  let startX = 0, startY = 0;
  let loop = Math.floor(n / 2);
  let mid = Math.floor(n / 2);
  let offset = 1;// 控制每一圈填充元素个数, 当一圈转完时，这个标志符要自增1
  let count = 1; // 填充矩阵的数字
  let res = new Array(n).fill(0).map(() => new Array(n).fill(0));
  while(loop--){
    // 上行从左到右(左闭右开)
    // 右列从上到下((左闭右开))
    // 下行从右到左(左闭右开)
    // 左列从下到上(左闭右开)
    let row = startX, col = startY;
    for(; col < n - offset; col++){
      res[row][col] = count++;
    }
    for(;row < n - offset; row++){
      res[row][col] = count++;
    }
    for(;col > startY; col--){
      res[row][col] = count++;
    }
    for(; row > startX; row--){
      res[row][col] = count++;
    }
    // 更新起始位置
    startX++;
    startY++;
    // 更新offset
    offset++;
  }
  // 如果n为奇数，则需要单独给矩阵最中间的位置赋值
  if(n % 2 == 1){
    res[mid][mid] = count;
  }
  return res;
}
console.log(generateMatrix(3));
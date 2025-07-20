// 区间和
// 给定一个整数数组 Array，请计算该数组在每个指定区间内元素的总和。

// 输入描述
// 第一行输入为整数数组 Array 的长度 n，接下来 n 行，每行一个整数，表示数组的元素。随后的输入为需要计算总和的区间，直至文件结束。
// 输出描述
// 输出每个指定区间内元素的总和
// 示例
// 输入
// 5
// 1
// 2
// 3
// 4
// 5
// 1 3
// 2 4
// 1 5
// 输出
// 6
// 9
// 15
function prefixSum() {
    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let inputLines = [];
    rl.on('line', (line) => {
        inputLines.push(line.trim());
    });

    rl.on('close', () => {
      // code here
        // 读取项数 n
        const n = parseInt(inputLines[0]);
        let inputArr = inputLines.slice(1, n + 1).map(Number);
        let sumArr = new Array(n).fill(0); // 用来存放前缀和即数组下标中0到i的元素的和
        for(let i = 1; i < n; i++){
          sumArr[i] = sumArr[i - 1] + inputArr[i]
        }
        // 处理区间和查询
        for(let i = n + 1; i < inputLines.length; i++){
          const [left, right] = inputLines[i].split(' ').map(Number);
          if(left === 0 ){
            return sumArr[right];
          } else {
            return sumArr[right] - sumArr[left - 1];
          }
        }
        
    });
}
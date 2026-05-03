// 单调递增的数字
// 当且仅当每个相邻位数上的数字 x 和 y 满足 x <= y 时，我们称这个整数是单调递增的。
// 给定一个整数 N，找到小于或等于 N 的最大单调递增的整数（单调递增的数，且其数字和与 N 相同）。
// 示例 1:
// 输入: N = 10
// 输出: 9

// 示例 2:
// 输入: N = 1234
// 输出: 1234

// 示例 3:
// 输入: N = 332
// 输出: 299
// 思路： 从后向前遍历，找到第一个不满足单调递增的位置，将该位置的数字减1，后面的数字全部设为9
const monotoneIncreasingDigits = (num) => {
  const numStr = num.toString();
  const len = numStr.length;
  let numArr = numStr.split(''); // 在js中 是不允许直接修改字符串中的值的！！！！ 所以需要先将字符串转换为数组
  let flag = len;

  for (let i = len - 1; i > 0; i--) {
    if (numArr[i] < numArr[i - 1]) {
      flag = i;
      numArr[i - 1] = String(Number(numArr[i - 1]) - 1);
    }
  }

  for (let i = flag; i < len; i++) {
    numArr[i] = '9';
  }

  return Number(numArr.join(''));
};

// 93. 复原 IP 地址
// 有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。
// 例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。
// 给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，这些地址可以通过在 s 中插入 '.' 来形成。你 不能 重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。
/**
 * @param {string} s
 * @return {string[]}
 */
const restoreIpAddresses = (s) => {
  // code here
  const res = [];
  const backTrack = (s, startIndex, pointNum /** 记录点的数量 */) => {
    if (pointNum === 3/**说明此时已经有四段 不用再分割了 */) {
        // 判断第四段是否合法， 合法的话记录下来
        if(isValidIpAddress(s, startIndex, s.length - 1)) {
            res.push(s/** 这个s是插入'.'后的字符串 */);
        }
    }
    // 主要是判断[startIndex, i] 这一段左闭右闭的字符串是否合法
    for(let i = startIndex; i < s.length; i++) {
        // 如果[startIndex, i]这一段合法 进行递归回溯，如果不合法 直接break跳出循环
        if(isValidIpAddress(s, startIndex, i)){
            // 在i的后面插入一个'.'
            s = s.slice(0, i + 1) + '.' + s.slice(i + 1);
            pointNum += 1
            // 回溯
            backTrack(s, i + 2/**我们已经处理了 [startIndex, i] 这一段，并在 i 后面加了点，下一段应该从点的下一个位置开始，即 i + 2 */, pointNum);
            // 回溯删除'.'
            pointNum -= 1;
            s = s.slice(0, i + 1) + s.slice(i + 2);
        }
    }
  }
  backTrack(s, 0, 0);
  return res;
};
// 时间复杂度 O(3^4 × n) = O(n) （因为3^4是常数）
/**
 * 
 * 递归深度 ：最多需要插入3个点，所以递归深度最大为4层
 * 在每一层，我们最多可以选择3个字符作为一个IP段（因为IP段最大值是255，最多3位数），所以每层最多有3个分支
 * 总的递归调用次数 ：最坏情况下是 3^4 = 81 次递归调用
 * 每次递归的操作： isValidIpAddress 函数：O(3) = O(1)（最多检查3个字符）；字符串切片和拼接操作：O(n)（其中n是字符串长度
 */
// 空间复杂度
/**
 * 递归调用栈 ：最大深度为4，每层存储常数空间，所以递归栈空间为O(1)
 * 字符串操作 ：在回溯过程中，每次都会创建新的字符串（通过slice和拼接），
 * 最坏情况下字符串长度为n+3（原字符串加3个点），所以单次操作空间为O(n)
 * res 数组存储所有有效的IP地址，最多有常数个有效IP（因为只有有限种组合），每个IP长度最多为n+3，所以结果存储空间为O(n)
 */


// 工具函数：判断字符串s在左闭右闭区间[start, end]所组成的数字是否合法
const isValidIpAddress = (s, start, end) => {
    if(start > end) return false;
    // 0开头的数字不合法
    if(s[start] === '0' && start !== end) {
      return false;
    }
    let num = 0;
    for(let i = start; i <= end; i++){
      // 非数字不合法
      if(s[i] < '0' || s[i] > '9') {
          return false;
      }
      // 大于255的数字不合法
      num = num * 10 + (s[i] - '0');
      if(num > 255) {
          return false;
      }
    }
    return true;
  }



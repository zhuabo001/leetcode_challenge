// 字符串解码
// 给定一个经过编码的字符串，返回它解码后的字符串。
// 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
// 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
// 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
const decodeString = (s: string): string => {
  const stackNumber: number[] = [],
    stackChar: string[] = [];
  let curStr = '';
  let curNum = 0;
  for (const char of s) {
    if (char === '[') {
      stackChar.push(curStr);
      stackNumber.push(curNum);
      curNum = 0;
      curStr = '';
    } else if (char === ']') {
      // 从数字栈中弹出数字，字符栈中弹出字符prev
      let num = stackNumber.pop() as number;
      let prev = stackChar.pop() as string;
      curStr = prev + curStr.repeat(num);
    } else if (!isNaN(Number(char))) {
      curNum = curNum * 10 + parseInt(char);
    } else {
      // char是字母直接往 curStr 上面拼
      curStr += char;
    }
  }
  return curStr;
};

// 时间复杂度 O(N)
// 空间复杂度 O(N)

// 解题思路:
// 用两个栈（stackNumber, stackChar）和一个当前变量（curNum, curStr）逐字符遍历。
//
// 遇到数字 → curNum = curNum * 10 + digit（兼容多位数字）
// 遇到 '['  → 把当前进度（curStr, curNum）分别入栈保存，然后重置，准备处理括号内的内容
// 遇到字母 → curStr += char（拼到当前层的结果上）
// 遇到 ']'  → 弹出数字 num 和前一段字符串 prev
//             curStr = prev + curStr.repeat(num)
//             即：前面已经拼好的字符串 + 括号里的内容重复 num 次
//
// 核心比喻：[' 是"存进度"，']' 是"取进度并翻倍"

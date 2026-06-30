// 有效的括号
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：
// - 左括号必须用相同类型的右括号闭合。
// - 左括号必须以正确的顺序闭合。
// - 每个右括号都有一个对应的相同类型的左括号。
type MapItem = '(' | '[' | '{';
const isValidBrackets = (s: string): boolean => {
  if (s.length % 2 === 1) return false;
  const map = {
    '(': ')',
    '[': ']',
    '{': '}',
  };
  const stack = [];
  for (const char of s) {
    if (char in map) {
      stack.push(char);
      continue;
    } else {
      const topElement = stack.pop();
      if (map[topElement as MapItem] !== char) {
        return false;
      }
    }
  }
  return !stack.length;
};
// 时间复杂度 O(n)
// 空间复杂度 O(n) - 有个栈在呢

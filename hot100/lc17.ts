// 电话号码的字母组合
// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母

const letterCombination = (digits: string): string[] => {
  const map = [
    '' /**数字0 */,
    '' /**数字1 */,
    'abc' /**数字2 */,
    'def',
    'ghi',
    'jkl',
    'mno',
    'pqrs',
    'tuv',
    'wxyz',
  ]; // 分别对应数字2-9
  if (digits.length === 0) return [];
  if (digits.length === 1) return map[Number(digits[0])].split('');

  const res: string[] = [],
    path: string[] = [];
  const backTrack = (digits: string, length: number, index: number) => {
    if (path.length === length) {
      res.push(path.join(''));
      return;
    }
    for (const char of map[Number(digits[index])]) {
      path.push(char);
      backTrack(digits, length, index + 1);
      path.pop();
    }
  };
  backTrack(digits, digits.length, 0);
  return res;
};

// 时间复杂度 O(n * 4^n) - 每个数字对应最多4种字母，总组合数为各数字字母数的乘积（最坏4^n），每次拼接字符串O(n)
// 空间复杂度 O(n) - 递归深度 n，path 数组长度 n（不计输出结果的空间）

// 字母异位词分组
const groupAnagrams = (strs: string[]): unknown[][] => {
  if (!strs || strs.length === 0) return [[]];
  const ans = new Map();
  for (const str of strs) {
    const tempStr = str
      .split('')
      .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
      .join('');
    if (ans.has(tempStr)) {
      ans.get(tempStr).push(str);
    } else {
      ans.set(tempStr, [str]);
    }
  }
  return Array.from(ans.values());
};

const example = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
console.log(groupAnagrams(example));

// 时间复杂度 O(N + klogk) - k是每个小字符串的长度
// 空间复杂度 O(N * k) 存储n个字符串每个字符串长度为k

// 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
const groupAnagramsII = (strs: string) => {
  if (!strs || strs.length === 0) return [[]];
  const ans = new Map();
  for (const str of strs) {
    const tempStr = str
      .split('')
      .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
      .join('');
    if (ans.has(tempStr)) {
      ans.get(tempStr).push(str);
    } else {
      ans.set(tempStr, [str]);
    }
  }
  return Array.from(ans.values());
};
// 时间复杂度 O(N + klogk) - k是每个小字符串的长度
// 空间复杂度 O(N * k) 存储n个字符串每个字符串长度为k

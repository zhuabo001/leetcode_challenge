// 205 同构字符串
// 给定两个字符串 s 和 t ，判断它们是否是同构的。
// 如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。
// 每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身。
// 示例 1:
// 输入: s = "egg", t = "add"
// 输出: true
// 示例 2：
// 输入：s = "foo", t = "bar"
// 输出：false
// 限制1: 相同的字符只能映射到同一个字符上
// 限制2: 不同的字符不能映射到同一个字符上
const isIsomorphic = (s, t) => {
  // 双哈希映射
  // 1. 如果s和t的长度不同，直接返回false
  if (s.length !== t.length) return false;
  // 2. 创建s到t的映射哈希表和t到s的映射哈希表
  const sToT = new Map();
  const tToS = new Map();
  // 3. 遍历s和t，分别填充两个哈希表
  for (let i = 0; i < s.length; i++) {
    const charS = s[i];
    const charT = t[i];
    // 4. 检查s->t的映射是否一致
    if (sToT.has(charS)) {
      if (sToT.get(charS) !== charT) return false;
    } else {
      sToT.set(charS, charT);
    }

    // 5. 检查t->s的映射是否一致
    if (tToS.has(charT)) {
      if (tToS.get(charT) !== charS) return false;
    } else {
      tToS.set(charT, charS);
    }
  }
  return true;
};
// 时间复杂度: O(n)
// 空间复杂度: O(n)
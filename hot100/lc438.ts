// 找到字符串中所有字母异位词
// 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
// 示例 1:

// 输入: s = "cbaebabacd", p = "abc"
// 输出: [0,6]
// 解释:
// 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
// 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
const finAnagrams = (s: string, p: string): number[] => {
  const result: number[] = [];
  // 先统计p中每个字符的个数，但其实countP代表了p 中该字符的数量 - 窗口中该字符的数量
  const countP = new Array(26 /**26个字母 */).fill(0);
  for (const char of p) {
    countP[char.charCodeAt(0) - 97]++;
  }
  const len = p.length;
  // 定义两个指针，起点一致
  let left = 0,
    right = 0;
  // diff 表示 '当前窗口内与p还有几个字符没对齐——不同'
  // 初始值是p的不同的字符个数
  let diff = new Set(p).size;
  while (right < s.length) {
    // 先处理s[right], 如果这个字符在p中存在，那么countP对应的字母个数 -1

    countP[s[right].charCodeAt(0) - 97]--;
    if (countP[s[right].charCodeAt(0) - 97] === 0) {
      diff--;
    }

    // // 如果这个在p中存在的字母char,count[char] === 0, 说明这个字符已经对齐了，diff--
    // // 如果窗口长度到达p.length， 检查diff是否为0
    // // 如果是，记录 left
    // if (right - left + 1 === len && diff === 0) {
    //   result.push(left);
    // }
    //
    // // 窗口超出 p.length 时，移动左指针
    // if (right - left + 1 > len) {
    //   countP[s[left].charCodeAt(0) - 97]++;
    //   if (countP[s[left].charCodeAt(0) - 97] === 1) {
    //     diff++;
    //   }
    //   left++;
    // }
    // // 把离开窗口的字符加回 count
    // // 如果 count[char] === 1，说明刚好从 0 变成不匹配，diff 加 1

    // 修复：先收缩再检查。
    // 否则窗口膨胀到 len+1 时，收缩后变成 len 的窗口没有被检查到
    // 窗口超出 p.length 时，先移动左指针收缩
    if (right - left + 1 > len) {
      countP[s[left].charCodeAt(0) - 97]++;
      if (countP[s[left].charCodeAt(0) - 97] === 1) {
        diff++;
      }
      left++;
    }
    // 收缩后再检查 —— 如果窗口长度到达 p.length 且 diff === 0，记录 left
    if (right - left + 1 === len && diff === 0) {
      result.push(left);
    }

    right++;
  }
  return result;
};
// 时间复杂度 O(n)
// 空间复杂度 O(1)

// 题解：
// 核心逻辑：countP 与 diff 的关系
// countP[char] 表示"p 中该字符的数量 - 窗口中该字符的数量"
// 初始化时 countP 记录 p 中各字符的个数，diff = 不同字符种类数
// 注意：初始窗口为空，countP 看起来只是 p 的字符统计；
// 但随着窗口滑动，countP 实际上是“差额表”：
//   > 0  表示窗口里该字符还不够
//   === 0 表示刚好对齐
//   < 0  表示窗口里该字符过多
//
// 字符进入窗口（right++）：先减后检查
//   减之后 countP[x] === 0 → 该字符对齐了 → diff--
//   减之后 countP[x] === -1 → 窗口中该字符过多了 → diff 不变（只有变为 0 才会触发 diff--）
//
// 字符离开窗口（left++）：先检查后加
//   加之前 countP[x] === 0 → 加之后变为 1 → 从对齐变成不对齐 → diff++
//   加之前 countP[x] === -1 → 加之后变为 0 → 从过量变回对齐 → diff 不变（只有 0→1 才会触发 diff++）
//
// 当 diff === 0 时，窗口中所有字符的数量都与 p 完全一致 → 异位词

// 为什么不需要 if (p.includes(s[right]))？
// 不在 p 中的字符天然不会影响 diff，直接对 countP 做 -- 是安全的。
//
// 以 p = "abc"、s[right] = 'd' 为例：
//   初始化时 countP['d'] = 0（p 中根本不需要它）
//   'd' 进入窗口：countP['d']-- 变为 -1
//     减之前是 0，不是 1，不会触发 diff--
//   'd' 离开窗口：countP['d']++ 变回 0
//     加之后是 0，不是 1，不会触发 diff++
// 所以 'd' 的整个生命周期都不会影响 diff。
//
// 如果显式写 if (p.includes(s[right]))，每次右指针移动都要遍历 p，
// 时间复杂度会从 O(n) 退化到 O(n × m)（m 为 p 的长度）。
// 用 countP 的 0/-1 状态隐式过滤无关字符，是更优的滑动窗口写法。

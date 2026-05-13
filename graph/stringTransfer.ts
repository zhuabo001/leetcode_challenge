/**
 * 110. 字符串迁移
 *
 * 【题目描述】
 * 字典 strList 中从字符串 beginStr 和 endStr 的转换序列是一个按下述规格形成的序列：
 * 1. 序列中第一个字符串是 beginStr。
 * 2. 序列中最后一个字符串是 endStr。
 * 3. 每次转换只能改变一个字符。
 * 4. 转换过程中的中间字符串必须是字典 strList 中的字符串，且 strList 里的每个字符串只使用一次。
 *
 * 给你两个字符串 beginStr 和 endStr 和一个字典 strList，找到从 beginStr 到 endStr 的最短转换序列中的字符串数目。
 * 如果不存在这样的转换序列，返回 0。
 *
 * 【输入描述】
 * 第一行包含一个整数 N，表示字典 strList 中的字符串数量。
 * 第二行包含两个字符串，用空格隔开，分别代表 beginStr 和 endStr。
 * 后续 N 行，每行一个字符串，代表 strList 中的字符串。
 *
 * 【输出描述】
 * 输出一个整数，代表从 beginStr 转换到 endStr 需要的最短转换序列中的字符串数量。
 * 如果不存在这样的转换序列，则输出 0。
 *
 * 【输入示例】
 * 6
 * abc def
 * efc
 * dbc
 * ebc
 * dec
 * dfc
 * yhn
 *
 * 【输出示例】
 * 4
 *
 * 【提示信息】
 * 从 startStr 到 endStr，在 strList 中最短的路径为 abc -> dbc -> dec -> def，所以输出结果为 4。
 *
 * 数据范围：2 <= N <= 500
 */
/**
 * 大概懂什么意思：beginStr要在strList中找和自身差一个字符的str，然后找到和endStr只差一个字符的str
 * bfs找最短路径
 * 通配符模式来判断是否只差一个字符(不会)
 * @param beginStr
 * @param endStr
 * @param strList
 */

const buildPatternMap = (strList: string[]): Map<string, string[]> => {
  const patternMap = new Map<string, string[]>();
  // 构建patterMap
  for (const word of strList) {
    for (let i = 0; i < word.length; i++) {
      const pattern = word.slice(0, i) + '*' + word.slice(i + 1); // 将 word[i] 替换为 *

      if (!patternMap.has(pattern)) {
        patternMap.set(pattern, []);
      }
      (patternMap.get(pattern) as string[]).push(word);
    }
  }
  return patternMap;
};

const stringTransfer = (
  beginStr: string,
  endStr: string,
  strList: string[]
): number => {
  if (beginStr === endStr) return 1;
  const patternMap = buildPatternMap(strList);
  const visited = new Set<string>();
  // bfs找step
  const bfs = (word: string) => {
    let step: number = 1; // 题目要求的是"序列中的字符串数量"，beginStr 本身就算一个
    const queue = [word];
    visited.add(word);
    while (queue.length) {
      const size = queue.length;
      for (let i = 0; i < size; i++) {
        const cur = queue.shift()!;
        // 检查 cur 能否一步变成 endStr
        let diffCount = 0;
        for (let k = 0; k < cur.length; k++) {
          if (cur[k] !== endStr[k]) diffCount++;
        }
        if (diffCount === 1) return step + 1;

        for (let j = 0; j < cur.length; j++) {
          const curPattern = cur.slice(0, j) + '*' + cur.slice(j + 1);
          for (const neighbor of patternMap.get(curPattern) ?? []) {
            // if (neighbor === endStr) return step + 1;
            if (!visited.has(neighbor)) {
              visited.add(neighbor);
              queue.push(neighbor);
            }
          }
        }
      }
      step++;
    }
    return 0;
  };
  let res = bfs(beginStr);
  return res;
};


/**
 * 【时空复杂度分析】
 *
 * 设 N = strList 中字符串的数量，L = 字符串长度。
 *
 * 【时间复杂度：O(N × L²)】
 * 1. 构建 patternMap：
 *    遍历 N 个单词，每个单词生成 L 个 pattern，每个 pattern 生成耗时 O(L)。
 *    总耗时 O(N × L²)。
 *
 * 2. BFS 搜索：
 *    最坏情况下访问全部 N 个单词。
 *    对每个单词，先与 endStr 逐字符比较，耗时 O(L)。
 *    再生成 L 个 pattern（每个 O(L)），并在 patternMap 中查找邻居。
 *    因此 BFS 阶段总耗时也为 O(N × L²)。
 *
 *    综上，整体时间复杂度为 O(N × L²)。
 *
 * 【空间复杂度：O(N × L)】
 * 1. patternMap：
 *    每个单词贡献 L 个 pattern，共 N × L 个键；每个单词出现在 L 个列表中。
 *    总空间 O(N × L)。
 *
 * 2. visited 集合 + BFS 队列：
 *    最坏存储全部 N 个单词，空间 O(N × L)。
 *
 *    综上，整体空间复杂度为 O(N × L)。
 */

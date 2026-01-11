// 单词接龙
// 字典 wordList 中从单词 beginWord 和 endWord 的 转换序列 是一个按下述规格形成的序列：
// 1. 序列中第一个单词是 beginWord 。
// 2. 序列中最后一个单词是 endWord 。
// 3. 每次转换只能改变一个字母。
// 4. 转换过程中的中间单词必须是字典 wordList 中的单词。
// 5. 给你两个单词 beginWord 和 endWord 和一个字典 wordList ，找到从 beginWord 到 endWord 的 最短转换序列 中的 单词数目 。如果不存在这样的转换序列，返回 0。
// 示例 1：
// 输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
// 输出：5
// 解释：一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog", 返回它的长度 5。

// 示例 2：
// 输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
// 输出：0
// 解释：endWord "cog" 不在字典中，所以无法进行转换

// 数学定理： 定理：在无权图中，BFS第一次访问到目标节点时，找到的路径**一定**是**最短路径**。

const ladderLength = (beginWord, endWord, wordList) => {
  // 1. 图中的线是如何连在一起的
  // 2. 起点和终点的最短路径
  // 首先题目中并没有给出点与点之间的连线，而是要我们自己去连，条件是字符只能差一个，
  // 所以判断点与点之间的关系，要自己判断是不是差一个字符，如果差一个字符，那就是有链接
  // 求起点和终点的最短路径长度，这里无向图求最短路，广搜最为合适，广搜只要搜到了终点，那么一定是最短的路径。
  // 因为广搜就是以起点中心向四周扩散的搜索。
  // tips 1: 本题是一个无向图，需要用标记位，标记着节点是否走过，否则就会死循环
  // tips 2： 本题给出集合是数组型的，可以转成set结构，查找更快一些
  const wordSet = new Set(wordList);
  if (wordSet.size === 0 || !wordSet.has(endWord)) return 0;
  // 记录word是否访问过
  const visitedMap = new Map(); // <word, 查询到的 到这个word的路径长度>
  // 初始化队列
  const queue = [beginWord];
  // 初始化标记map
  visitedMap.set(beginWord, 1);

  while (queue.length !== 0) {
    let word = queue.shift(); // 提取队首元素
    let path = visitedMap.get(word); // 获得beginWord到这个word的路径长度
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        // 对应26个字母ASCII值 从'a' 到 'z' 遍历替换
        // 拼串获得新的字符串
        let newWord =
          word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (newWord === endWord) return path + 1;
        // wordSet出现了newWord，并且newWord没有被访问过
        if (wordSet.has(newWord) && !visitedMap.has(newWord)) {
          visitedMap.set(newWord, path + 1);
          queue.push(newWord);
        }
      }
    }
  }
  return 0;
};
// 时间复杂度 O(N × M²) - N = wordList 中单词的数量， M = 每个单词的长度
// 空间复杂度 O(N × M) -
// wordSet：存储 N 个单词，每个长度 M → O(N × M)，
// isitedMap：最多存储 N 个单词 → O(N × M)，
// queue：最坏情况存储 N 个单词 → O(N × M)
// 临时变量：O(1)
// O(N × M) + O(N × M) + O(N × M) = O(N × M)

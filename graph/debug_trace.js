// 详细追踪 lc127.js 的执行过程
const ladderLength1 = (beginWord, endWord, wordList) => {
  console.log('=== 开始执行 ===');
  console.log('beginWord:', beginWord);
  console.log('endWord:', endWord);
  console.log('wordList:', wordList);

  const wordSet = new Set(wordList);
  console.log('wordSet:', wordSet);

  if (wordSet.size === 0 || !wordSet.has(endWord)) {
    console.log('endWord 不在 wordSet 中，返回 0');
    return 0;
  }

  const visitedMap = new Map();
  const queue = [beginWord];
  visitedMap.set(beginWord, 1);

  console.log('初始状态:');
  console.log('  queue:', queue);
  console.log('  visitedMap:', visitedMap);
  console.log('');

  let iteration = 0;
  while (queue.length !== 0) {
    iteration++;
    console.log(`=== 第 ${iteration} 次迭代 ===`);
    let word = queue.shift();
    let path = visitedMap.get(word);
    console.log(`  处理单词: "${word}", path = ${path}`);

    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        let newWord =
          word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);

        if (newWord === endWord) {
          console.log(`  ✓ 找到 endWord "${newWord}"，返回 ${path + 1}`);
          return path + 1;
        }

        if (wordSet.has(newWord) && !visitedMap.has(newWord)) {
          console.log(`  → 找到邻居 "${newWord}"，加入队列，path = ${path + 1}`);
          visitedMap.set(newWord, path + 1);
          queue.push(newWord);
        }
      }
    }
    console.log(`  队列状态: ${JSON.stringify(queue)}`);
    console.log(`  visitedMap: ${JSON.stringify(Object.fromEntries(visitedMap))}`);
    console.log('');
  }
  console.log('未找到路径，返回 0');
  return 0;
};

console.log('测试: beginWord="a", endWord="c", wordList=["b","c"]');
console.log('期望: 3 (a -> b -> c)');
console.log('');
ladderLength1("a", "c", ["b","c"]);
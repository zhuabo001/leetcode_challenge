// 测试关键差异：当 beginWord 可以直接转换为 endWord 时

const ladderLength1 = require('./lc127.js');

const ladderLength2 = (beginWord, endWord, wordList) => {
  const wordSet = new Set(wordList);
  const queue = [];
  queue.push([beginWord, 1]);

  while (queue.length) {
    const [word, level] = queue.shift();
    if (word == endWord) {
      return level;
    }
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const newWord =
          word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (wordSet.has(newWord)) {
          queue.push([newWord, level + 1]);
          wordSet.delete(newWord);
        }
      }
    }
  }
  return 0;
};

console.log('=== 关键测试：beginWord 可以直接转换为 endWord ===\n');

// 测试用例：hit -> hot (只改变一个字母)
console.log('测试用例: beginWord="hit", endWord="hot", wordList=["hot"]');
console.log('lc127.js 输出:', ladderLength1("hit", "hot", ["hot"]));
console.log('lc127-online.js 输出:', ladderLength2("hit", "hot", ["hot"]));
console.log('期望: 2 (hit -> hot)');
console.log('');

// 测试用例：a -> b (只改变一个字母)
console.log('测试用例: beginWord="a", endWord="b", wordList=["b"]');
console.log('lc127.js 输出:', ladderLength1("a", "b", ["b"]));
console.log('lc127-online.js 输出:', ladderLength2("a", "b", ["b"]));
console.log('期望: 2 (a -> b)');
console.log('');

// 测试用例：a -> c (需要两步)
console.log('测试用例: beginWord="a", endWord="c", wordList=["b","c"]');
console.log('lc127.js 输出:', ladderLength1("a", "c", ["b","c"]));
console.log('lc127-online.js 输出:', ladderLength2("a", "c", ["b","c"]));
console.log('期望: 3 (a -> b -> c)');
console.log('');

// 测试用例：hit -> hat (只改变一个字母)
console.log('测试用例: beginWord="hit", endWord="hat", wordList=["hat"]');
console.log('lc127.js 输出:', ladderLength1("hit", "hat", ["hat"]));
console.log('lc127-online.js 输出:', ladderLength2("hit", "hat", ["hat"]));
console.log('期望: 2 (hit -> hat)');
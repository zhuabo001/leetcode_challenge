// 测试两个版本的差异
const ladderLength1 = require('./lc127.js');

// 复制 lc127-online.js 的代码
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

console.log('=== 测试两个版本 ===\n');

// 测试用例 1
console.log('测试用例 1:');
const input1 = { beginWord: "hit", endWord: "cog", wordList: ["hot","dot","dog","lot","log","cog"] };
console.log('输入:', JSON.stringify(input1));
console.log('lc127.js 输出:', ladderLength1("hit", "cog", ["hot","dot","dog","lot","log","cog"]));
console.log('lc127-online.js 输出:', ladderLength2("hit", "cog", ["hot","dot","dog","lot","log","cog"]));
console.log('期望: 5');
console.log('');

// 测试用例 2
console.log('测试用例 2:');
const input2 = { beginWord: "hit", endWord: "cog", wordList: ["hot","dot","dog","lot","log"] };
console.log('输入:', JSON.stringify(input2));
console.log('lc127.js 输出:', ladderLength1("hit", "cog", ["hot","dot","dog","lot","log"]));
console.log('lc127-online.js 输出:', ladderLength2("hit", "cog", ["hot","dot","dog","lot","log"]));
console.log('期望: 0');
console.log('');

// 测试用例 3: beginWord 在 wordList 中
console.log('测试用例 3: beginWord 在 wordList 中');
const input3 = { beginWord: "hot", endWord: "cog", wordList: ["hot","dot","dog","lot","log","cog"] };
console.log('输入:', JSON.stringify(input3));
console.log('lc127.js 输出:', ladderLength1("hot", "cog", ["hot","dot","dog","lot","log","cog"]));
console.log('lc127-online.js 输出:', ladderLength2("hot", "cog", ["hot","dot","dog","lot","log","cog"]));
console.log('期望: 4 (hot -> dot -> dog -> cog)');
console.log('');

// 测试用例 4: beginWord == endWord
console.log('测试用例 4: beginWord == endWord');
const input4 = { beginWord: "hit", endWord: "hit", wordList: ["hit"] };
console.log('输入:', JSON.stringify(input4));
console.log('lc127.js 输出:', ladderLength1("hit", "hit", ["hit"]));
console.log('lc127-online.js 输出:', ladderLength2("hit", "hit", ["hit"]));
console.log('期望: 1');
console.log('');

// 测试用例 5: beginWord == endWord 且都在 wordList 中
console.log('测试用例 5: beginWord == endWord 且都在 wordList 中');
const input5 = { beginWord: "hot", endWord: "hot", wordList: ["hot"] };
console.log('输入:', JSON.stringify(input5));
console.log('lc127.js 输出:', ladderLength1("hot", "hot", ["hot"]));
console.log('lc127-online.js 输出:', ladderLength2("hot", "hot", ["hot"]));
console.log('期望: 1');
// 对比两个题解的逻辑差异

console.log('=== lc127.js 和 lc127-online.js 的逻辑差异对比 ===\n');

console.log('## 1. 队列存储方式不同\n');
console.log('lc127.js:');
console.log('  queue = [beginWord]  // 只存储单词');
console.log('  visitedMap 存储: {word: pathLength}');
console.log('');
console.log('lc127-online.js:');
console.log('  queue = [[beginWord, 1]]  // 存储单词和层级');
console.log('');
console.log('差异: lc127-online.js 将层级信息直接存储在队列中，不需要额外的 visitedMap\n');

console.log('## 2. 访问标记方式不同\n');
console.log('lc127.js:');
console.log('  使用 visitedMap 单独记录访问状态和路径长度');
console.log('  检查: !visitedMap.has(newWord)');
console.log('  标记: visitedMap.set(newWord, path + 1)');
console.log('');
console.log('lc127-online.js:');
console.log('  直接从 wordSet 中删除已访问的单词');
console.log('  检查: wordSet.has(newWord)');
console.log('  标记: wordSet.delete(newWord)');
console.log('');
console.log('差异: lc127-online.js 修改了原始的 wordSet，而 lc127.js 保持 wordSet 不变\n');

console.log('## 3. 终点检查时机不同\n');
console.log('lc127.js:');
console.log('  在生成 newWord 后立即检查 if (newWord === endWord)');
console.log('  在生成所有可能的单词时检查\n');
console.log('lc127-online.js:');
console.log('  在从队列取出单词后检查 if (word == endWord)');
console.log('  在处理单词时检查\n');
console.log('差异: lc127.js 可以提前返回，lc127-online.js 需要将 endWord 加入队列后才能检查\n');

console.log('## 4. 边界情况处理\n');
console.log('lc127.js:');
console.log('  ✓ 检查空字符串');
console.log('  ✓ 检查空数组');
console.log('  ✓ 检查 beginWord === endWord');
console.log('  ✓ 检查 endWord 是否在 wordList 中');
console.log('');
console.log('lc127-online.js:');
console.log('  ✗ 没有边界情况检查');
console.log('');
console.log('差异: lc127.js 更健壮，能处理各种边界情况\n');

console.log('## 5. 空间复杂度\n');
console.log('lc127.js:');
console.log('  wordSet: O(N × M) - 保持不变');
console.log('  visitedMap: O(N × M) - 额外空间');
console.log('  queue: O(N × M)');
console.log('  总计: O(N × M)');
console.log('');
console.log('lc127-online.js:');
console.log('  wordSet: O(N × M) - 逐渐减小');
console.log('  queue: O(N × M)');
console.log('  总计: O(N × M)');
console.log('');
console.log('差异: lc127-online.js 空间略优，因为不需要 visitedMap\n');

console.log('## 6. 代码简洁性\n');
console.log('lc127.js:');
console.log('  代码行数较多，但逻辑清晰');
console.log('  使用了额外的数据结构，但更易理解');
console.log('');
console.log('lc127-online.js:');
console.log('  代码更简洁');
console.log('  利用了 wordSet 的删除操作来标记访问\n');

console.log('## 7. 潜在问题\n');
console.log('lc127.js:');
console.log('  无明显问题，逻辑正确');
console.log('');
console.log('lc127-online.js:');
console.log('  ⚠️ 如果 beginWord 在 wordList 中，会被删除，可能影响后续逻辑');
console.log('  ⚠️ 修改了原始的 wordSet，如果需要后续使用会有问题');
console.log('  ⚠️ 没有边界情况检查，可能在极端情况下出错\n');

console.log('## 8. 性能对比\n');
console.log('lc127.js:');
console.log('  Map.has() 和 Map.get() 操作: O(1)');
console.log('  Set.has() 操作: O(1)');
console.log('');
console.log('lc127-online.js:');
console.log('  Set.has() 操作: O(1)');
console.log('  Set.delete() 操作: O(1)');
console.log('');
console.log('差异: 性能基本相同，都是 O(1) 操作\n');

console.log('## 总结\n');
console.log('lc127.js:');
console.log('  优点: 更健壮、更易理解、不修改原始数据');
console.log('  缺点: 代码稍长，需要额外的 visitedMap');
console.log('');
console.log('lc127-online.js:');
console.log('  优点: 代码简洁，空间略优');
console.log('  缺点: 修改原始数据，缺少边界检查，可能有问题');
console.log('');
console.log('推荐: 在实际项目中，lc127.js 的实现更可靠；');
console.log('      在算法竞赛中，lc127-online.js 的实现更简洁高效。');
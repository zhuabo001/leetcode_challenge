// 查找公共字符
// 给定一个字符串数组，返回所有字符串中都出现的字符（包括重复字符）=> 26个小写字符中有字符 在所有字符串里都出现的话，就输出，重复的也算
// 示例 1:
// 输入: ["bella","label","roller"]
// 输出: ["e","l","l"]
// 示例 2:
// 输入: ["cool","lock","cook"]
// 输出: ["c","o"]
// 限制:
// 1 <= A.length <= 100
// 1 <= A[i].length <= 100
// A[i][j] 是小写字母
const commonChars = (words) => {
  // 初始化一个长度为26的数组，存储每个字符的最小出现次数
  const minFreq = new Array(26).fill(Infinity);

  // 遍历每个字符串
  for (const word of words) {
    // 统计当前字符串中每个字符的出现次数
    const charCount = new Array(26).fill(0);
    for (const char of word) {
      const index =
        char.charCodeAt(0) /**获取当前字符char的ascii码 */ -
        'a'.charCodeAt(0); /**获取基准字符的ascii码值 */ // 计算字符在数组中的索引
      charCount[index]++;
    }
    // 更新最小频率
    for (let i = 0; i < 26; i++) {
      minFreq[i] = Math.min(minFreq[i], charCount[i]);
    }
  }
  // 构建结果
  const res = [];
  for (let i = 0; i < 26; i++) {
    // 如果字符在所有字符串中都出现过
    if (minFreq[i] !== Infinity && minFreq[i] > 0) {
      const char = String.fromCharCode(i + 'a'.charCodeAt(0)); // 从ascii码值转换为字符
      // 重复添加字符，次数为其最小出现次数
      for (let j = 0; j < minFreq[i]; j++) {
        res.push(char);
      }
    }
  }
  return res;
};
// 时间复杂度: O(n * m)，n是字符串数组的长度，m是字符串的平均长度
// 空间复杂度: O(1)，因为只使用了固定大小的数组来存储字符出现次数

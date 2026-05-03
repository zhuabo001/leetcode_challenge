// 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
// 注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
//
// 示例 1:
// 输入: s = "anagram", t = "nagaram"
// 输出: true
// 示例 2:
//
// 输入: s = "rat", t = "car"
// 输出: false
//
// 提示:
// 1 <= s.length, t.length <= 5 * 104
// s 和 t 仅包含小写字母
//
// 进阶: 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = function(s, t) {
    if(s.length !== t.length){
        return false;
    }
    // const mapS = new Map(), mapT = new Map(); // 优化：使用一个map，统计每个字符出现的次数，然后递减，看最后map中的value是否都为0
    const mapS = new Map();
    for(const char of s){
        if(mapS.get(char)){
            mapS.set(char, mapS.get(char) + 1);
        } else {
            mapS.set(char, 1);
        }
    }
    for(const char of t) {
        // if(mapT.get(char)){
            // mapT.set(char, mapT.get(char) + 1);
        // } else {
            // mapT.set(char, 1);
        // }
        if(!mapS.get(char)) return false;
        mapS.set(char, mapS.get(char) - 1);
    }
    for(const [key, value] of mapS){
      // 修改遍历语法和判断逻辑
      console.log(key, value);
      if(value !== 0) return false;
    }
    return true;
    
};

isAnagram("rat", "car");
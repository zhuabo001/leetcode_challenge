// 找到所有字母异位词
/**
 * 输入: s = "cbaebabacd", p = "abc"
 * 输出: [0,6]
 * 解释:
 * 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
 * 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
 */
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
const findAllAnagrams = (s, p) => {
    // 定长滑窗法，固定窗口长度为p的长度，然后在s中滑动窗口，判断窗口中的字符是否是p的异位词，如果是，就将窗口的起始索引加入结果数组
    // 异位词的判断：将p中的字符出现的次数统计出来，然后在s中滑动窗口，统计窗口中的字符出现的次数，如果窗口中的字符出现的次数与p中的字符出现的次数相同，就说明窗口中的字符是p的异位词
    const ans = [];
    const arrP = new Array(26).fill(0); // 统计p中每个字符出现的次数
    const arrS = new Array(26).fill(0); // 统计s的长度为len(p)的子串中每个字符出现的次数
    const base = 'a'.charCodeAt(), len = p.length;
    for(const c of p){
        arrP[c.charCodeAt() - base]++; // 统计p中每个字符出现的次数
    }
    for(let right = 0; right < s.length; right++){
        arrS[s[right].charCodeAt() - base]++; // 统计s的长度为len(p)的子串中每个字符出现的次数
        const left = right - len + 1;
        if(left < 0){
            continue; // 如果left小于0，说明s的长度小于p的长度，不需要判断
        }
        if(JSON.stringify(arrS) === JSON.stringify(arrP)){
            ans.push(left);
        }
        arrS[s[left].charCodeAt() - base]--; // 滑动窗口，左指针右移，需要将左指针指向的字符出现的次数减1
    }
    return ans;
}
console.log(findAllAnagrams("cbaebabacd", "abc"));


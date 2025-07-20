// 字母异位词分组
// 输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出: [ ["ate","eat","tea"], ["nat","tan"], ["bat"] ]
const groupAnagrams = (strs) => {
    // aab aba baa三个词经过排序后得到aab 也就是说当且仅当两个字符串排序后结果相同 才能分到一组
    const map = new Map();
    for(const str of strs){
        let tmpStr = str.split('').sort((a, b) => a.charCodeAt() - b.charCodeAt()).join('');
        if(map.has(tmpStr)){
            map.get(tmpStr).push(str);
        } else {
            map.set(tmpStr, [str]);
        }
    }
    return Array.from(map.values()); // [...map.values()];
}
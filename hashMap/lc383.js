// 赎金信
// 给你两个字符串：ransomNote 和 magazine ，判断 ransomNote 能不能由 magazine 里面的字符构成。
// 如果可以，返回 true ；否则返回 false 。
// magazine 中的每个字符只能在 ransomNote 中使用一次。
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
const canConstruct = (ransomNote, magazine) => {
    // O(n) 
    // O(1)    
    const strArr = new Array(26).fill(0);
    const base = 'a'.charCodeAt();
    for(const s of magazine){
        strArr[s.charCodeAt() - base]++;
    }
    for(const char of ransomNote){
        const index = char.charCodeAt() - base;
        if(!strArr[index]){
            return false;
        }
        strArr[index]--;
    }
    return true;
}
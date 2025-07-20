// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
// 输入：digits = "23"
// 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
// 输入：digits = ""
// 输出：[]
// 输入：digits = "2"
// 输出：["a","b","c"]
// 输入：digits = "234"
// 输出：["adg","adh","adi","aeg","aeh","aei","afg","afh","afi","bdg","bdh","bdi","beg","beh","bei","bfg","bfh","bfi","cdg","cdh","cdi","ceg","ceh","cei","cfg","cfh","cfi"]
const letterCombinations = (digits) => {
    const len = digits.length;
    const map = [""/**数字0 */, ""/**数字1 */, "abc"/**数字2 */, "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]; // 分别对应数字2-9
    if(len === 0) return [];
    if(len === 1) return map[Number(digits[0])].split("");
    const res = [], path = [];
    const backTrack = (digits, length, index) => {
        if(path.length === length){
            res.push(path.join(""));
            return;
        }
        for(const char of map[Number(digits[index])]) { // 遍历当前数字对应的字母, index为当前数字的下标， 比如“23”中的“3”下标是1
            path.push(char);
            backTrack(digits, length, index + 1);
            path.pop();
        }
    }
    backTrack(digits, len, 0);
    return res;
}
// 时间复杂度 O(3^m * 4^n) m为输入中对应3个字母的数字个数 n为输入中对应4个字母的数字个数
// 空间复杂度 O(m + n)
console.log(letterCombinations("23"));

// 快乐数
// 输入：19
// 输出：true
// 解释：
// 1^2 + 9^2 = 82 
// 8^2 + 2^2 = 68
// 6^2 + 8^2 = 100
// 1^2 + 0^2 + 0^2 = 1
// 示例 2：
// 输入：n = 2
// 输出：false
var isHappy = function(n) {
    // 题目中说了会 无限循环，那么也就是说求和的过程中，sum会重复出现
    // 以这道题目使用哈希法，来判断这个sum是否重复出现，如果重复了就是return false， 否则一直找到sum为1为止
    // O(logn)
    const getSum = (num) => {
        let sum = 0;
        while(num){
            sum += (num % 10) ** 2;
            num = Math.floor(num / 10);
        }
        return sum;
    }
    const map = new Map();
    while(true){
        if(map.has(n)) return false;
        if(n === 1) return true;
        map.set(n, true);
        n = getSum(n);
    }
}
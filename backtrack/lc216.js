// 216. 组合总和 III
// 找出所有相加之和为 n 的 k 个数的组合，且满足下列条件：
// 只使用数字1到9
// 每个数字 最多使用一次 
// 返回 所有可能的有效组合的列表 。该列表不能包含相同的组合两次，组合可以以任何顺序返回。
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
// 递归三部曲
// 1. 确定递归函数的参数（k, n, startIndex）和返回值（符合条件的组合）
// 2. 确定递归终止条件：path的长度等于k时，判断path的和是否等于n
// 3. 确定单层递归逻辑 a. 从startIndex开始遍历到9
//                   b. 每次递归时，将当前元素加入path，并且将n减去当前元素
//                   c. 递归完后，将当前元素从path中弹出
const combinationSum3 = (k, n) => {
    const res = [];
    const path = [];
    const backTrack = (k, n , startIndex, currentSum) => {
        // 剪枝：当前和超过目标值或剩余数字不足
        if (currentSum > n || path.length + (9 - startIndex + 1) < k) {
            return;
        }
        if(path.length === k ){
            if(currentSum === n){
                res.push([...path]);
            }
            return;
        }
        for(let i = startIndex; i <= 9; i++){
            path.push(i);
            backTrack(k, n, i + 1, currentSum + i);
            path.pop();
        }
    }
    backTrack(k,n,1,0);
    return res;
}
console.log(combinationSum3(3, 7));
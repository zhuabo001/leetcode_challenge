// 删除字符串中的所有相邻重复项
// 给出由小写字母组成的字符串 S，重复项删除操作会选择两个相邻且相同的字母，并删除它们。
// 在 S 上反复执行重复项删除操作，直到无法继续删除。
// 在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。
/**
 * @param {string} S
 * @return {string}
 */
var removeDuplicates = function(S) {
    let stack = []; // 遍历的元素推入栈
    for(let i = 0; i < S.length; i++){
        if(stack.length && stack[stack.length - 1] == S[i]){
            // 栈顶元素与当前元素相等
            // 当前元素出栈
            stack.pop();
        } else {
            // 栈顶元素与当前元素不相等
            // 栈顶元素入栈
            stack.push(S[i]);
        }
    }
    return stack.join('');
}
// 时间复杂度：O(n)
// 空间复杂度：O(n)
console.log(removeDuplicates("abbaca"));
// 有效的括号
/**
 * @param {string} s
 * @return {boolean}
 */
// 在有效的括号序列中，必须遵循以下规则：

// 1. 后进先出原则 ：最近打开的括号必须最先闭合
// 2. 类型匹配 ：左右括号的类型必须一一对应
var isValid = function(s) {
    if(s.length % 2 !== 0) return false;
    const stack = [];
    const map = {
        '(':')',
        '{':'}',
        '[':']'
    };
    for(const char of s){
        console.log("char", char);
        if(char in map){ // 处理左括号
            stack.push(char); // 如果是左括号，就入栈
            console.log("stack after push", stack);
            continue; // 继续下一次循环
        } else {
            // 说明当前char为右括号
            let topElement = stack.pop(); 
            console.log('stack after pop', stack);
            if(map[topElement] !== char) return false; // 检查弹出的左括号是否与当前右括号匹配
        }
    }
    return !stack.length; // 检查栈是否为空

}
// 时间复杂度O(n)
// 空间复杂度O(n)
// 在这个例子中，违反了这两个规则：

// - 当我们遇到 ) 时，栈顶是 [ ，这意味着我们试图在闭合外层括号 ( 之前闭合内层括号 [
// - 同时，我们试图用 ) 来闭合 [ ，这违反了类型匹配规则
console.log(isValid("()[]{}")); //false
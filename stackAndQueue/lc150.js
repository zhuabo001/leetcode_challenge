// 逆波兰表达式求值
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
    const stack = [];
    for(const token of tokens){
        if(isNaN(Number(token))) {
            const num2 = stack.pop();
            const num1 = stack.pop();
            switch(token) {
                case '+':
                    stack.push(num1 + num2);
                    break;
                case '-':
                    stack.push(num1 - num2);
                    break;
                case '*':
                    stack.push(num1 * num2);
                    break;
                case '/':
                    stack.push(num1 / num2 | 0);
                    break;
            }
        } else {
            stack.push(Number(token));
        }
    }
    return stack[0];
}
// 时间复杂度：O(n)
// 空间复杂度：O(n)
console.log(evalRPN(["2", "1", "+", "3", "*"]));
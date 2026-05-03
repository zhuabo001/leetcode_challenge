// 暴力解法： 使用栈来存储字符， 遇到#则弹出栈顶元素， 最后比较两个栈中的字符串是否相等
var backspaceCompare = function(s, t) {
    if(s === '' && t === '') return true;
    let removeStr = (str) => {
        let arr = [];
        for(const char of str){
            if(char === '#'){
                arr.pop();
            } else {
              arr.push(char);
            }
            
        }
        console.log('res', arr.join(''));
        return arr.join('');
    }
    return removeStr(s) === removeStr(t);
};
// console.log(backspaceCompare("y#fo##f", "c#y#f#o##f#"));

// 双指针法：两个字符串通通从后向前遍历（因为#影响的是前面一个字符，从后往前遍历可以立即知道字符是否会被删除）
// 使用两个变量分别存储两个字符串中需要跳过的字符数量， 遇到#则加1， 遇到普通字符时，如果计数器大于0，跳过该字符并减少计数器
// 每次找到两个字符串中的下一个有效字符（不会被删除的字符）， 比较这两个有效字符是否相等
const backSpaceCompare = (s, t) => {
  // code here with 2-pointers
  // 1. 从后往前遍历
  let i = s.length - 1, j = t.length -1;
  let skipS = 0, skipT = 0; // s中需要跳过的字符数量， t中需要跳过的字符数量
  while(i >= 0 || j >= 0){
    while(i >= 0) {
      // 找到s中下一个有效字符的位置
      if(s[i] === '#'){
        skipS++;
        i--;
      } else if (skipS > 0){
        skipS--;
        i--
      } else {
        break;
      }
    }
    // 找到t中下一个有效字符的位置
    while(j >= 0){
      if(t[j] === '#'){
        skipT++;
        j--;
      } else if(skipT > 0) {
        skipT--;
        j--;
      } else {
        break;
      }
    }
    // 比较两个字符
    if(i >= 0 && j >= 0){
      if(s[i] !== t[j]) return false;
    } else {
      // 如果其中一个已经遍历完了 另一个还没有 返回false
      if(i >= 0 || j >= 0) return false;
    }
    i--;
    j--;
  }
  return true;
}
console.log(backSpaceCompare("y#fo##f", "c#y#f#o##f#"))
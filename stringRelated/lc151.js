// 反转字符串中的单词

/**
 * @param {string} s
 * @return {string}
 */
const reverse = (arr, start, end) => {
    let left = start;
    let right = end;
    while(left < right){
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
}
const removeExtraSpace = (arr) => {
    let slowIndex = 0; // 表示处理后字符串的有效长度，总是指向下一个要写入的位置，也就是当前有效字符串长度+1
    let fastIndex = 0;
    // 去掉字符串前面的空格
    while(fastIndex < arr.length){
        if(arr[fastIndex] === " " && (fastIndex === 0 || arr[fastIndex - 1] === " ")){ 
            // 如果当前字符是空格并且它是字符串第一个字符 或者 它的前一个字符也是空格 那么就跳过这个空格
            // 为了保留单词之间的单个空格
            // 但不会处理字符串末尾的空格
            fastIndex++;
        } else {
            // 会保留一个空格
            arr[slowIndex] = arr[fastIndex];
            slowIndex++;
            fastIndex++;
        }
    }
    // 去掉字符串末尾的空格
    if(slowIndex - 1 > 0 && arr[slowIndex - 1] === " "){
        // 此时slowIndex - 1 指向的是最后一个单词的最后一个字符
        // 所以需要将slowIndex - 1 指向的字符删除
        arr.length = slowIndex - 1;
    } else {
        arr.length = slowIndex;
    }

}
const reverseWords = (s) => {
  const strArr = Array.from(s);
  removeExtraSpace(strArr);
  // 反转整个字符串
  reverse(strArr, 0, strArr.length - 1); 
   // 反转每个单词
   let start = 0;
   let end = 0;
  for(let i = 0; i < strArr.length; i++){
    if(strArr[i] === " "){
        end = i - 1;
        reverse(strArr, start, end);
        start = i + 1;
    } else {
        if(i === strArr.length - 1){
            end = i;
            reverse(strArr, start, end);
        }
    }
  }
  return strArr.join("");
 
}
    // 时间复杂度分析
//     - 去除多余空格：O(n)
// - 反转整个字符串：O(n)
// - 反转每个单词：O(n)
// 总体时间复杂度：O(n)
// 空间复杂度分析
// - 使用了 Array.from 创建了新的数组：O(n)
// - 其他操作都是原地修改：O(1)
// 总体空间复杂度：O(n)
console.log(reverseWords("  hello world  "));
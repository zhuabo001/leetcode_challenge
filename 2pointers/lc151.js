// 151. 翻转字符串里的单词
// 给你一个字符串 s ，逐个翻转字符串中的所有 单词 。
// 单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。
// 请你返回一个翻转 s 中单词顺序并用单个空格相连的字符串。
// 说明：
// 输入字符串 s 可以在前面、后面或者单词间包含多余的空格。
// 翻转后单词间应当仅用一个空格分隔。
// 翻转后的字符串中不应包含额外的空格。
/**
 * @param {string} s
 * @return {string}
 */
const removeExtraSpace = (arr) => {
    let slowIndex = 0, fastIndex = 0;
    // 去掉字符串前面的空格
    while(fastIndex < arr.length){
        if(arr[fastIndex] === ' ' && (fastIndex === 0 || arr[fastIndex - 1] === ' ')){
            fastIndex++;
        } else {
            arr[slowIndex] = arr[fastIndex];
            slowIndex++;
            fastIndex++;
        }
    }
    if(arr[slowIndex - 1] === ' '){
        arr.length = slowIndex - 1;
    } else {
        arr.length = slowIndex;
    }
}
const reverse = (arr, start, end) => {
    let left = start, right = end;
    while(left < right){
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
}
const reverseWords = function(s) {
  let arr = s.split('');
  // 1. 去除多余空格
  // 2. 翻转整个字符串
  // 3. 翻转每个单词
  removeExtraSpace(arr);
  reverse(arr, 0, arr.length - 1);
  console.log(arr)
  let start = 0, end = 0;
  for(let i = 0; i < arr.length; i++){
    if(arr[i] === ' '){
        end = i - 1;
        reverse(arr, start, end);
        start = i + 1;
    } else {
        if(i === arr.length - 1 /** i指向了最后一个字符 */){
            end = i;
            reverse(arr, start, end)
        }
    }
  }
  return arr.join('');
}
console.log(reverseWords("  hello world  "));



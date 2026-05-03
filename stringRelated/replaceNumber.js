// 给定一个字符串 s，它包含小写字母和数字字符，请编写一个函数，将字符串中的字母字符保持不变，而将每个数字字符替换为number。

// 例如，对于输入字符串 "a1b2c3"，函数应该将其转换为 "anumberbnumbercnumber"。

// 对于输入字符串 "a5b"，函数应该将其转换为 "anumberb"

// 输入：一个字符串 s,s 仅包含小写字母和数字字符。

// 输出：打印一个新的字符串，其中每个数字字符都被替换为了number

// 样例输入：a1b2c3

// 样例输出：anumberbnumbercnumber
/**
 * @param {string} s
 * @return {string}
 */
const isAZ = (s) => {
  return s >= "a".charCodeAt() && s <= "z".charCodeAt();
}
const isNumber = (s) => {
  return s >= "0".charCodeAt() && s <= "9".charCodeAt();
}
const replaceStrWithNumber = (s) => {
  // 先计算出替换完number后的字符串长度
  let len = 0;
  for(let i = 0; i < s.length; i++){
    if(isNumber(s[i].charCodeAt())){
      len += 6;
    } 
    if(isAZ(s[i].charCodeAt())) {
      len++;
    }
  }
  console.log(len);
  let resArr = new Array(len).fill(0);
  let j = s.length - 1;
  for(let i = len - 1; i >= 0; i--){
    const val = s[j].charCodeAt();
    if(isAZ(val)){
        resArr[i] = s[j];
    }
    if(isNumber(val)){
      resArr[i] = 'r';
      resArr[i - 1] = 'e';
      resArr[i - 2] = 'b';
      resArr[i - 3] = 'm';
      resArr[i - 4] ='u';
      resArr[i - 5] ='n';
      i -= 5;
    }
    j--;
  }
  return resArr.join("");
}
console.log(replaceStrWithNumber("a1b2c3"));   


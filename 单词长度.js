var lengthOfLastWord = function(s) {
  let arr = s.split(' ');
  console.log(arr);
  const word = arr.pop();
  console.log(word);
  return word.length;
};
lengthOfLastWord("hello world");
// 925. 长按键入
// 你的朋友正在使用键盘输入他的名字 name。偶尔，在键入字符 c 时，按键可能会被长按，而字符可能被输入 1 次或多次。
// 你将会检查键盘输入的字符 typed。如果它对应的可能是你的朋友的名字（其中一些字符可能被长按），那么就返回 True。
// 示例 1：
// 输入：name = "alex", typed = "aaleex"
// 输出：true
// 解释：'alex' 中的 'a' 和 'e' 被长按。
// 示例 2：
// 输入：name = "saeed", typed = "ssaaedd"
// 输出：false
// 解释：'e' 一定需要被键入两次，但在 typed 的输出中不是这样。
// 提示：
// 1 <= name.length, typed.length <= 1000
// name 和 typed 的字符都是小写字母
// 核心思路：双指针比较两个字符串中的字符
// 1. 假设两个指针i、j，name[i] === typed[j], 那么i++, j++, 继续比较下一个字符
// 2-1. j === 0 并且此时name[i] !== typed[j]时，直接return false；
// 2-2-1. j ！== 0 让j++跨越重复字符进行比较，如果name[i] === typed[j], 那么i++, j++, 继续比较下一个字符
// 2-2-2. 如果name[i] !== typed[j], 那么直接return false
// 3-1. name.length > typed.length 时，name没有匹配完，直接return false
// 3-2. typed.length >= name.length， typed没有匹配完
const isLongPressedName = (name, typed) => {
  let i = 0,
    j = 0;
  while (i < name.length && j < typed.length) {
    if (name[i] === typed[j]) {
      i++;
      j++;
    } else if (j > 0 && typed[j] === typed[j - 1]) {
      // 2-2-1. j ！== 0 让j++跨越重复字符进行比较，如果name[i] === typed[j], 那么i++, j++, 继续比较下一个字符
      j++;
    } else {
      // 其他情况，直接return false
      return false;
    }
  }
  if (i < name.length) return false;
  while (j < typed.length) {
    //如果 typed 还有剩余字符，这些字符必须是最后一个已匹配字符的"长按"
    if (typed[j] !== typed[j - 1]) return false;
    j++;
  }
  return true;
};
// 时间复杂度: O(n + m)，n是name的长度，m是typed的长度
// 空间复杂度: O(1)

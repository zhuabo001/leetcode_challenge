// 比较含退格的字符串
// 给定 S 和 T 两个字符串，当它们分别被输入到空白的文本编辑器后，判断二者是否相等，并返回结果。 # 代表退格字符。
// 注意：如果对空文本输入退格字符，文本继续为空。
// 示例 1：
// 输入：S = "ab#c", T = "ad#c"
// 输出：true
// 解释：S 和 T 都会变成 “ac”。
// 示例 2：
// 输入：S = "ab##", T = "c#d#"
// 输出：true
// 解释：S 和 T 都会变成 “”。
// 示例 3：
// 输入：S = "a##c", T = "#a#c"
// 输出：true
// 解释：S 和 T 都会变成 “c”。
// 示例 4：
// 输入：S = "a#c", T = "b"
// 输出：false
// 解释：S 会变成 “c”，但 T 仍然是 “b”。
// 提示：
// 1 <= S.length <= 200
// 1 <= T.length <= 200
// S 和 T 只含有小写字母以及字符 '#'。
const backspaceCompare = (s, t) => {
  // stack method
  if (s.length === 0 && t.length === 0) return true;
  let removeStr = (str) => {
    let arr = [];
    for (const char of str) {
      if (char === '#') {
        arr.pop();
      } else {
        arr.push(char);
      }
    }
    return arr.join('');
  };
  return removeStr(s) === removeStr(t);
  // 时间复杂度: O(n + m)，n是s的长度，m是t的长度
  // 空间复杂度: O(n + m)，n是s的长度，m是t的长度
};

const backspaceCompare2 = (s, t) => {
  // 2-pointers
  if (s.length === 0 && t.length === 0) return true;
  let i = s.length - 1,
    j = t.length - 1;
  let skipS = 0,
    skipT = 0;
  while (i >= 0 || j >= 0) {
    while (i >= 0) {
      if (s[i] === '#') {
        skipS++; // 记录需要跳过的字符，这里的++是指这个#号前面的字符不用被记录了
        i--; // 指针移动到下一个字符(#号前面的字符)
      } else {
        // 遇到普通字符时，如果 skipS > 0，说明"这个字符就是要被删除的那个"
        if (skipS > 0) {
          // 此时碰到的不是#号，而是普通字符
          skipS--; // 消耗一个跳过名额
          i--; // 移动指针到前一个字符继续检查
        } else {
          break; // 找到有效字符，跳出循环
        }
      }
    }
    while (j >= 0) {
      if (t[j] === '#') {
        skipT++;
        j--;
      } else {
        if (skipT > 0) {
          skipT--; // 消耗一个跳过名额
          j--; // 移动指针到前一个字符继续检查
        } else {
          break;
        }
      }
    }
    // 比较两个字符
    if (i >= 0 && j >= 0) {
      if (s[i] !== t[j]) return false;
    } else {
      if (i >= 0 || j >= 0 /**如果其中一个已经遍历完了，另一个还没有 */)
        return false;
    }
    i--;
    j--;
  }
  return true;
};

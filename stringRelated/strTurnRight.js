// 字符串的右旋转操作是把字符串尾部的若干个字符转移到字符串的前面。给定一个字符串 s 和一个正整数 k，
// 请编写一个函数，将字符串中的后面 k 个字符移到字符串的前面，实现字符串的右旋转操作
// 思路：
// 以字符串 "abcdefg" 右旋转 2 位为例：

// 1. 原始字符串： abcdefg
// 2. 反转整个字符串： gfedcba
// 3. 反转前 k=2 个字符： fgedcba
// 4. 反转剩余字符： fgabcde
// 时间复杂度 ：O(n)，其中 n 是字符串的长度
// 空间复杂度 ：如果考虑字符串转数组的开销：O(n);如果不考虑（假设可以原地修改字符串）：O(1)
const reverse = (arr, start, end) => {
    let left = start, right = end;
    while(left < right){
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
}
const strTurnRight = (s, k) => {
    let resArr = s.split("");
    reverse(resArr, 0, resArr.length - 1);// 反转整个字符串
    reverse(resArr, 0, k - 1); // 反转前k个字符
    reverse(resArr, k, resArr.length - 1); // 反转剩余字符
    return resArr.join("");
}
console.log(strTurnRight("abcdefg", 2));
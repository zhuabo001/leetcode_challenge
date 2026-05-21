// 12345 反转成 54321
const reverse = (num: number): number => {
  let ans = 0;
  while (num > 0) {
    let rev = num % 10;
    num = Math.floor(num / 10);
    ans = ans * 10 + rev;
  }
  return ans;
};

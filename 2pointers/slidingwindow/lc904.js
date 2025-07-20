// 904. Fruit Into Baskets
// 翻译成人话：寻找最长的连续子数组，使得子数组中最多只有两种不同的元素
// 思路：滑动窗口
// 1. 使用两个指针，left 和 right，分别表示子数组的起始位置和结束位置
// 2. 使用一个哈希表，记录当前子数组中每种元素的数量
// 3. 当哈希表中元素的数量超过两种时，移动 left 指针，直到哈希表中元素的数量不超过两种
// 4. 在移动 left 指针的过程中，更新子数组的长度
// 5. 返回子数组的长度
const totalFruit = (fruits) => {
  let ans = 0, left = 0;
  const map = new Map();
  for(let right = 0; right < fruits.length; right++){
    map.set(fruits[right], (map.get(fruits[right]) || 0) + 1);
    while(map.size > 2){
      map.set(fruits[left], map.get(fruits[left]) - 1);
      if(map.get(fruits[left]) === 0){
        map.delete(fruits[left]);
      }
      left++;
    }
    ans = Math.max(ans, right - left + 1);
  }
  return ans;
}
console.log(totalFruit([1,2,1]));
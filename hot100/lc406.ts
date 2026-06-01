// 根据身高重建队列
//
const reconstructQueue = (people: number[][]) => {
  const queue: number[][] = [];
  people.sort((a, b) => {
    if (a[0] == b[0]) {
      return a[1] - b[1]; // 身高相同时按第二位进行升序排序
    }
    return b[0] - a[0]; // 降序排序是为了先确定高个子的顺位，这样插入矮个子不会变更高个子的顺位
  });
  for (const person of people) {
    const index = person[1];
    queue.splice(index, 0, person);
  }
  return queue;
};
// 时间复杂度 O(n ^ 2) —— 本身people排序需要O(nlogn)， 数组的splice行为需要O(n), 所以需要O(n^2)
// 空间复杂度 O(n)

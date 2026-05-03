function set(obj: Record<string, any>, path: string, value: any): Record<string, any> {
  const keyPaths = path.split('.');
  let resObj = obj;
  keyPaths.forEach((key: string, index: number) => {
    if (index === keyPaths.length - 1) {
      resObj[key] = value;
      return;
    }
    resObj[key] = resObj[key] ?? {}; // 补全路径中缺失的中间层级
    resObj = resObj[key]; // 更新指针，将resObj作为下一层级的对象，其实可以用reduce替代
  });
  return resObj;
}

// 利用 reduce 的解法
function setWithReduce(obj: Record<string, any>, path: string, value: any): Record<string, any> {
  const keyPaths = path.split('.');
  keyPaths.reduce((
    acc: Record<string, any>,    // 第1个参数：累计值，初始为传入的 obj，遍历过程中代表当前层级的对象
    key: string,                 // 第2个参数：当前遍历到的路径 key
    index: number                // 第3个参数：当前遍历的索引
  ) => {
    if (index === keyPaths.length - 1) {
      acc[key] = value;
      return acc;
    }
    acc[key] = acc[key] ?? {};
    return acc[key];
  }, obj);
  return obj;
}

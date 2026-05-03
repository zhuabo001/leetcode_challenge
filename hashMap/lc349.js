// 找到两个数组的交集 
// Compare this snippet from 349:
const intersection = (arr1, arr2) => {
    // const map = new Map();
    // arr1.forEach(item => {
        // map.set(item, true);
    // });
    // const res = [];
    // arr2.forEach(item => {
        // if(map.get(item)){
            // res.push(item);
            // map.delete(item); // 必须的 多个重复的元素需要去重
        // }
    // })
    // return res;
    // 方法2： 哈希数组
    const nums1Set = new Set(arr1);
    const resSet = new Set();
    if(arr1.length < arr2.length){
        [arr1, arr2] = [arr2, arr1];
    }
    // 循环比迭代器快 —— 为什么
    for(let i = arr2.length - 1; i >= 0; i--){
        if(nums1Set.has(arr2[i])){
            resSet.add(arr2[i]);
        }
    }
    return Array.from(resSet);
} 
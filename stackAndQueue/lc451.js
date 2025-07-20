// 根据字符出现频率排序
/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function(s) {
  const sArray = s.split('');
  console.log('sArray', sArray);
  const map = new Map();
  for(const ch of sArray){
      map.set(ch, (map.get(ch) || 0) + 1);
  }
  console.log('map', map);
  let res = [];
  let len = 0;
  map.forEach((value, key) => {
      if(len < map.size){
          console.log('len', len, 'enter1');
          res.push(key);
          if(len === map.size - 1){
              console.log('enter2');
              buildHeap(res, map, map.size)
          }
      } else {
          console.log('enter3');
          if(map.get(res[0]) < value){
              console.log('enter4');
              res[0] = key;
              heapify(res, map, map.size - 1, 0);
          }
      }
      len += 1;
  });
  return res;

};
function heapify(arr, map, heapSize, index) {
    let left = 2 * index + 1, right = 2 * index + 2;
    let largest = index;
    if(map.get(arr[left]) > map.get(arr[largest]) && left < heapSize){
        largest = left;
    }
    if(map.get(arr[right]) > map.get(arr[largest]) && right < heapSize){
        largest = right;
    }
    if(largest !== index){
        [arr[index], arr[largest]] = [arr[largest], arr[index]];
        heapify(arr, map, heapSize, largest);
    }
}
function buildHeap(arr, map){
    for(let i = Math.floor(arr.length / 2); i >= 0; i++){
        heapify(arr, map, arr.length, i);
    }
}

const result = frequencySort('tree');
console.log('result', result);
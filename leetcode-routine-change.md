# LeetCode 刷题问题诊断与调整方案

## 用户画像

- **刷题时长**：半年
- **刷题方式**：按专题进行
- **核心困难**：知道用什么算法，但不知道如何实现代码
- **具体卡点**：
  - 边界条件（循环条件、区间开闭）
  - 递归终止条件
  - 数据结构操作细节（路径压缩、集合合并等）
- **学习方式**：需要文字解释 + 代码注释结合才能理解
- **遗忘周期**：超过10天

---

## 问题诊断

### 核心问题

| 问题 | 表现 | 根本原因 |
|------|------|----------|
| 看了就忘 | 10天后无法独立解题 | 只看懂代码，没有理解"为什么这样写" |
| 看了不会写 | 知道用什么算法，但无法转化为代码 | 缺乏代码实现的"模式记忆" |
| 细节总搞错 | 区间开闭、递归终止条件经常出错 | 没有建立边界条件的系统认知 |

### 根本原因分析

用户卡在**算法原理**与**代码实现**之间：

```
算法原理层面 ←——— 隔着一道墙 ———→ 代码实现层面
（知道用什么方法）    （但不知道怎么写代码）

看题解时：只是"看懂"代码表面
实际需要：建立"代码模式"的深度记忆
```

---

## 调整方案

### 1. 建立"代码模式库"

**原则**：不要只记算法，要记具体的**代码模板**

每个模板必须包含：
- 变量定义和初始化
- 循环/递归条件
- 核心逻辑步骤
- 返回值处理
- 边界条件的详细注释

**示例模板结构**：

```javascript
// 模板名称：二分查找（闭区间）
// 时间复杂度：O(log n)
// 适用场景：在有序数组中查找目标值

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1; // 【关键】闭区间：right 是最后一个索引

  while (left <= right) { // 【关键】<= 因为 left 和 right 都能取到
    const mid = left + Math.floor((right - left) / 2); // 防止溢出

    if (arr[mid] === target) {
      return mid; // 找到目标
    } else if (arr[mid] < target) {
      left = mid + 1; // 【关键】mid 已經小于 target，left 移到 mid+1
    } else {
      right = mid - 1; // 【关键】mid 已經大于 target，right 移到 mid-1
    }
  }

  return -1; // 没找到
}
```

### 2. 看题解时手动模拟执行

**原则**：不要用眼睛"看"，要用大脑"跑"

**操作步骤**：
1. 拿到题解代码后，准备一张白纸
2. 手动模拟每一步的执行过程
3. 画出变量变化图（记录每一步的变量值）
4. 问自己：这一步为什么这样写？
5. 合上代码，自己写一遍

**示例**（二分查找）：

```
数组：[1, 3, 5, 7, 9]，target = 5

left = 0, right = 4
mid = 0 + (4-0)/2 = 2] = 5 → arr[2 → 找到！返回 2

如果 target = 6：
left = 0, right = 4
mid = 2 → arr[2] = 5 < 6 → left = 3
left = 3, right = 4
mid = 3 → arr[3] = 7 > 6 → right = 2
left = 3, right = 2 → 循环结束 → 返回 -1
```

### 3. 记录"具体卡点"

**原则**：做错题时，不要记"这题不会"，要记具体的卡点

**记录模板**：

```
题目编号和名称：LC684 冗余连接
算法类型：并查集
具体卡点：路径压缩的递归写法
错误写法：parent[x] = x; 直接返回
正确写法：parent[x] = find(parent[x]); 递归压缩
记忆点：路径压缩 = 把沿途所有节点直接指向根节点
```

### 4. 每周回顾"边界条件"

**原则**：易忘的东西需要高频回顾

**每周回顾清单**：
- 二分查找：闭区间用 <=，开区间用 <
- 递归终止：if (node === null) return
- 滑动窗口：扩窗口用 <，收窗口用 <=
- 并查集路径压缩：parent[x] = find(parent[x])

### 5. 渐进式刷题法

**原则**：用"渐进式披露"代替一次性看完整题解

**操作步骤**：
1. 先看题目，思考至少15分钟
2. 如果没思路，看题解的**思路部分**（不看代码）
3. 根据思路，自己尝试写代码
4. 卡住的部分，再针对性地看题解代码
5. 手动模拟执行题解代码
6. 合上代码，自己重写一遍
7. 记录卡点到"代码模式库"

**vs 传统方式**：

| 传统方式 | 渐进式刷题 |
|----------|------------|
| 看完题解 → 以为自己会了 | 先思考再看，印象更深 |
| 10天后忘记 | 针对性学习，只记卡点 |
| 背代码 | 理解原理，建立模式 |
| 一次性看完整 | 分步骤，逐步掌握 |

---

## 代码模式库

### 模式1：二分查找（闭区间）

**适用场景**：在有序数组中查找目标值

**模板**：

```javascript
/**
 * 二分查找（闭区间）
 * @param {number[]} arr - 有序数组
 * @param {number} target - 目标值
 * @returns {number} 目标值的索引，没找到返回 -1
 */
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1; // 【关键】闭区间：right 是最后一个有效索引

  while (left <= right) { // 【关键】<= 因为 left 和 right 都能取到
    const mid = left + Math.floor((right - left) / 2); // 防止 left + right 溢出

    if (arr[mid] === target) {
      return mid; // 找到目标
    } else if (arr[mid] < target) {
      left = mid + 1; // 【关键】mid 位置已经小于 target，left 跳过 mid
    } else {
      right = mid - 1; // 【关键】mid 位置已经大于 target，right 跳过 mid
    }
  }

  return -1; // 没找到
}
```

**区间图示**：

```
[left, right] 闭区间
left=0, right=4 → 索引范围：0, 1, 2, 3, 4
循环条件：left <= right（left 和 right 都能取到）
```

**边界条件说明**：
- `left <= right`：`left` 和 `right` 都能取到，所以用 `<=`
- `left = mid + 1`：`mid` 已经小于 `target`，不需要再检查
- `right = mid - 1`：`mid` 已经大于 `target`，不需要再检查

---

### 模式2：二分查找（左闭右开区间）

**适用场景**：在有序数组中查找目标位置（左闭右开）

**模板**：

```javascript
/**
 * 二分查找（左闭右开区间）
 * @param {number[]} arr - 有序数组
 * @param {number} target - 目标值
 * @returns {number} 目标值的索引，没找到返回 -1
 */
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length; // 【关键】右开区间：right 是第一个无效索引

  while (left < right) { // 【关键】< 因为 right 取不到
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1; // 同闭区间
    } else {
      right = mid; // 【关键】右开区间：right 取不到，所以 right = mid 不是 mid-1
    }
  }

  return -1;
}
```

**区间图示**：

```
[left, right) 左闭右开
left=0, right=5 → 索引范围：0, 1, 2, 3, 4（5 取不到）
循环条件：left < right（right 取不到，所以不用 <=）
```

**闭区间 vs 开区间对比**：

| 特征 | 闭区间 [left, right] | 左闭右开 [left, right) |
|------|----------------------|------------------------|
| right 初始值 | arr.length - 1 | arr.length |
| 循环条件 | left <= right | left < right |
| right 更新 | right = mid - 1 | right = mid |
| 适用场景 | 查找具体值 | 查找插入位置 |

---

### 模式3：滑动窗口（固定长度）

**适用场景**：在数组中找固定长度窗口的最大/最小/和等

**模板**：

```javascript
/**
 * 滑动窗口（固定长度）
 * @param {number[]} arr - 数组
 * @param {number} k - 窗口大小
 * @returns {number} 最大值
 */
function slidingWindow(arr, k) {
  if (arr.length < k || k <= 0) return 0;

  // 1. 初始化第一个窗口
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += arr[i];
  }
  let maxSum = sum;

  // 2. 滑动窗口
  for (let i = k; i < arr.length; i++) {
    // 【关键】减去离开窗口的元素，加上进入窗口的元素
    sum = sum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, sum);
  }

  return maxSum;
}
```

**窗口图示**：

```
arr = [1, 3, -1, -3, 5, 3, 6, 7], k = 3

窗口移动过程：
[1, 3, -1] → sum = 3
[3, -1, -3] → sum = -1 = 3 - 1 + (-3)
[-1, -3, 5] → sum = 1 = -1 - 3 + 5
[-3, 5, 3] → sum = 5 = 1 - (-1) + 3
[5, 3, 6] → sum = 14 = 5 - (-3) + 6
[3, 6, 7] → sum = 16 = 14 - 5 + 7
```

---

### 模式4：滑动窗口（可变长度 - 找最大满足条件的子数组）

**适用场景**：找满足条件的最长子数组/字符串

**模板**：

```javascript
/**
 * 滑动窗口（可变长度 - 最大满足条件的子数组）
 * @param {number[]} arr - 数组
 * @param {number} target - 目标值（如和<=target）
 * @returns {number} 最长子数组长度
 */
function longestSubarray(arr, target) {
  let left = 0;
  let sum = 0;
  let maxLen = 0;

  for (let right = 0; right < arr.length; right++) {
    sum += arr[right]; // 扩窗口：加入 right 位置的元素

    // 收窗口：直到满足条件
    while (sum > target && left <= right) {
      sum -= arr[left]; // 移出 left 位置的元素
      left++; // 左指针右移
    }

    // 更新结果
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

**窗口图示**：

```
arr = [1, 3, 1, 4, 1, 2, 1], target = 5

right=0: sum=1 → [1] → maxLen=1
right=1: sum=4 → [1,3] → maxLen=2
right=2: sum=5 → [1,3,1] → maxLen=3
right=3: sum=9 >5 → 收缩
  left=0: sum=8 >5
  left=1: sum=7 >5
  left=2: sum=4 <=5 → [4,1] → maxLen=3
right=4: sum=5 → [4,1,1] → maxLen=3
right=5: sum=7 >5 → 收缩
  left=3: sum=3 <=5 → [1,2] → maxLen=3
right=6: sum=4 → [1,2,1] → maxLen=3
```

**核心逻辑**：
- **扩窗口**：`sum += arr[right]`
- **收窗口**：`while (sum > target) { sum -= arr[left]; left++; }`
- **更新结果**：`right - left + 1` 是当前窗口长度

---

### 模式5：滑动窗口（可变长度 - 找最小满足条件的子数组）

**适用场景**：找满足条件的最小子数组/字符串

**模板**：

```javascript
/**
 * 滑动窗口（可变长度 - 最小满足条件的子数组）
 * @param {number[]} arr - 正整数数组
 * @param {number} target - 目标值（和>=target）
 * @returns {number} 最小子数组长度
 */
function minSubarray(arr, target) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let right = 0; right < arr.length; right++) {
    sum += arr[right]; // 扩窗口

    // 收窗口：尽可能收缩，找到最小满足条件的窗口
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= arr[left]; // 移出 left 元素
      left++; // 收缩
    }
  }

  return minLen === Infinity ? 0 : minLen;
}
```

---

## 常见卡点速查

### 二分查找卡点

| 卡点 | 问题 | 解决 |
|------|------|------|
| 循环条件 | 用 <= 还是 <? | 闭区间用 <=，开区间用 < |
| right 初始值 | 应该是 length 还是 length-1? | 闭区间 length-1，开区间 length |
| right 更新 | right = mid-1 还是 right = mid? | 闭区间用 mid-1，开区间用 mid |
| 溢出问题 | left + right 可能溢出 | 用 mid = left + (right-left)/2 |

### 滑动窗口卡点

| 卡点 | 问题 | 解决 |
|------|------|------|
| 窗口扩大 | right 指针何时移动? | for 循环遍历 right |
| 窗口收缩 | left 指针何时移动? | while 循环判断条件 |
| 条件判断 | 在扩窗口前还是后判断? | 先扩窗口，再收缩，最后更新结果 |
| 窗口长度 | 怎么计算窗口长度? | right - left + 1 |

---

## 总结

### 三个核心改变

1. **少看多练** - 看10分钟题解，至少练30分钟
2. **先思考再看不迟** - 至少想15分钟再放弃
3. **手动模拟** - 用纸笔走一遍代码流程

### 四个必须建立的习惯

1. **代码模式库** - 记录具体的代码模板，不是算法思路
2. **手动模拟执行** - 不用眼睛看，用大脑跑
3. **记录具体卡点** - 记"这道题我不会"没有意义
4. **高频回顾** - 易忘的东西需要每周看

---

*创建时间：2024-01-19*
*最后更新：2024-01-19*

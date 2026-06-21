// 任务调度器
// 给你一个用字符数组 tasks 表示的 CPU 需要执行的任务列表，用字母 A 到 Z 表示，以及一个冷却时间 n。每个周期或时间间隔允许完成一项任务。任务可以按任何顺序完成，但有一个限制：两个 相同种类 的任务之间必须有长度为 n 的冷却时间。
// 返回完成所有任务所需要的 最短时间间隔
// 题目翻译一下，就是每个任务执行占一个执行时间，相同的类型任务之间必须至少间隔n个执行时间
// 例如["A", "A", "A", "B", "B", "B"], N = 2,那么最终的排列类似["A", "B", "_", "A", "B", "_", "A", "B"], 新的数组结果长度为8
const leastInterval = (tasks: string[], n: number): number => {
  const map = new Map();
  let maxCount = 0;
  let countOfMax = 0;
  for (const task of tasks) {
    map.set(task, (map.get(task) || 0) + 1);
  }
  for (const [, v] of map) {
    // 凡事求最大值 + 求最大值个数，这个套路都可以直接用
    if (v > maxCount) {
      maxCount = v;
      countOfMax = 1;
    } else if (v === maxCount) {
      countOfMax++;
    }
  }

  return Math.max(tasks.length, (maxCount - 1) * (n + 1) + countOfMax);
};

// 时间复杂度 O(N)
// 空间复杂度 O(N)

// 思路摘要：
// 核心洞察：出现次数最多的任务（maxCount）是瓶颈，以它为骨架搭建时间轴
//
// 骨架结构（以 A 出现 maxCount 次、冷却 n 为例）：
//   A [n个空位] A [n个空位] ... A
//   ├── (maxCount - 1) 个完整段，每段长度 (n+1)
//   └── 尾部跟着"并列最多的任务"（countOfMax 个）
//
// 公式：(maxCount - 1) * (n + 1) + countOfMax
//   - countOfMax：出现次数等于 maxCount 的任务种类数
//   - 例：[A,A,A,B,B,B] n=2 → (3-1)*3 + 2 = 8
//
// 边界情况：当其他任务太多"溢出"空隙时，无需 idle
//   → 最终结果 = max(tasks.length, (maxCount - 1) * (n + 1) + countOfMax)
//
// 实现步骤：
//   1. 统计每个任务出现次数（哈希表）
//   2. 找出 maxCount（最大出现次数）
//   3. 统计 countOfMax（有多少个任务出现 maxCount 次）
//   4. return max(tasks.length, (maxCount - 1) * (n + 1) + countOfMax)

//

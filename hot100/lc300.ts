// 最长递增子序列
const longestIncreasedSubsequence = (nums: number[]) => {
  if (!nums || nums.length === 0) return 0;
  let max_len = 1;
  const dp = new Array(nums.length).fill(1); // dp[i]是以nums[i]为结尾的递增子序列长度
  dp[0] = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    max_len = Math.max(max_len, dp[i]);
  }
  return max_len;
};
// 时间复杂度 O(n ^ 2) —— 每个 i 都要扫一遍前面的全部 j（这正是"必须全扫"的原因）
// 空间复杂度 O(n) —— dp 数组
// 小注：dp[0] = 1 是冗余的（fill(1) 已覆盖）；if (!nums || ...) 中的 !nums 在 TS 下是死代码

/** O(n log n) 贪心+二分：tails[L] = 长度为 L+1 的递增子序列的最小尾牌 */
const newLIS = (nums: number[]): number => {
  const tails: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const idx = lowerBound(tails, nums[i]);
    if (idx === tails.length) {
      tails.push(nums[i]);
    } else {
      tails[idx] = nums[i];
    }
  }
  return tails.length;
};
// 时间复杂度 O(n log n) —— 每个元素做一次 O(log n) 二分
// 空间复杂度 O(n) —— tails 最多存 n 个尾牌

const lowerBound = (arr: number[], x: number): number => {
  let left = 0,
    right = arr.length;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] >= x) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
};

// ── 踩坑记录：lowerBound 的三次版本迭代 ──────────────────────────
// 版本1（right = arr.length - 1 + right = mid - 1 + idx 变量 + 三元返回）：
//   ❌ Bug1 falsy 陷阱：return idx ? idx : arr.length，idx = 0 是 falsy，
//      "答案是 0" 被错返成 arr.length → lowerBound([1, 3], 0) 返回 2（应为 0）
//   ❌ Bug2 末位漏检：left < right 在 left == right 时退出，最后那个位置从未被 mid 检查；
//      且 right = mid - 1 又把 mid 排除出范围 → "答案在最后一个元素"被误判成"没找到"
//      → lowerBound([0,1,3], 2) 返回 3（应为 2）；lowerBound([3], 2) 返回 1（应为 0）
//   ❌ Bug3 非首个：命中 arr[mid] >= x 记下 idx = mid 就收手，不继续向左找更早的
//      → lowerBound([0,1,3], 0) 返回 1（应为 0）
// 版本2（right = arr.length - 1 + right = mid，删掉 idx）：
//   ❌ Bug4 末位歧义：right = mid 的不变量要求 right 代表"插入点"（数组末尾之外），
//      初值 arr.length - 1 把"全部元素都 < x"和"答案在最后一个元素"混为一谈
//      → lowerBound([0,1,3], 4) 返回 2（应为 3）→ newLIS([0,1,3,4]) 错得 3（应为 4）
// 版本3 ✅（right = arr.length + right = mid，左闭右开）：
//   不变量：right 永远指向"一个 ≥ x 的元素或末尾之外"，left 收敛到第一个 ≥ x 的下标
//
// ── 本题总结 ────────────────────────────────────────────────────
// 要点       │ 内容
// ──────────┼────────────────────────────────────────────────────
// 核心洞察   │ x 只关心"尾牌 < x 的最长接龙"；同长度接龙只留最小尾牌（支配性）
// tails     │ tails[L] = 长度 L+1 的最小尾牌，严格递增 → 二分查找可行
// 处理 x     │ 找第一个 ≥ x：找到 → 替换（同长度尾牌变小）；找不到 → append（长度+1）
// 答案       │ tails.length 就是 LIS 长度（替换不变长，只有 append 变长）
// 二分心法   │ 让 left 自己成为答案，不引入 idx；左闭右开：right = arr.length
// 两种解法   │ O(n²) DP：每个 i 扫全部 j；O(n log n)：把"扫全部"换成一次二分
// 复杂度     │ 时间 O(n log n)，空间 O(n)

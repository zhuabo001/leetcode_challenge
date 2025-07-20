# 递归法的递归函数何时需要返回值
在处理树这类问题的时候我们常常会用到递归法，众所周知，递归法有三部曲，其中第一步就是确定递归函数的参数和返回值以及类型，我们如何判断哪些情况需要返回值，哪些情况递归函数不需要返回值呢？

判断递归函数是否需要返回值主要基于以下几个关键原则：
### 基于问题的目标性质
需要返回值的情况有：
* 查找类的问题： 需要找到某个特定的节点或者路径
* 判断类的问题： 需要判断这棵树是否满足某种性质
* 计算类的问题： 需要计算并向上传递某个值
* 提前终止： 一旦找到答案就可以停止搜索，立即返回

不需要返回值的情况有：
* 遍历类的问题： 需要遍历所有节点
* 收集类的问题： 需要收集所有满足条件的节点或者路径
* 修改类的问题： 直接修改树的结构或者节点值
* 完整的搜索： 必须要遍历整棵树才能获得完整答案

### 结合具体案例
#### 需要返回值的典型例子
leetcode112 - 路径和：判断是否存在一条路径和等于给定的目标和
```js
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
const hasPathSum = function(root, targetSum) {
    const traversal = (node, count/**递归参数为节点以及边和 */) => {
    //递归终止条件
        if(!node.left && !node.right && count == 0) return true;
        if(!node.left && !node.right) return false;
        if(node.left){
            count -= node.left.val; // 采用递减的方式
            if(traversal(node.left, count)) return true;
            count += node.left.val; // 回溯
        }
        if(node.right){
            count -= node.right.val;
            if(traversal(node.right, count)) return true;
            count += node.right.val;
        }
        return false;
    }
    if(!root) return false;
    return traversal(root, targetSum - root.val);
}
```

leetcode104 - 二叉树的最大深度：给定一个二叉树，找出其最大深度
```js
const maxDepth = function(root) {
  if(!root){
    return 0;
  }
  let maxLeft = maxDepth(root.left);
  let maxRight = maxDepth(root.right);
  return Math.max(maxLeft, maxRight) + 1;
};
```
以上两道题目都需要返回值，因为它们都需要找到一个特定的节点或者路径，或者需要计算并向上传递某个值。

#### 不需要返回值的典型例子
leetcode113 - 路径总和II：给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。
```js
var pathSum = function(root, sum) {
    let res = [];
    let path = [];
    const dfs = (node, count, pathList) => {
        if(!node.left && !node.right && count === 0) {
            res.push([...pathList]);
            return;
        }
        // 如果没找到符合条件的路径直接返回
        if(!node.left && !node.right) return;
        if(node.left){
            count -= node.left.val; // 
            pathList.push(node.left.val); // 
            dfs(node.left, count, pathList);
            count += node.left.val;// 回溯
            pathList.pop(); // 回溯
        }
        if(node.right) {
            count -= node.right.val;
            pathList.push(node.right.val);
            dfs(node.right, count, pathList);
            count += node.right.val;
            pathList.pop();
        }
        
    }
    if(!root) return [];
    path.push(root.val);
    dfs(root, sum - root.val, path);
    return res;
}
```

leetcode257 - 二叉树的所有路径：给定一个二叉树，返回所有从根节点到叶子节点的路径。
```js
const binaryTreePaths = function(root) {
    if(!root) return [];
    const res = [];
    const path = [];
    const dfs = (node) => {
        // 将当前节点加入路径
        path.push(node.val);
        // 如果当前节点是叶子节点，将路径加入结果数组
        if(!node.left && !node.right) {
            res.push(path.join('->'));
        } else {
            // 如果当前节点不是叶子节点，递归遍历左子树和右子树
            node.left && dfs(node.left);
            node.right && dfs(node.right);
        }
        // 回溯，将当前节点从路径中移除
        path.pop();
    }
    dfs(root);
    return res;
}
```
以上两道题目都不需要返回值，因为它们都需要遍历所有节点，并且需要收集所有满足条件的节点或者路径。

### 判断决策树
问题类型判断
├── 是否需要提前终止？
│   ├── 是 → 需要返回值（如：路径和判断、查找节点）
│   └── 否 → 继续判断
├── 是否需要向上传递信息？
│   ├── 是 → 需要返回值（如：计算深度、判断平衡）
│   └── 否 → 继续判断
├── 是否需要收集所有结果？
│   ├── 是 → 不需要返回值（如：所有路径、层序遍历）
│   └── 否 → 需要返回值
└── 是否直接修改全局状态？
    ├── 是 → 不需要返回值（如：翻转树、修改节点值）
    └── 否 → 需要返回值

### 总结
- 先明确问题目标 ：是找一个答案还是找所有答案
- 分析搜索特性 ：能否提前终止还是必须完整遍历
- 考虑信息流向 ：是否需要子树向父节点传递信息
- 确定状态管理 ：使用局部变量还是全局变量收集结果
通过这些原则，可以在设计递归函数时快速判断是否需要返回值。
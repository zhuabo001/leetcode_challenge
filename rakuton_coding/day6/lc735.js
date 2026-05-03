// 735. 行星碰撞
// 给定一个整数数组 asteroids，表示在同一行的行星。
// 对于数组中的每一个元素，其绝对值表示行星的大小，正负表示行星的移动方向（正表示向右移动，负表示向左移动）。
// 每一颗行星以相同的速度移动。
// 找出碰撞后剩下的所有行星。碰撞规则：两个行星相互碰撞，较小的行星会爆炸。如果两颗行星大小相同，则两颗行星都会爆炸。
// 两颗移动方向相同的行星，永远不会发生碰撞。
const handleAsteroidCollision = (asteroids) => {
  const survivorStack = [];
  for (let curAsteroid of asteroids) {
    let curAlive = true;
    while (
      survivorStack.length &&
      curAsteroid < 0 &&
      survivorStack[survivorStack.length - 1] > 0 &&
      curAlive
    ) {
      const topAsteroid = survivorStack[survivorStack.length - 1];
      const collisionRes = topAsteroid + curAsteroid;
      if (collisionRes > 0) {
        // 栈顶元素大于0，当前元素小于0，碰撞后栈顶元素存活
        curAlive = false;
      } else if (collisionRes < 0) {
        // 栈顶元素大于0，当前元素小于0，碰撞后当前元素存活
        survivorStack.pop();
      } else {
        // 栈顶元素大于0，当前元素小于0，碰撞后栈顶元素和当前元素都爆炸
        survivorStack.pop();
        curAlive = false;
      }
    }
    if (curAlive) {
      survivorStack.push(curAsteroid);
    }
  }
  return survivorStack;
};
// 时间复杂度：O(n)，其中 n 是数组 asteroids 的长度。
// 空间复杂度：O(n)。

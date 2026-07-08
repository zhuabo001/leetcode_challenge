// 实现前缀树
interface TrieNodeType {
  children: { [key: string]: TrieNodeType };
  is_end: boolean;
}
class TrieNode implements TrieNodeType {
  public children: { [key: string]: TrieNodeType };
  public is_end: boolean;
  constructor() {
    this.children = {};
    this.is_end = false;
  }
}
class Trie {
  public root: TrieNodeType;
  constructor() {
    this.root = new TrieNode();
  }

  /**
   * 向 Trie 中插入一个单词
   * @param word - 要插入的单词
   * 时间复杂度 O(n)，n 为单词长度
   */
  public insert(word: string) {
    let node = this.root;
    for (const char of word) {
      if (!(char in node.children)) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.is_end = true;
  }

  /**
   * 搜索 Trie 中是否完整存储了某个单词
   * @param word - 要查找的单词
   * @returns 是否存在该单词
   * 时间复杂度 O(n)，n 为单词长度
   */
  public search(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!(char in node.children)) {
        return false;
      }
      node = node.children[char];
    }
    return node.is_end;
  }

  /**
   * 判断 Trie 中是否有以给定前缀开头的单词
   * @param prefix - 要检查的前缀
   * @returns 是否存在匹配的前缀
   * 时间复杂度 O(n)，n 为前缀长度
   */
  public startsWith(prefix: string): boolean {
    let node = this.root;
    for (const char of prefix) {
      if (!(char in node.children)) {
        return false;
      }
      node = node.children[char];
    }
    return true;
  }
}

// 关于前缀树（Trie）：
//
// 1. 核心思想
//    Trie 用树形结构存储字符串，每个节点代表一个字符。从根节点到某个节点路径上经过的所有字符
//    拼接起来就是该节点所代表的字符串。与哈希表不同，Trie 不直接存储完整字符串，而是将字符串
//    的公共前缀合并共享。
//
// 2. 结构
//    - 每个节点包含一个 children 映射（或数组），指向下一个字符对应的子节点
//    - is_end 标记表示从根到当前节点的路径是否构成一个完整的单词
//    - 根节点为空字符，不存储任何内容
//
// 3. 优点
//    - 前缀查询效率高：O(n) 即可查出是否存在以某前缀开头的单词，哈希表做不到这一点
//    - 节省空间：共享公共前缀，如 "apple" 和 "apply" 共享 "appl"
//    - 自动补全、拼写检查、词频统计等场景天然适合用 Trie
//
// 4. 与哈希表的对比
//    哈希表可以 O(1) 完成 insert 和 search，但无法高效处理前缀搜索；Trie 的三个操作
//    都是 O(n)（n 为字符串长度），且额外支持前缀匹配。

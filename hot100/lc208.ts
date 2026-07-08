// 实现前缀树
// Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补全和拼写检查
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

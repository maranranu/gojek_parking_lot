class TreeHashMap {
  constructor() {
    this.root = null;
    this.length = 0;
  }

  getTree() {
    return this.root;
  }

  get(key) {
    return this._get(key, this.root);
  }

  _get(key, node) {
    if (node === null) {
      return;
    }
    if (key < node.key) {
      return this._get(key, node.left);
    } else if (key > node.key) {
      return this._get(key, node.right);
    } else {
      return node.value;
    }
  }

  set(key, value) {
    this.root = this._set(key, value, this.root);
  }

  _set(key, value, node) {
    if (node === null) {
      this.length += 1
      return {
        key: key,
        value: value,
        left: null,
        right: null
      };
    }
    if (key < node.key) {
      node.left = this._set(key, value, node.left);
    } else if (key > node.key) {
      node.right = this._set(key, value, node.right);
    } else {
      node.value = value;
    }
    return node;
  }

  getMaxKey() {
    let maxNode = this._maxNode(this.root);
    if (maxNode !== null) {
      return maxNode.key;
    }
    return maxNode;
  }

  getMinKey() {
    let minNode = this._minNode(this.root);
    if (minNode !== null) {
      return minNode.key;
    }
    return minNode;
  }

  _maxNode(node) {
    while (node !== null && node.right !== null) {
      node = node.right;
    }
    return node;
  }

  _minNode(node) {
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  remove(key) {
    this._remove(key, this.root)
  }

  _remove(key, node) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = this._remove(key, node.left);
    } else if (key > node.key) {
      node.right = this._remove(key, node.right);
    } else {
      if (node.left !== null && node.right !== null) {
        var maxNode = this._maxNode(node.left);
        var maxNodeKey = maxNode.key;
        var maxNodeValue = maxNode.value;
        maxNode.key = node.key;
        maxNode.value = node.value;
        node.key = maxNodeKey;
        node.value = maxNodeValue;
        node.left = this._remove(key, node.left);
      } else if (node.left !== null) {
        this.length -= 1;
        return node.left;
      } else if (node.right !== null) {
        this.length -= 1;
        return node.right;
      } else {
        this.length -= 1;
        return null;
      }
    }
    return node;
  }
  inorder(node, elem) {
    if (node) {
      if (node.left) {
        this.inorder(node.left, elem);
      }
      elem.push({
        key: node.key,
        value: node.value
      });
      if (node.right) {
        this.inorder(node.right, elem);
      }
    }
    return elem;
  }

  getAll() {
    return this.inorder(this.root, [])
  }
};

module.exports = TreeHashMap;

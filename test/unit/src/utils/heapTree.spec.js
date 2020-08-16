const { expect, assert } = require('chai');
const heapTree = require('src/utils/heapTree');

describe('utils :: MinHeap', () => {
  let tree;

  beforeEach(() => {
    tree = new heapTree();
    tree.set(1);
    tree.set(2);
    tree.set(3);
  });

  describe('#getMin', () => {
    it('get min element in heap', () => {
      expect(tree.getMin()).equal(1);
    });
  });

  describe('#length', () => {
    it('get length of heap', () => {
      expect(tree.length()).equal(3);
    });
  });

  describe('#set', () => {
    it('insert element in heap', () => {
      tree.set(4);
      expect(tree.length()).equal(4);
    });
  });

  describe('#remove', () => {
    it('remove element from heap', () => {
      tree.remove(3);
      expect(tree.length()).equal(2);
    });
  });
});

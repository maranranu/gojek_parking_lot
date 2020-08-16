class MinHeap {
  constructor() {
    this.heap = [];
  }

  getMin() {
    return this.heap[0];
  }

  length() {
    return this.heap;
  }

  heapify(index) {
    let smallest = index;
    let n = this.heap.length;
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    if (left < n && this.heap[index] > this.heap[left]) {
      smallest = left
    }
    if (right < n && this.heap[smallest] > this.heap[right]) {
      smallest = right;
    }
    if (smallest != index) {
      let tmp = this.heap[index];
      this.heap[index] = this.heap[smallest];
      this.heap[smallest] = tmp;
      this.heapify(smallest)
    }
  }

  set(num) {
    let size = this.heap.length;
    if (size == 0) {
      this.heap.push(num)
    } else {
      this.heap.push(num);
      for (let i = (Math.floor((size / 2))) - 1; i > -1; i--) {
        this.heapify(i)
      }
    }
  }

  remove(num) {
    let size = this.heap.length;
    let i = 0;
    for (i = 0; i < size; i++) {
      if (num == this.heap[i]) {
        break;
      }
    }

    let tmp = this.heap[i];
    this.heap[i] = this.heap[size - 1];
    this.heap[size - 1] = tmp;

    this.heap.splice(size - 1, 1);
    size = this.heap.length;

    for (let i = (Math.floor((size / 2))) - 1; i > -1; i--) {
      this.heapify(i)
    }
  }
}

module.exports = MinHeap;

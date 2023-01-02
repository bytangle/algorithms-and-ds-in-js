class DLLNode {
    prev = null
    next = null

    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

}

class LRUCache {
    head = new DLLNode("", null)
    tail = new DLLNode("", null)
    keys = {}

    constructor(capacity) {
        this.capacity = capacity;
        this.head.next = this.tail;
        this.tail.prev = this.head
    }

    #removeNode(node) {
        node.next = node.prev;
        node.prev = node.next;
    }

    #addNode(node) {
        let tailPrev = this.tail.prev;
        tailPrev.next = node;
        node.prev = tailPrev;

        this.tail.prev = node;
        node.next = this.tail;
    }

}
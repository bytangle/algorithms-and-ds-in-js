class LFUNode {
    prev = null;
    next = null;
    freqCount = 1;

    constructor(
        key, value
    ) {
        this.key = key;
        this.value = value;
    }

}

class LFUDoublyLinkedList {
    head = new LFUNode("buffer head", null);
    tail = new LFUNode("buffer tail", null);
    size = 0;

    constructor() {
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    insertAtHead(node) {
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
        node.prev = this.head;

        this.size++;
    }

    removeAtTail() {
        let oldTail = this.tail.prev;
        this.tail.prev.prev.next = this.tail;
        this.tail.prev = oldTail.prev;

        this.size--;

        return oldTail;
    }

    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        this.size--;
    }
}

class LFUCache {
    keys = {}
    freqs = {}
    minFreq = 0
    size = 0;

    constructor(capacity) {
        this.capacity = capacity;
    }

    setValue(key, value) {
        let node = this.keys[key];

        if(node == undefined) {
            let node = new LFUNode(key, value);

            this.keys[key] = node;

            if(this.size != this.capacity) {
                if(this.freqs[1] == undefined) {
                    this.freqs[1] = new LFUDoublyLinkedList()
                }

                this.freqs[1].insertAtHead(node);
                this.size++
            } else {
                let oldTail = this.freqs[this.minFreq].removeAtTail();

                delete this.keys[oldTail.key];

                if(this.freqs[1] == undefined) {
                    this.freqs[1] = new LFUDoublyLinkedList()
                }

                this.freqs[1].insertAtHead(node);
            }

            this.minFreq = 1;
        } else {
            let oldFreqCount = node.freqCount;

            node.data = value;
            node.freqCount++;

            this.freqs[oldFreqCount].removeNode(node);

            if(this.freqs[node.freqCount] == undefined) {
                this.freqs[node.freqCount] = new LFUDoublyLinkedList();
            }

            this.freqs[node.freqCount].insertAtHead(node);

            if(oldFreqCount == this.minFreq && Object.keys(this.freqs[oldFreqCount]).length == 0) {
                this.minFreq++;
            }
        }
    }

    getValue(key) {
        let node = this.keys[key];

        if(node == undefined) {
            return null;
        } else {
            let oldFreqCount = node.freqCount;
            node.freqCount++;

            this.freqs[oldFreqCount].removeNode(node);

            if(this.freqs[node.freqCount] == undefined) {
                this.freqs[node.freqCount] = new LFUDoublyLinkedList()
            }

            this.freqs[node.freqCount].insertAtHead(node);

            if(oldFreqCount == this.minFreq && Object.keys(this.freqs[oldFreqCount]).length == 0) {
                this.minFreq++;
            }

            return node.data
        }
    }
}

// example
let MyCache = new LFUCache(10);
MyCache.setValue(5,10)
MyCache.setValue(2,54)
MyCache.setValue(4,23)
MyCache.setValue(9,102)

console.log(MyCache.getValue(4))
console.log(MyCache.getValue(4))
console.log(MyCache.getValue(2))
console.log(MyCache.getValue(4))
console.log(MyCache.getValue(5))

console.log(MyCache)
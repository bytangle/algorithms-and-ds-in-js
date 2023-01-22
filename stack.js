class Stack {
    store = [];

    unshift(data) {
        this.store.push(data);
    } // 1, 2, 3, 4

    pop() {
        return this.store.pop()
    } // 4, 3, 2, 1
}

module.exports = {
    Stack
}
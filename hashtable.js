
class HashTable {

    constructor(size) {
        this.size = size;
        this.keys = this.initArray(size);
        this.values = this.initArray(size);
        this.limit = 0
    }

    initArray(size) {
        return new Array(size);
    }

    put(key, value) {
        if(this.limit >= this.size) throw new Error("hash table is full")

        let hashedIndex = this.hash(key);

        while(this.keys[hashedIndex] != null) {
            hashedIndex++;

            hashedIndex = hashedIndex % this.size;
        }

        this.keys[hashedIndex] = key;
        this.values[hashedIndex] = value;
        this.limit++;
    }

    get(key) {
        let hashedIndex = this.hash(key);

        while(this.keys[hashedIndex] != key) {
            hashedIndex++; 

            hashedIndex = hashedIndex % this.size;
        }

        return this.values[hashedIndex]
    }

    hash(key) {
        if(typeof(key) != "number") throw new Error("Key must be integer");
        return this.secondHash(key % this.size);
    }

    secondHash(hashedKey) {
        let R = this.size - 2;
        return R - (hashedKey % R)
    }
}

let hashTable = new HashTable(19);

hashTable.put(9,"Joshua");
hashTable.put(10, "Julius");
hashTable.put(4, "Jennifer");
hashTable.put(6, "Joy")
hashTable.put(6, "Jesse")
console.log(hashTable)
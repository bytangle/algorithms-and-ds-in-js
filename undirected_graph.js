class UndirectedGraph {
    edges = {};

    addVertex(vertex) {
        this.edges[vertex] = {}
    }

    addEdge(vertex1, vertex2, weight = 0) {

        if(!Object.keys(this.edges).includes(String(vertex1))) {
            throw new Error(`${vertex1} not a valid vertex`)
        }

        if(!Object.keys(this.edges).includes(String(vertex2))) {
            throw new Error(`${vertex2} not a valid vertex`)
        }

        this.edges[vertex1][vertex2] = weight;
        this.edges[vertex2][vertex1] = weight;
    }

    removeVertex(vertex) {

        for(let adjVertex in this.edges[vertex]) {
            this.deleteEdge(adjVertex, vertex)
        }

        delete this.edges[vertex];
    }

    deleteEdge(vertex1, vertex2) {
        if(!Object.keys(this.edges).includes(String(vertex1))) {
            throw new Error(`${vertex1} not a valid vertex`)
        }

        if(!Object.keys(this.edges).includes(String(vertex2))) {
            throw new Error(`${vertex2} not a valid vertex`)
        }
        
        if(this.edges[vertex1][vertex2]) {
            delete this.edges[vertex1][vertex2]
        }

        if(this.edges[vertex2][vertex1]) {
            delete this.edges[vertex2][vertex1]
        }
    }
}

let graph1 = new UndirectedGraph();

graph1.addVertex(1);
graph1.addVertex(2);
graph1.addVertex(3);
graph1.addEdge(1,2, 1);
graph1.addVertex(4)
graph1.addVertex(5)
graph1.addEdge(2,3, 8);
graph1.addEdge(3,4, 10);
graph1.addEdge(4,5, 100);
graph1.addEdge(1,5, 88);

console.log(graph1)

graph1.removeVertex(5)
graph1.removeVertex(1);
graph1.deleteEdge(2,3)

console.log(graph1)
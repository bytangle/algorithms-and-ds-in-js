class DirectedGraph {
    edges = {};

    addVertex(vertex) {
        this.edges[vertex] = {}
    }

    connect(origin, destination, weight = 0) {

        if(!Object.keys(this.edges).includes(String(origin))) {
            throw new Error(`${origin} not a valid vertex`)
        }

        if(!Object.keys(this.edges).includes(String(destination))) {
            throw new Error(`${destination} not a valid vertex`)
        }

        if(this.edges[destination].hasOwnProperty(origin)) {
            throw new Error(`Bidirectional relationship not allowed (vertices: ${origin}, ${destination})`);
        }

        this.edges[origin][destination] = weight
    }

    removeVertex(vertex) {
        if(!Object.keys(this.edges).includes(String(vertex))) {
            throw new Error(`${vertex} not a valid vertex`)
        }

        for(let adjVertex in this.edges[vertex]) {
            this.disconnect(adjVertex, vertex)
        }

        delete this.edges[vertex]
    }

    disconnect(origin, destination) {
        if(!Object.keys(this.edges).includes(String(origin))) {
            throw new Error(`${origin} not a valid vertex`)
        }

        if(!Object.keys(this.edges).includes(String(destination))) {
            throw new Error(`${destination} not a valid vertex`)
        }

        if(this.edges[origin][destination]) {
            delete this.edges[origin][destination]
        }
    }
}

let graph = new DirectedGraph();
graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')

graph.connect('A', 'B', 1)
graph.connect('B', 'C', 2)
graph.connect('C', 'A', 3)

console.log(graph)
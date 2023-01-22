const { Stack } = require("./stack");

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

    traverseBFS(vertex, fn) {
        let queue = [], visited = {};

        queue.push(vertex);

        while(queue.length) {
            vertex = queue.shift();

            if(!visited[vertex]) {
                visited[vertex] = true
                fn(vertex);

                for(let adjVertex in this.edges[vertex]) {
                    queue.push(adjVertex)
                }
            }
        }
    }

    traverseDFS(vertex, fn) {
        let visited = {};
        this.#_traverseDFS(vertex, visited, fn);
    }

    #_traverseDFS(vertex, visited, fn) {

        visited[vertex] = true;
        fn(vertex);

        for(let adjVertex in this.edges[vertex]) {
            if(!visited[adjVertex]) {
                this.#_traverseDFS(adjVertex, visited, fn)
            }
        }

    }

    #isEmpty(obj) {
        return Object.keys(obj).length == 0
    }

    #extractMin(Q, dist) {
        let minimumDistance = Infinity,
            nodeWithMinimumDistance = null;
        
        for(let node in Q) {
            if(dist[node] <= minimumDistance) {
                minimumDistance = dist[node];
                nodeWithMinimumDistance = node;
            }
        }

        return nodeWithMinimumDistance;
    }

    Dijkstra(source) {
        let Q = {}, dist = {};

        for(let vertex in this.edges) {
            dist[vertex] = Infinity;

            Q[vertex] = this.edges[vertex]
        }

        dist[source] = 0;

        while(!this.#isEmpty(Q)) {
            let u = this.#extractMin(Q, dist);

            delete Q[u]

            for(let neighbor in this.edges[u]) {
                let alt = dist[u] + this.edges[u][neighbor];

                if(alt < dist[neighbor]) {
                    dist[neighbor] = alt;
                }
            }
        }

        return dist;
    }

    topologicalSortUtil(v, visited, stack) {
        visited.add(v);

        for(let item in this.edges[v]) {
            if(visited.has(item) == false) {
                this.topologicalSortUtil(item, visited, stack);
            }
        }

        stack.unshift(v)
    }

    topologicalSort() {
        let visited = {}, stack = [];

        for(let item in this.edges) {
            if(visited.has(item) == false) {
                this.topologicalSortUtil(item, visited, stack)
            }
        }

        return stack;
    }
}

let graph = new DirectedGraph();
graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')
graph.addVertex('D')

graph.connect('A', 'B', 1)
graph.connect('B', 'C', 2)
graph.connect('C', 'A', 3)
graph.connect('B', 'D', 10)

console.log(graph)

console.log(graph.Dijkstra("A"))
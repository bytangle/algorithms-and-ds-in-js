import { 
    GraphOperationCodes, 
    GraphVertexType, 
    IDirectedGraph, 
    IGraphEdge, 
    IGraphOperationPayload, 
    IGraphVertex 
} from "./directed_graph.interface";

/**
 * @description custom directed graph implemented to hold relationships that'll be used in 
 * the system's recommendation system
 */
class DirectedGraph implements IDirectedGraph {
    graph = {};
    
    /**
     * @description add new vertex
     * the id of each vertex is used as the key pointing to the vertex itself in the graph data structure
     * @param v vertex
     */
    addVertex(v : IGraphVertex) : IGraphOperationPayload {

        // ensure vertex doesn't yet exist
        if(this.graph.hasOwnProperty(v.id)) {
            return this.response({code: GraphOperationCodes.VERTEX_ALREADY_EXISTS, description: "Vertex already exists"})
        }  

        this.graph[v.id] = v; // just add it
        return this.response({code: GraphOperationCodes.SUCCESS, description: "vertex added"})
    }

    /**
     * @description remove vertex
     * @param vId vertex ID
     */
    removeVertex(vId : string) : IGraphOperationPayload {

        // ensure vertex exists
        if(!this.graph[vId]) {
            return this.response({
                code: GraphOperationCodes.VERTEX_DOES_NOT_EXIST, 
                description: `Vertex with this ID does not exist ${vId}`
            })
        }

        // disconnect vertex from neighbors
        for(let v in this.graph) {
            this.disconnectVertices(v, vId);
        }

        delete this.graph[vId]; // remove vertex

        return this.response({
            code: GraphOperationCodes.SUCCESS,
            description: "vertex removed"
        })
    }

    /**
     * @description disconnect two vertices
     * @param originId 
     * @param destinationId 
     */
    disconnectVertices(originId : string, destinationId : string) : IGraphOperationPayload {
        
        // ensure vertex exists
        if(!this.graph[originId]) {
            return this.response({
                code: GraphOperationCodes.VERTEX_DOES_NOT_EXIST, 
                description: `Vertex with this ID does not exist ${originId}`
            })
        }

        // ensure vertex exists
        if(!this.graph[destinationId]) {
            return this.response({
                code: GraphOperationCodes.VERTEX_DOES_NOT_EXIST, 
                description: `Vertex with this ID does not exist ${destinationId}`
            })
        }

        if(this.graph[originId].neigbors[destinationId]) {
            delete this.graph[originId].neigbors[destinationId]

            return {
                code: GraphOperationCodes.SUCCESS,
                description: "vertices disconnected"
            }

        } else {

            return {
                code: GraphOperationCodes.VERTEX_DOES_NOT_EXIST,
                description: `origin vertex doesn't any any neighbor with this id ${destinationId}`
            }

        }
    }

    /**
     * @description connect two vertices
     * @param originId 
     * @param destinationId
     * @param edge 
     */
    connectVertices(originId : string, destinationId : string, edge : IGraphEdge) {

        // ensure vertex exists
        if(!this.graph[originId]) {
            return this.response({
                code: GraphOperationCodes.VERTEX_DOES_NOT_EXIST, 
                description: `Vertex with this ID does not exist ${originId}`
            })
        }

        // ensure vertex exists
        if(!this.graph[destinationId]) {
            return this.response({
                code: GraphOperationCodes.VERTEX_DOES_NOT_EXIST, 
                description: `Vertex with this ID does not exist ${destinationId}`
            })
        } 
        
        // ensure destination isn't pointing to origin already
        if(this.graph[destinationId].neigbors.hasOwnProperty(originId)) {
            return this.response({
                code: GraphOperationCodes.BIDIRECTIONAL_RELATIONSHIP_NOT_ALLOWED,
                description: `Bidirectional relationship not allowed (vertices: ${originId}, ${destinationId})`
            })
        }

        this.graph[originId].neigbors[destinationId] = edge;
    }

    /**
     * @description Depth-first traversal
     * @param originId 
     * @param cb 
     */
    traverseDFS(originId : string, fn : (vertex : IGraphVertex, isDeepestVertex : boolean) => any) {

        // ensure vertex exists
        if(!this.graph[originId]) {
            return this.response({
                code: GraphOperationCodes.VERTEX_DOES_NOT_EXIST, 
                description: `Vertex with this ID does not exist ${originId}`
            })
        }

        let visited = {};
        this._traverseDFS(originId, visited, fn)
    }

    /**
     * @description actual implementation
     * @param vId 
     * @param visited 
     * @param fn 
     */
    private _traverseDFS(vId : string, visited : object, fn : (vertex : IGraphVertex, isDeepestVertex : boolean) => any) {
        visited[vId] = true;
        let vertex = this.graph[vId]
        let isDeepestVertex = false;
        if(Object.keys(vertex.neigbors).length == 0) {
            isDeepestVertex = true;
        }

        fn(vertex, isDeepestVertex);

        for(let adjVertex in this.graph[vId].neigbors) {
            
            let vData : IGraphVertex = this.graph[adjVertex];

            if(!visited[vData.id]) {
                this._traverseDFS(vData.id, visited, fn)
            } else {

                if(Object.keys(vData.neigbors).length == 0) {
                    isDeepestVertex = true;
                    fn(vData, isDeepestVertex);
                }

            }
        }
    }

    /**
     * @description throw error
     * @param payload 
     */
    private response(payload : IGraphOperationPayload) {
        return {code : payload.code, description : payload.description}
    }
}


// ------------------------------- Test ------------------------
let graph = new DirectedGraph();

// add vertices
graph.addVertex({
    type: GraphVertexType.USER,
    id: "user1",
    neigbors: {}
})
graph.addVertex({
    type: GraphVertexType.USER,
    id: "user2",
    neigbors: {}
})
graph.addVertex({
    type: GraphVertexType.USER,
    id: "user3",
    neigbors: {}
})
graph.addVertex({
    type: GraphVertexType.USER,
    id: "user4",
    neigbors: {}
})
graph.addVertex({
    type: GraphVertexType.USER,
    id: "user5",
    neigbors: {}
})
graph.addVertex({
    type: GraphVertexType.USER,
    id: "user6",
    neigbors: {}
})
graph.addVertex({
    type: GraphVertexType.PRODUCT,
    id: "loan10",
    neigbors: {}
})
graph.addVertex({
    type: GraphVertexType.PRODUCT,
    id: "loan20",
    neigbors: {}
})
graph.addVertex({
    type: GraphVertexType.PRODUCT,
    id: "loan30",
    neigbors: {}
})

// connect vertices
graph.connectVertices("user1", "loan10", {weight: 10})
graph.connectVertices("user1", "user2", {weight: 10})
graph.connectVertices("user1", "user3", {weight: 10})
graph.connectVertices("user1", "user4", {weight: 10})
graph.connectVertices("user1", "user5", {weight: 10})
graph.connectVertices("user1", "user6", {weight: 10})
graph.connectVertices("user2", "loan20", {weight: 10})
graph.connectVertices("user3", "loan30", {weight: 10})
graph.connectVertices("user4", "loan20", {weight: 10})
graph.connectVertices("user5", "loan30", {weight: 10})
graph.connectVertices("user5", "loan10", {weight: 10})
graph.connectVertices("user6", "loan30", {weight: 10})
graph.connectVertices("user4", "loan30", {weight: 10})

let freq = {};

graph.traverseDFS("user1", (v, isDeepestVertex) => {

    if(isDeepestVertex) {
        if(freq[v.id]) {
            freq[v.id] += 1;
        } else {
            freq[v.id] = 1;
        }
    }

})

console.log(freq);


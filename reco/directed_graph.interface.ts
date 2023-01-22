export interface IDirectedGraph {
    graph : { [vertexId : string] : IGraphVertex };
}

/**
 * @description a vertex
 */
export interface IGraphVertex {
    id: string;
    type: GraphVertexType;
    neigbors: { [neighborId : string] : IGraphEdge }
}

/**
 * @description vertex edge
 */
export interface IGraphEdge {
    weight: number;
}

/**
 * @description vertex types
 */
export enum GraphVertexType {
    PRODUCT,
    USER
}

export enum GraphOperationCodes {
    SUCCESS = "00",
    VERTEX_ALREADY_EXISTS = "10",
    VERTEX_DOES_NOT_EXIST = "11",
    BIDIRECTIONAL_RELATIONSHIP_NOT_ALLOWED = "12"
}

export interface IGraphOperationPayload {
    code : string;
    description : string;
}
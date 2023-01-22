"use strict";
exports.__esModule = true;
exports.GraphOperationCodes = exports.GraphVertexType = void 0;
/**
 * @description vertex types
 */
var GraphVertexType;
(function (GraphVertexType) {
    GraphVertexType[GraphVertexType["PRODUCT"] = 0] = "PRODUCT";
    GraphVertexType[GraphVertexType["USER"] = 1] = "USER";
})(GraphVertexType = exports.GraphVertexType || (exports.GraphVertexType = {}));
var GraphOperationCodes;
(function (GraphOperationCodes) {
    GraphOperationCodes["SUCCESS"] = "00";
    GraphOperationCodes["VERTEX_ALREADY_EXISTS"] = "10";
    GraphOperationCodes["VERTEX_DOES_NOT_EXIST"] = "11";
    GraphOperationCodes["BIDIRECTIONAL_RELATIONSHIP_NOT_ALLOWED"] = "12";
})(GraphOperationCodes = exports.GraphOperationCodes || (exports.GraphOperationCodes = {}));

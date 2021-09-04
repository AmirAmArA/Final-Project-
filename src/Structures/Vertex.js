//A class for building the nodes in the graph
export default class Vertex {
  constructor(edge1, edge2, neighbor_vertex1, neighbor_vertex2, index, passing_lightpaths) {
    this.index = index;
    this.neighbor_vertex1 = neighbor_vertex1;
    this.neighbor_vertex2 = neighbor_vertex2;
    this.edge1 = edge1;
    this.edge2 = edge2;
    this.passing_lightpaths = passing_lightpaths;
  }

}

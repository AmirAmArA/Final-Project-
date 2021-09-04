//A class for building the Edge element
export default class Edge {
  constructor(neighbor_edge1, neighbor_edge2, vertex1, vertex2, index, passing_lightpaths) {
    this.index = index;
    this.neighbor_edge1 = neighbor_edge1;
    this.neighbor_edge2 = neighbor_edge2;
    this.vertex1 = vertex1;
    this.vertex2 = vertex2;
    this.passing_lightpaths = passing_lightpaths;
  }
}

export default class Lightpath {
  constructor(wavelength, startVertex, endVertex, index, passing_edges) {
    this.wavelength = wavelength;
    this.passing_edges = passing_edges;
    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.index = index;
  }
}
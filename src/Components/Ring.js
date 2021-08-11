import { Component } from "react";
import { Link } from "react-router-dom";
import Vertex from "../Structures/Vertex";
import Edge from "../Structures/Edge";
import Lightpath from "../Structures/Lightpath";

export default class Ring extends Component {
  constructor() {
    super();
    this.state = {
      vertexCount: 0,
      vertexArr: [],
      edgeArr: [],
      lightpathArr: [],
    };
  }

  loadState = (event) => {
    this.setState({ vertexCount: event.target.value });
  };

  produceGraph = () => {
    const { vertexCount, vertexArr, edgeArr } = this.state;

    for (let i = 0; i < vertexCount; i++) {
      switch (i) {
        case 0:
          vertexArr.push(
            new Vertex(vertexCount - 1, i, vertexCount - 1, i + 1)
          );
          edgeArr.push(new Edge(vertexCount - 1, i, i, i + 1));
          break;
        case vertexCount - 1:
          vertexArr.push(new Vertex(i - 1, vertexCount - 1, i - 1, 0));
          edgeArr.push(new Edge(vertexCount - 1 - 1, 0, vertexCount - 1, 0));
          break;
        default:
          vertexArr.push(new Vertex(i - 1, i, i - 1, i + 1));
          console.log(i - 1, i + 1, i, i + 1);
          edgeArr.push(new Edge(i - 1, i + 1, i, i + 1));
          break;
      }
    }

    console.log(vertexArr, edgeArr);
  };

  produceLightpaths = () => {

  }
  simulate = () => {
    this.produceGraph();
    // this.produceLightpaths();
  };
  render() {
    return (
      <div className="container">
        <h1>How Many Nodes would you like to test the algorithm on? (Ring)</h1>
        <div className="row-md-12">
          <input
            type="text"
            placeholder="Enter the Desired Number of Nodes"
            width="40%"
            onBlur={this.loadState}
          />
          <button className="generalButton" onClick={this.simulate}>
            Simulate
          </button>
        </div>
        <div className="row-md-12 mt-5"> <Link to="/" className="generalButton">  Go Home </Link></div>
      </div>
    );
  }
}

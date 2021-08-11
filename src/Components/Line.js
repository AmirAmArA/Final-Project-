import { Component } from "react";
import Vertex from "../Structures/Vertex";
import Edge from "../Structures/Edge";
import Lightpath from "../Structures/Lightpath";

export default class Line extends Component {
  constructor() {
    super();
    this.state = {
      vertexCount: 0,
      vertexArr: [],
      edgeArr: [],
      lightpathArr: [],
    };
  }

  produceGraph = () => {
    const { vertexCount, vertexArr, edgeArr } = this.state;

    for (let i = 0; i < vertexCount; i++) {
      switch (i) {
        case 0:
          vertexArr.push(new Vertex(null, i, null, i + 1));
          edgeArr.push(new Edge(null, i + 1, 0, i + 1));
          break;
        case vertexCount - 1:
          vertexArr.push(new Vertex(i - 1, null, i - 1, null));
          break;
        default:
          vertexArr.push(new Vertex(i - 1, i, i - 1, i + 1));
          edgeArr.push(new Edge(i, i + 1, i - 1, i + 1));
          break;
      }
    }
    console.log(vertexArr, edgeArr);
  };

  loadState = (event) => {
    this.setState({ vertexCount: event.target.value });
  };

  simulate = () => {
    this.produceGraph();
  };
  render() {
    return (
      <>
        <h1>How Many Nodes would you like to test the algorithm on?</h1>
        <div>
          <input
            type="text"
            placeholder="Enter the Desired Number of Nodes"
            width="30%"
            onBlur={this.loadState}
          />
          <button className="generalButton" onClick={this.simulate}>
            Simulate
          </button>
        </div>
      </>
    );
  }
}

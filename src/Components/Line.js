import React, { Component } from "react";
import { Link } from "react-router-dom";
import Vertex from "../Structures/Vertex";
import Edge from "../Structures/Edge";
import Lightpath from "../Structures/Lightpath";
import {optimalLines} from './lines'

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
          vertexArr.push(new Vertex(null, i, null, i + 1,i));
          edgeArr.push(new Edge(null, i + 1, 0, i + 1));
          break;
        case vertexCount - 1:
          vertexArr.push(new Vertex(i - 1, null, i - 1, null,i));
          break;
        default:
          vertexArr.push(new Vertex(i - 1, i, i - 1, i + 1,i));
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
    const {vertexArr } = this.state;
    optimalLines([vertexArr],vertexArr.length)

  };

  render() {
    return (
      <div className="container">
        <h1>How Many Nodes would you like to test the algorithm on? (Line)</h1>
        <div>

          <input
            type="text"
            placeholder="Enter the Desired Number of Nodes"
            // width="40%"
            onBlur={this.loadState}
          />
          <button className="generalButton" onClick={this.simulate}>
            Simulate
          </button>
        </div>
        <div className='svgpainter' style={{width : '1000px', height:'1000px',transform:'all 1s ease-in-out'}}></div>
        <div className="row"> <Link to="/" className="generalButton">  Go Home </Link></div>
      </div >
    );
  }
}

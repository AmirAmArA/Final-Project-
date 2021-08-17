import React, { Component } from "react";
import { Link } from "react-router-dom";
import Vertex from "../Structures/Vertex";
import Edge from "../Structures/Edge";
import Lightpath from "../Structures/Lightpath";
import { rand, randN, createLightpaths } from '../Structures/helpFunc.js';
import { getSVG, f1, f, shuffle, appear, wait } from './Circles'
import d3 from 'd3'
import '../App.css';

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
          edgeArr.push(new Edge(null, i + 1, 0, i + 1,i));
          break;
        case vertexCount - 1:
          vertexArr.push(new Vertex(i - 1, null, i - 1, null,i));
          break;
        default:
          vertexArr.push(new Vertex(i - 1, i, i - 1, i + 1,i));
          edgeArr.push(new Edge(i, i + 1, i - 1, i + 1,i));
          break;
      }
    }
    console.log(vertexArr, edgeArr);
  };

  loadState = (event) => {
    this.setState({ vertexCount: event.target.value });

  };

  produceLightpaths = () => {
    
  }

  simulate = () => {
    this.produceGraph();
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
          <button className="generalButton" onClick={this.test}>
            Test
          </button>
        </div>
        <div className="row"> <Link to="/" className="generalButton">  Go Home </Link></div>
      </div >
    );
  }
}

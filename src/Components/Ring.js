import React, { Component } from "react";
import { Link } from "react-router-dom";
import Vertex from "../Structures/Vertex";
import Edge from "../Structures/Edge";
import Lightpath from "../Structures/Lightpath";
import { rand, randN, createLightpaths } from '../Structures/helpFunc.js';
import { getSVG,f } from './Circles'
import d3 from 'd3'

export default class Ring extends Component {
  constructor() {
    super();
    this.state = {
      vertexCount: 0,
      vertexArr: [],
      edgeArr: [],
      lightpathArr: [],
      validChains: {

      },
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
            new Vertex(vertexCount - 1, i, vertexCount - 1, i + 1, i)
          );
          edgeArr.push(new Edge(vertexCount - 1, i, i, i + 1, i));
          break;
        case vertexCount - 1:
          vertexArr.push(new Vertex(i - 1, vertexCount - 1, i - 1, 0, i));
          edgeArr.push(new Edge(vertexCount - 1 - 1, 0, vertexCount - 1, 0, i));
          break;
        default:
          vertexArr.push(new Vertex(i - 1, i, i - 1, i + 1, i));
          edgeArr.push(new Edge(i - 1, i + 1, i, i + 1, i));
          break;
      }
    }

    console.log(vertexArr, edgeArr);
  };

  produceLightpathsOptimal = () => {
    const { vertexCount, vertexArr, edgeArr, lightpathArr } = this.state;
    const optimalCirclesNum = rand(2, 7);

    let optimalCirclesArr = new Array(optimalCirclesNum);


    for (let i = 0; i < optimalCirclesNum; i++) {
      optimalCirclesArr[i] = randN(vertexArr)

    }
    // lightpathArr.push()

    // let temp = createLightpaths(optimalCirclesArr, vertexArr);

    // console.log(temp);
    lightpathArr.push(...createLightpaths(optimalCirclesArr, vertexArr))
    console.log(lightpathArr);
    getSVG(optimalCirclesArr, vertexArr.length)
    f([vertexArr],lightpathArr,vertexArr.length)



  }

  simulate = () => {
    this.produceGraph();
    this.produceLightpathsOptimal();
    
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
          <div className='svgpainter'>

          </div>
          <div className='svgpainter2' style={{width : '1000px', height:'1000px;'}}>

          </div>

        </div>
        <div className="row-md-12 mt-5"> <Link to="/" className="generalButton">  Go Home </Link></div>
      </div>
    );
  }
}

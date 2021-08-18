import React, { Component } from "react";
import { Link } from "react-router-dom";
import Vertex from "../Structures/Vertex";
import Edge from "../Structures/Edge";

import { rand, randN, createLightpaths } from "../Structures/helpFunc.js";
import { getSVG, f1, shuffle } from "./Circles";

import "../App.css";

export default class Ring extends Component {
  constructor() {
    super();
    this.state = {
      vertexCount: 0,
      vertexArr: [],
      edgeArr: [],
      lightpathArr: [],
      LParr: [],
      lpCNT: 0,
      showOffline: false,
      showOnline: false,
      lpOnlineCNT: 0,
      showLpOnlineCNT: false,
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
    const {
      vertexArr,
      edgeArr,
      lightpathArr,
      LParr,
      lpOnlineCNT,
    } = this.state;
    const optimalCirclesNum = rand(2, 7);

    let optimalCirclesArr = new Array(optimalCirclesNum);

    for (let i = 0; i < optimalCirclesNum; i++) {
      optimalCirclesArr[i] = randN(vertexArr);
    }

    lightpathArr.push(...createLightpaths(optimalCirclesArr, vertexArr));
    console.log(lightpathArr);

    optimalCirclesArr.unshift(vertexArr);

    getSVG(optimalCirclesArr, vertexArr.length);
    LParr.push(...shuffle(lightpathArr));
    console.log(LParr);
    this.setState({
      lpOnlineCNT:
        lpOnlineCNT + f1([vertexArr], LParr, vertexArr.length, edgeArr.length),
    });
  };

  appear = () => {
    const { LParr, lpCNT } = this.state;
    console.log(lpCNT);
    let paths = document.querySelectorAll(`.p${lpCNT}`);
    if (lpCNT >= LParr.length) {
      this.setState({ showLpOnlineCNT: true });
    } else {
      for (var j = 0; j < LParr[lpCNT].passing_edges.length; j++) {
        paths[j].removeAttribute("display");
      }
    }
    paths = document.querySelectorAll(`.p${lpCNT}999`);

    if (lpCNT >= LParr.length) {
      this.setState({ showLpOnlineCNT: true });
    } else {
      for (var i = 0; i < paths.length; i++) {
        paths[i].removeAttribute("display");
      }
    }
    this.setState({ lpCNT: this.state.lpCNT + 1 });
  };

  simulate = () => {
    this.setState({ showOffline: true, showOnline: true });
    this.produceGraph();
    this.produceLightpathsOptimal();
  };

  reset = () => {
    
    this.setState({
      vertexArr : [],
edgeArr : [],
lightpathArr : [],
LParr : [],
      lpOnlineCNT: 0,
      lpCNT: 0,
      showOffline: false,
      showOnline: false,
      vertexCount: 0,
      showLpOnlineCNT: false,
    });
    document.querySelector(".svgpainter").innerHTML = "";
    document.querySelector(".svgpainter3").innerHTML = "";
  };

  render() {
    return (
      <div className="container">
        <h1>How Many Nodes would you like to test the algorithm on? (Ring)</h1>
        <div className="tc">
          <input
            type="text"
            placeholder="Number of Nodes"
            width="40%"
            style={{ borderRadius: "10px" }}
            onBlur={this.loadState}
            className="pa1 ma2 ba b--light-blue "
          />

          <div>
            <Link to="/" className="generalButton">
              {" "}
              Go Home{" "}
            </Link>
            <button className="generalButton" onClick={this.simulate}>
              Simulate
            </button>
            <button className="generalButton" onClick={this.appear}>
              Step Over
            </button>
            <button className="generalButton" onClick={this.reset}>
              Reset
            </button>
          </div>
        </div>

        <div className="tc">
          {this.state.showLpOnlineCNT ? (
            <h3>
              The C-Ratio in this Simulation is :{" "}
              {(this.state.lpOnlineCNT / this.state.LParr.length).toFixed(2)}
            </h3>
          ) : null}
        </div>
        <div className="container2">
          <div
            className="tc "
            style={{ display: this.state.showOffline ? null : "none" }}
          >
            <h3>
              Optimal Solution <br /> Total ADMs: {this.state.LParr.length}
            </h3>
            <div className="tc svgpainter "></div>
          </div>

          <div
            className="tc "
            style={{ display: this.state.showOnline ? null : "none" }}
          >
            <h3>
              OnLine minADM Solution <br />
              Total ADMs:
              {this.state.showLpOnlineCNT ? this.state.lpOnlineCNT : null}
            </h3>
            <h4>
              {this.state.showOnline
                ? this.state.LParr[this.state.lpCNT] !== undefined
                  ? "Next Lightpath start is : " +
                    this.state.LParr[this.state.lpCNT].startVertex
                  : null
                : null}{" "}
              <br />{" "}
              {this.state.showOnline
                ? this.state.LParr[this.state.lpCNT] !== undefined
                  ? "end is : " + this.state.LParr[this.state.lpCNT].endVertex
                  : null
                : null}
            </h4>
            <div
              className="tc svgpainter3"
              style={{ transform: "all 1s ease-in-out" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

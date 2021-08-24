import React, { Component } from "react";
import { Link } from "react-router-dom";
import Vertex from "../Structures/Vertex";
import Edge from "../Structures/Edge";
import {
  rand,
  randN,
  createLightpathsLine,
} from "../Structures/helpFunc.js";
import {  shuffle } from "./Circles";
import { optimalLines, appendLP } from "./lines";
// import d3 from "d3";
import "../App.css";

export default class Line extends Component {
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
      levelsCNT: 0,
    };
  }

  produceGraph = () => {
    const { vertexCount, vertexArr, edgeArr } = this.state;

    for (let i = 0; i < vertexCount; i++) {
      switch (i) {
        case 0:
          vertexArr.push(new Vertex(null, i, null, i + 1, i));
          edgeArr.push(new Edge(null, i + 1, 0, i + 1, i));
          break;
        case vertexCount - 1:
          vertexArr.push(new Vertex(i - 1, null, i - 1, null, i));
          break;
        default:
          vertexArr.push(new Vertex(i - 1, i, i - 1, i + 1, i));
          edgeArr.push(new Edge(i, i + 1, i - 1, i + 1, i));
          break;
      }
    }
    console.log(vertexArr, edgeArr);
  };

  loadState = (event) => {
    this.setState({ vertexCount: event.target.value });
  };

  produceLightpaths = () => {
    const {
      vertexCount,
      vertexArr,
      
      lightpathArr,
      LParr,
    } = this.state;
    const optimalLinesNum = rand(2, 7);
    this.setState({ levelsCNT: optimalLinesNum });

    let optimalLinesArr = new Array(optimalLinesNum);
    const vertexArrLine = [...vertexArr];
    vertexArrLine.pop();
    vertexArrLine.shift();

    for (let i = 0; i < optimalLinesNum; i++) {
      optimalLinesArr[i] = randN(vertexArrLine);
      optimalLinesArr[i].unshift(vertexArr[0]);
      optimalLinesArr[i].push(vertexArr[vertexCount - 1]);
    }

    lightpathArr.push(...createLightpathsLine(optimalLinesArr, vertexArr));

    optimalLinesArr.unshift(vertexArr);

    optimalLines(optimalLinesArr, vertexArr.length);

    LParr.push(...shuffle(lightpathArr));

    this.setState({
      lpOnlineCNT:
        this.state.lpOnlineCNT +
        LParr.length +
        appendLP(vertexArr, LParr, vertexArr.length),
    });

    // lightpathArr.push(...createLightpaths(optimalLinesArr, vertexArr))

    // optimalLinesArr.unshift(vertexArr)
    // getSVG(optimalLinesArr, vertexArr.length)

    // LParr.push(...shuffle(lightpathArr))
    // this.setState({ lpOnlineCNT: lpOnlineCNT + f1([vertexArr], LParr, vertexArr.length, edgeArr.length) })
  };
 
  completeRun = () => {
    // while(!this.state.showLpOnlineCNT) (this.appear());
    console.log('test');
  }

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
    this.produceLightpaths();
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
      levelsCNT: 0,
    });
    document.querySelector("input").value = "";
    document.querySelector(".svgpainter").innerHTML = "";
    document.querySelector(".svgpainter2").innerHTML = "";
  };

  render() {
    return (
      <div className="container">
        <h1>How Many Nodes would you like to test the algorithm on? (Line)</h1>
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
            <button className="generalButton" onClick={this.completeRun}>
              Compelete Run
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
              {(
                this.state.lpOnlineCNT /
                (this.state.LParr.length + this.state.levelsCNT)
              ).toFixed(2)}
            </h3>
          ) : null}
        </div>
        <div className="container2">
          <div
            className=" tc"
            style={{ display: this.state.showOffline ? null : "none" }}
          >
            <h3>
              Optimal Solution <br /> Total ADMs:{" "}
              {this.state.LParr.length + this.state.levelsCNT}
            </h3>
            <div className="tc svgpainter container"></div>
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
              className="tc svgpainter2 container"
              style={{
                transform: "all 1s ease-in-out",
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

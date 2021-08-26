import React, { Component } from "react";
import { Link } from "react-router-dom";
import Vertex from "../Structures/Vertex";
import Edge from "../Structures/Edge";

import { rand, randN, createLightpaths } from "../Structures/helpFunc.js";
import { getSVG, f1, shuffle, onlineADMsnoDrawing} from "./Circles";

import "../App.css";

export default class Ring extends Component {
  constructor() {
    super();
    this.state = {
      vertexCount: 0,
      circlesCount: 0,
      vertexArr: [],
      edgeArr: [],
      lightpathArr: [],
      LParr: [],
      lpCNT: 0,
      showOffline: false,
      showOnline: false,
      lpOnlineCNT: 0,
      showLpOnlineCNT: false,
      showSimulateButton: false,
      showInputFields: true,
      showAVG: false,
      showAVGField: false,
      showAVGcRatioField: false,
      cAVGworstCase: 0,
      cAVG: 0,
    };
  }

  loadState = (event) => {
    if (this.state.circlesCount === 0 || this.state.vertexCount === 0) { this.setState({ showSimulateButton: false }) } else { this.setState({ showSimulateButton: true }) }
    if (event.target.placeholder === 'Nodes') {
      this.setState({ vertexCount: event.target.value });
    } else if (event.target.placeholder === 'Circles') {
      this.setState({ circlesCount: event.target.value });
    }
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
  };

  produceLightpathsOptimal = () => {
    const {
      circlesCount,
      vertexArr,
      edgeArr,
      lightpathArr,
      LParr,
      lpOnlineCNT,
    } = this.state;
    const optimalCirclesNum = parseInt(circlesCount, 10);

    let optimalCirclesArr = new Array(optimalCirclesNum);

    for (let i = 0; i < optimalCirclesNum; i++) {
      optimalCirclesArr[i] = randN(vertexArr);
    }

    lightpathArr.push(...createLightpaths(optimalCirclesArr, vertexArr));

    optimalCirclesArr.unshift(vertexArr);

    getSVG(optimalCirclesArr, vertexArr.length);
    LParr.push(...shuffle(lightpathArr));
    this.setState({
      lpOnlineCNT:
        lpOnlineCNT + f1([vertexArr], LParr, vertexArr.length, edgeArr.length),
    });
  };

  calcAVG = () => {
    this.setState({ showLpOnlineCNT: false, showAVGField: true, showOffline: false, showOnline: false, showAVG: false, })
  }


  stat = () => {
    const {
      vertexArr,
      lightpathArr,
      LParr,
      edgeArr
    } = this.state;

    let cRatioAVG = 0
    let max = 0

    for (let i = 0; i < document.querySelector('#AVG').value; i++) {
      let onlineADMsinthisRun = onlineADMsnoDrawing([vertexArr], shuffle(lightpathArr), vertexArr.length, edgeArr.length)
      let offlineADMsinthisRun = this.state.LParr.length

      cRatioAVG = cRatioAVG + (onlineADMsinthisRun / offlineADMsinthisRun)
      if ((onlineADMsinthisRun / offlineADMsinthisRun) > max) max = onlineADMsinthisRun / offlineADMsinthisRun;
    }
    this.setState({ cAVGworstCase: max.toFixed(2), showAVGcRatioField: true, cAVG: (cRatioAVG / document.querySelector('#AVG').value).toFixed(2) })


  }

  completeRun = () => {
    const { LParr } = this.state;
    let counter = 0;

    while (counter < LParr.length) {

      let paths = document.querySelectorAll(`.p${counter}`);

      for (let j = 0; j < LParr[counter].passing_edges.length; j++) {
        paths[j].removeAttribute("display");
      }
      let nodes = document.querySelectorAll(`.p${counter}999`);

      for (let i = 0; i < nodes.length; i++) {
        nodes[i].removeAttribute("display");
      }
      counter = counter + 1;

    }

    this.setState({ lpCNT: this.state.lpCNT + counter });
    this.setState({ showLpOnlineCNT: true });

  }

  showOptimalSolution = () => {

    document.querySelector('.svgpainter').querySelector('svg').attributes.display.value === 'none' ? document.querySelector('.svgpainter').querySelector('svg').attributes.display.value = '' : document.querySelector('.svgpainter').querySelector('svg').attributes.display.value = 'none'

  }

  showOnlineSolution = () => {
    document.querySelector('.svgpainter3').querySelector('svg').attributes.display.value === 'none' ? document.querySelector('.svgpainter3').querySelector('svg').attributes.display.value = '' : document.querySelector('.svgpainter3').querySelector('svg').attributes.display.value = 'none'

  }
  appear = () => {
    console.log();
    document.querySelector('.svgpainter').querySelector('svg').attributes.display.value = ''
    document.querySelector('.svgpainter3').querySelector('svg').attributes.display.value = ''
    // document.querySelector('.svgpainter').querySelector('svg').attributes.display.value = ''
    // document.querySelector('.svgpainter2').querySelector('svg').attributes.display.value = ''

    const { LParr, lpCNT } = this.state;
    let paths = document.querySelectorAll(`.p${lpCNT}`);
    if (lpCNT >= LParr.length) {
      this.setState({ showLpOnlineCNT: true });
    } else {
      for (let j = 0; j < LParr[lpCNT].passing_edges.length; j++) {
        paths[j].removeAttribute("display");
      }
    }
    paths = document.querySelectorAll(`.p${lpCNT}999`);

    if (lpCNT >= LParr.length) {
      this.setState({ showLpOnlineCNT: true });
    } else {
      for (let i = 0; i < paths.length; i++) {
        paths[i].removeAttribute("display");
      }
    }
    this.setState({ lpCNT: this.state.lpCNT + 1 });
  };

  simulate = () => {

    this.setState({ showOffline: true, showOnline: true, showSimulateButton: false, showInputFields: false, showAVG: true });
    this.produceGraph();
    this.produceLightpathsOptimal();

  };

  reset = () => {
    if (this.state.showInputFields) {
      document.querySelectorAll("input")[0].value = ""
      document.querySelectorAll("input")[1].value = ""
    }
    document.querySelector(".svgpainter").innerHTML = "";
    document.querySelector(".svgpainter3").innerHTML = "";

    this.setState({
      vertexArr: [],
      edgeArr: [],
      lightpathArr: [],
      LParr: [],
      circlesCount: 0,
      lpOnlineCNT: 0,
      lpCNT: 0,
      showOffline: false,
      showOnline: false,
      vertexCount: 0,
      showLpOnlineCNT: false,
      showSimulateButton: false,
      showInputFields: true,
      showAVG: false,
      showAVGField: false,
      showAVGcRatioField: false,
      cAVGworstCase: 0,
      cAVG: 0,

    });

  };

  render() {
    return (
      <div className="container">
        <h1>Ring Toplogy Simulation</h1>

        {this.state.showInputFields ? (<div className="tc" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <div>
            <p>Enter The Number Of Nodes</p>

            <input
              type="text"
              placeholder="Nodes"
              width="40%"
              style={{ borderRadius: "10px" }}
              onBlur={this.loadState}
              className="pa1 ma2 ba b--light-blue "
            />

          </div>
          <div>

            <p>Enter The Number Of Circles</p>
            <input
              type="text"
              placeholder="Circles"
              width="40%"
              style={{ borderRadius: "10px" }}
              onChange={this.loadState}
              className="pa1 ma2 ba b--light-blue "
            />
          </div>
        </div>) : null}
        {this.state.showAVGField ? <div className="tc" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <div>
            <p>Enter Number Of Desired runs for Average Calcs</p>
            <input
              id="AVG"
              type="text"
              placeholder="Runs"
              width="40%"
              style={{ borderRadius: "10px" }}
              className="pa1 ma2 ba b--light-blue "

            />
            <button className="generalButton" onClick={this.stat}>
              Calc Average
            </button>

          </div>
        </div> : null}
        <div>
          <Link to="/" className="generalButton">
            {" "}
            Go Home{" "}
          </Link>
          {!this.state.showSimulateButton ? null :
            <button className="generalButton" onClick={this.simulate}>
              Simulate
            </button>}

          {!this.state.showOffline ? null :
            <button className="generalButton" onClick={this.appear}>
              Step Over
            </button>
          }
          {!this.state.showOnline ? null :
            (<>
              <button className="generalButton" onClick={this.completeRun}>
                Compelete Run
              </button>
              <button className="generalButton" onClick={this.showOptimalSolution}>
                Optimal Solution
              </button>
              <button className="generalButton" onClick={this.showOnlineSolution}>
                Online Solution
              </button></>)
          }
          {this.state.showAVG ?
            <button className="generalButton" onClick={this.calcAVG}>
              Average
            </button> : null}
          <button className="generalButton" onClick={this.reset}>
            Reset
          </button>
        </div>

        <div className="tc">
          {this.state.showAVGcRatioField ? <div className="tc" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <h3>

              The Average C-Ratio for the desired number of runs is : {this.state.cAVG} <br />
              The Worst Case C-Ratio for the desired number of runs is : {this.state.cAVGworstCase}
            </h3>
          </div> : null}
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

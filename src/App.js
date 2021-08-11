import { Component } from "react";
import "./App.css";
import Ring from "./Components/Ring";
import Line from "./Components/Line";
class App extends Component {
  constructor() {
    super();
    this.state = {
      choice: "home",
    };
  }

  onChoice = (event) => {
    this.setState({ choice: event.target.value });
  };

  render() {
    const { choice } = this.state;
    switch (choice) {
      case "home": {
        return (
          <div className="container">
            <h1>
              Today we are going to present to you the span MinADM Algorithm and
              simulate it!
            </h1>
            <h3>Buckle Up!</h3>
            <p>
              We are going to present infront of you simulations on two
              topologies, Ring and Line Topology.
            </p>
            <div className="choices">
              <button
                className="generalButton"
                onClick={this.onChoice}
                value={"More Info"}
              >
                More Info
              </button>
              <button
                className="generalButton"
                onClick={this.onChoice}
                value={"Ring Topology"}
              >
                Ring Topology
              </button>
              <button
                className="generalButton"
                onClick={this.onChoice}
                value={"Line Topology"}
              >
                Line Topology
              </button>
            </div>
            <h4 style={{ alignSelf: "center" }}>
              This Project is Brought to you by Amir & Fida
            </h4>
            <h4>Supervised By Prof. Shmuel</h4>
          </div>
        );
      }

      case "More Info": {
        return (
          <div className="container">
            <h1>More Info Is Here Bitch</h1>
            <button
              className="generalButton"
              onClick={this.onChoice}
              value={"home"}
            >
              Go Home
            </button>
          </div>
        );
      }

      case "Line Topology": {
        return (
          <div className="container">
            <Line />
            <button
              className="generalButton"
              onClick={this.onChoice}
              value={"home"}
            >
              Go Home
            </button>
          </div>
        );
      }

      case "Ring Topology": {
        return (
          <div className="container">
            <Ring />
            <button
              className="generalButton"
              onClick={this.onChoice}
              value={"home"}
            >
              Go Home
            </button>
          </div>
        );
      }

      default:
        return <h1>OOoops Something went wrong!</h1>;
    }
  }
}
export default App;

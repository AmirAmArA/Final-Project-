import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div className="container tc pa4">
        <h1>
          Today we are going to present to you the MinADM Algorithm and
          simulate it!
        </h1>
        <h3>Buckle Up!</h3>
        <p>
          We are going to present infront of you simulations on two
          topologies, Ring and Line Topology.
        </p>
        <div>
          <Link to="/Ring" className="generalButton"> Ring Topology</Link>

          <Link to="/Line" className="generalButton"> Line Topology</Link>
        </div>
        <h4 style={{ alignSelf: "center" }}>
          This Project is Brought to you by Amir & Fida
        </h4>
        <h4>Supervised By Prof. Shmuel</h4>
      </div>
    )
  }
}

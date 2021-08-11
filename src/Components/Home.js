import React, { Component, Container, Row, Col } from 'react'
import { Link } from "react-router-dom";
export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <div>
          <Link to="/" className="generalButton"> More Info</Link>

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

import React from "react";
import Pic from "./assets/me.jpeg"
const imgCss = {
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  width: "50%"
}
export default class Loading extends React.Component {
  render() {
    return (
        <div className="row justify-content-center">
          <div className="col ml-3 mt-3">
            {/* <img src={Pic} alt="Paris" className="center" style={imgCss}></img> */}
          </div>
        </div>
    );
  }
}

import React from "react";
import "../styles/Panel.scss";

export default function Conditions(props) {
  return (
    <div className="dropdown">
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          listStyle: "none",
        }}
      >
        <li onClick={props.handleChange}>bleached</li>
        {/* <li onClick={props.handleChange}>permed</li> */}
        <li onClick={props.handleChange}>color-treated-highlights</li>
        <li onClick={props.handleChange}>chemically-treated</li>
        <li onClick={props.handleChange}>chemically-straightened</li>
        <li onClick={props.handleChange}>split-ends</li>
        <li onClick={props.handleChange}>frequent-heat-styling-tools</li>
        <li onClick={props.handleChange}>none</li>
        
        <br />
      </ul>
    </div>
  );
}

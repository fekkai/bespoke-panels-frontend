import React from "react";
import "../styles/Panel.scss";

export default function Conditions(props) {
  return (
    <div class="dropdown">
      <ul
        // onClick={console.log('asdf')}
        style={{
          display: "flex",
          flexDirection: "column",
          listStyle: "none",
          columns: 2
        }}
      >
        <li onClick={props.handleChange}>bleached</li>
        <li onClick={props.handleChange}>permed</li>
        <li onClick={props.handleChange}>color-treated</li>
        <li onClick={props.handleChange}>highlights</li>
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

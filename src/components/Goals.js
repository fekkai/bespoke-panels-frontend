import React from "react";
import "../styles/Panel.scss";

export default function Goals(props) {
  return (
    <div className="dropdown">
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          listStyle: "none"
        }}
      >
        <li onClick={props.handleChange}>color-protect</li>
        <li onClick={props.handleChange}>uv-protect</li>
        <li onClick={props.handleChange}>damage-repair</li>
        <li onClick={props.handleChange}>frizz-control</li>
        <li onClick={props.handleChange}>smoothing</li>
        <li onClick={props.handleChange}>healthy-shine</li>
        <li onClick={props.handleChange}>hydrate</li>
        <li onClick={props.handleChange}>hair-loss-prevention</li>
        <li onClick={props.handleChange}>volumizing </li>
      </ul>
    </div>
  );
}

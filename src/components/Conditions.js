import React from "react";
import "../styles/Panel.scss";

export default function Conditions(props) {
  return (
    <div className="dropdown">
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          listStyle: "none"
        }}
      >
        <li key="bleached" onClick={props.handleChange}>
          bleached
        </li>
        {/* <li onClick={props.handleChange}>permed</li> */}
        <li key="color-treated-highlights" onClick={props.handleChange}>
          color-treated-highlights
        </li>
        <li key="chemically-treated" onClick={props.handleChange}>
          chemically-treated
        </li>
        <li key="chemically-straightened" onClick={props.handleChange}>
          chemically-straightened
        </li>
        <li key="split-ends" onClick={props.handleChange}>
          split-ends
        </li>
        <li key="frequent-heat-styling-tools" onClick={props.handleChange}>
          frequent-heat-styling-tools
        </li>
        <li key="none" onClick={props.handleChange}>
          none
        </li>

        <br />
      </ul>
    </div>
  );
}

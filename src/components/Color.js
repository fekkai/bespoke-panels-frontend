import React from "react";
import "../styles/Panel.scss";

export default function Color(props) {
  return (
    <div className="dropdown">
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          listStyle: "none"
        }}
      >
        <li key="blonde" onClick={props.handleChange}>
          blonde
        </li>
        <li key="brown" onClick={props.handleChange}>
          brown
        </li>
        <li key="black" onClick={props.handleChange}>
          black
        </li>
        <li key="red" onClick={props.handleChange}>
          red
        </li>
        <li key="silver" onClick={props.handleChange}>
          silver
        </li>
        <br />
      </ul>
    </div>
  );
}

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
        <li key="highlights" onClick={props.handleChange}>
          highlights
        </li>
        <li key="color_treated" onClick={props.handleChange}>
          color_treated
        </li>
        <li key="chemically_treated" onClick={props.handleChange}>
          chemically_treated
        </li>
        <li key="chemically_straightened" onClick={props.handleChange}>
          chemically_straightened
        </li>
        <li key="split_ends" onClick={props.handleChange}>
          split_ends
        </li>
        <li key="frequent_heat_styling" onClick={props.handleChange}>
          frequent_heat_styling
        </li>
        <li key="none" onClick={props.handleChange}>
          none
        </li>

        <br />
      </ul>
    </div>
  );
}

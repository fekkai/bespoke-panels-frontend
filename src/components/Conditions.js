import React from "react";
import "../styles/Panel.scss";

export default function Conditions(props) {
  return (
    <div class="dropdown">
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          listStyle: "none",
          columns: 2
        }}
      >
        <li>
          <input
            type="checkbox"
            name="bleached"
            value="bleached"
            onChange={props.handleChange}
          />
          bleached
        </li>
        <li>
          <input
            type="checkbox"
            name="permed"
            value="permed"
            onChange={props.handleChange}
          />
          permed
        </li>
        <li>
          {" "}
          <input
            type="checkbox"
            name="color-treated"
            value="color-treated"
            onChange={props.handleChange}
          />
          color-treated
        </li>
        <li>
          {" "}
          <input
            type="checkbox"
            name="highlights"
            value="highlights"
            onChange={props.handleChange}
          />
          highlights
        </li>
        <li>
          {" "}
          <input
            type="checkbox"
            name="chemically-treated"
            value="chemically-treated"
            onChange={props.handleChange}
          />
          chemically-treated
        </li>
        <li>
          {" "}
          <input
            type="checkbox"
            name="chemically-straightened"
            value="chemically-straightened"
            onChange={props.handleChange}
          />
          chemically-straightened
        </li>
        <li>
          {" "}
          <input
            type="checkbox"
            name="split-ends"
            value="split-ends"
            onChange={props.handleChange}
          />
          split-ends
        </li>
        <li>
          {" "}
          <input
            type="checkbox"
            name="frequent-heat-styling-tools"
            value="frequent-heat-styling-tools"
            onChange={props.handleChange}
          />
          frequent-heat-styling-tools
        </li>
        <li>
          {" "}
          <input
            type="checkbox"
            name="none"
            value="none"
            onChange={props.handleChange}
          />
          none
        </li>
        <br />
      </ul>
    </div>
  );
}

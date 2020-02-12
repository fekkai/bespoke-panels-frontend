import React from "react";
import "../styles/Panel.scss";

export default function Goals(props) {
  return (
    <div class="dropdown">
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          listStyle: "none"
        }}
      >
        <li>
          <input
            type="checkbox"
            name="color-protect"
            value="color-protect"
            onChange={props.handleChange}
          />
          color-protect
        </li>
        <li>
          <input
            type="checkbox"
            name="uv-protect"
            value="uv-protect"
            onChange={props.handleChange}
          />
          uv-protect
        </li>
        <li>
          <input
            type="checkbox"
            name="damage-repair"
            value="damage-repair"
            onChange={props.handleChange}
          />
          damage-repair
        </li>
        <li>
          <input
            type="checkbox"
            name="frizz-control"
            value="frizz-control"
            onChange={props.handleChange}
          />
          frizz-control
        </li>
        <li>
          <input
            type="checkbox"
            name="smoothing"
            value="smoothing"
            onChange={props.handleChange}
          />
          smoothing
        </li>
        <li>
          <input
            type="checkbox"
            name="healthy-shine"
            value="healthy-shine"
            onChange={props.handleChange}
          />
          healthy-shine
        </li>
        <li>
          <input
            type="checkbox"
            name="hydrate"
            value="hydrate"
            onChange={props.handleChange}
          />
          hydrate
        </li>
        <li>
          <input
            type="checkbox"
            name="hair-loss-prevention"
            value="hair-loss-prevention"
            onChange={props.handleChange}
          />
          hair-loss-prevention
        </li>
        <li>
          <input
            type="checkbox"
            name="volumizing"
            value="volumizing"
            onChange={props.handleChange}
          />
          volumizing{" "}
        </li>
      </ul>
    </div>
  );
}

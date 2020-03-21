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
        <li key="color_protect" onClick={props.handleChange}>
          color_protect
        </li>
        <li key="uv_protect" onClick={props.handleChange}>
          uv_protect
        </li>
        <li key="damage_repair" onClick={props.handleChange}>
          damage_repair
        </li>
        <li key="frizz_control" onClick={props.handleChange}>
          frizz_control
        </li>
        <li key="smoothing" onClick={props.handleChange}>
          smoothing
        </li>
        <li key="healthy_shine" onClick={props.handleChange}>
          healthy_shine
        </li>
        <li key="hydrate" onClick={props.handleChange}>
          hydrate
        </li>
        <li key="hair_loss_prevention" onClick={props.handleChange}>
          hair_loss_prevention
        </li>
        <li key="volumizing" onClick={props.handleChange}>
          volumizing
        </li>
      </ul>
    </div>
  );
}

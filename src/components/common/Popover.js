import React from "react";
import BarGraph from "../BarGraph";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import Fade from "react-reveal/Fade";
import "../../styles/Panel.scss";

export default function PopoverComponent(props) {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3"></Popover.Title>
      <div style={{ border: ".5px solid black", background: "white" }}>
        <Fade style={{ marginLeft: "5px" }}>
          <Popover.Content style={{ width: "65vw" }}>
            <h3 style={{ fontFamily: "urwdin-regular" }}>{props.title}</h3>
            <BarGraph styles={props.styles} data={props.data} />
          </Popover.Content>
        </Fade>
      </div>
    </Popover>
  );
  return (
    <div style={{ margin: "0 10px" }}>
      <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
        <button style={{ width: "100%" }} id="list-view-btn" variant="success">
          {props.title}
        </button>
      </OverlayTrigger>
    </div>
  );
}

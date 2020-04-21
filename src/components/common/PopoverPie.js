import React from "react";
import PieGraph from "./PieGraph";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Fade from "react-reveal/Fade";
import "../../styles/Panel.scss";

export default function PopoverPie(props) {
  const bargraph = (
    <Popover style={{ width: "55vw" }} id="popover-basic">
      <Popover.Title as="h3"></Popover.Title>
      <div style={{ border: ".5px solid black", background: "white" }}>
        <Fade style={{ marginLeft: "5px" }}>
          <Popover.Content >
            <h3 style={{ fontFamily: "urwdin-regular" }}>{props.title}</h3>
            <PieGraph data={props.data} />
          </Popover.Content>
        </Fade>
      </div>
    </Popover>
  );
  return (
    <div style={{ margin: "0 10px" }}>
      <OverlayTrigger trigger="focus" placement="bottom" overlay={bargraph}>
        <button style={{ width: "100%" }} id="list-view-btn" variant="success">
          {props.title}
        </button>
      </OverlayTrigger>
    </div>
  );
}

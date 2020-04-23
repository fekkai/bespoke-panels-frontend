import React from "react";
import { VictoryPie } from "victory";

export default function PieGraph(props) {
  const yellow200 = "#FFF59D";
  const deepOrange600 = "#F4511E";
  const lime300 = "#DCE775";
  const lightGreen500 = "#8BC34A";
  const teal700 = "#00796B";
  const cyan900 = "#006064";
  const colors = [
    deepOrange600,
    yellow200,
    lime300,
    lightGreen500,
    teal700,
    cyan900
  ];
  return (
    <VictoryPie
      labelRadius={({ innerRadius }) => innerRadius + 55}
      colorScale={colors}
      style={{ labels: { fill: "black", fontSize: 3 } }}
      data={props.data}
      width={200}
      height={185}
    />
  );
}
import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

export default function BarGraph(props) {
  return (
    <div>
      <VictoryChart domainPadding={20}>
        <VictoryAxis style={props.styles.axisOne} />
        <VictoryAxis style={props.styles.axisTwo} dependentAxis />
        <VictoryBar
        //   theme={VictoryTheme.material}
          data={props.data}
          x="answer"
          y="count"
        />
      </VictoryChart>
    </div>
  );
}

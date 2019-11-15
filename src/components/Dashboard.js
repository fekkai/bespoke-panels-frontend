import React from "react";
import Tabs from "../components/Tabs";
import '../styles/Dashboard.scss'

function Dashboard(props) {
  const { user } = props;
  return (
    <div className='dashboard'>
      <h1>{`Welcome back ${user.name}`}</h1>
      <Tabs>
        <div label="Styling/Formulation">List of formulas</div>
        <div label="Fulfillment">Fulfilled/Unfulfilled</div>
        <div label="Customer Order">List of customer orders </div>
      </Tabs>
    </div>
  );
}
export default Dashboard;

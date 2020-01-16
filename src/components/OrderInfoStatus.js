// import React, { Component } from "react";
// import { Container } from "./common";
// import dummyData from "../services/dummydata";

// export default class OrderInfoStatus extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       dummyData
//     };
//   }

//   componentDidMount() {
//     this.fetchUsers();
//   }

//   fetchUsers() {
//     const data = this.state.dummyData[0];
//     // console.log(data);
//     this.setState({
//       name: data.name,
//       address: data.address,
//       email: data.email,
//       mobile: data.mobile,
//       orderData: data.order_date,
//       quizResults: data.quiz_results,
//       formula: data.formula,
//       checkout: data.checkout,
//       Oauth: data.Oauth
//     });
//   }

//   render() {
//     const {
//       name,
//       address,
//       email,
//       mobile,
//       order,
//       orderData,
//       quizResults,
//       formula,
//       checkout,
//       Oauth
//     } = this.state;
//     return (
//       <Container classname="section-1">
//         <div className="column">
//           <h3 className="column-name">CONTACT</h3>
//           <ul className="list">
//             <li key={name}>NAME: {name}</li>
//             <li key={address}>ADDRESS: {address}</li>
//             <li key={email}>EMAIL: {email}</li>
//             <li key={mobile}>MOBILE: {mobile}</li>
//           </ul>
//         </div>
//         <div className="column">
//           <h3 className="column-name">ORDER</h3>
//           <ul className="list">
//             <li key={orderData}>ORDER NO.: {orderData}</li>
//             <li>ORDERED: {order} </li>
//             <li>TYPE: </li>
//           </ul>
//         </div>
//         <div className="column">
//           <h3 className="column-name">STATUS</h3>
//           <ul className="list">
//             <li>PHASE:</li>
//             <li>INVENTORY: </li>
//             <li>LINE:</li>
//             <li>FLAG:</li>
//           </ul>
//         </div>
//       </Container>
//     );
//   }
// }

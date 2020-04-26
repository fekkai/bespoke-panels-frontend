// import React from 'react'

// export default function DailyData() {
//     return (
//              <div className="quiz-data-row">
//                 <div className="quiz-data-column">
//                   <b>{today.toDateString()}</b>
//                 </div>
//               </div>
//               <div className="quiz-data-row">
//                 <div className="quiz-data-column">QUIZ COUNT:</div>
//                 <div className="quiz-data-column">
//                   {shopifyLoading ? <ClipLoader size={6} /> : quizToday}
//                   {/* {console.log(quizToday)} */}
//                 </div>{" "}
//               </div>
//               <div className="quiz-data-row">
//                 <div className="quiz-data-column">COMPLETE:</div>{" "}
//                 <div className="quiz-data-column">
//                   {shopifyLoading ? (
//                     <ClipLoader size={6} />
//                   ) : (
//                     completeQuizToday +
//                     "(" +
//                     ((completeQuizToday / quizToday) * 100).toFixed(2) +
//                     "%)"
//                   )}{" "}
//                 </div>
//               </div>
//               <div className="quiz-data-row">
//                 <div className="quiz-data-column">ABANDONED:</div>{" "}
//                 <div className="quiz-data-column">
//                   {shopifyLoading ? (
//                     <ClipLoader size={6} />
//                   ) : (
//                     abandonedQuizToday +
//                     "(" +
//                     ((abandonedQuizToday / quizToday) * 100).toFixed(2) +
//                     "%)"
//                   )}{" "}
//                 </div>
//               </div>
//               <div className="quiz-data-row">
//                 <div className="quiz-data-column">
//                   COMPLETED QUIZ CONVERSION:{" "}
//                 </div>
//                 <div className="quiz-data-column">
//                   {" "}
//                   {shopifyLoading ? (
//                     <ClipLoader size={6} />
//                   ) : (
//                     ((orderCountToday / completeQuizToday) * 100).toFixed(2) +
//                     "%"
//                   )}{" "}
//                 </div>
//               </div>
//               <div className="quiz-data-row">
//                 <div className="quiz-data-column"> ORDER COUNT:</div>{" "}
//                 <div className="quiz-data-column">
//                   {shopifyLoading ? <ClipLoader size={6} /> : orderCountToday}
//                 </div>
//               </div>
//               {/* <br /> */}
//               {/* TOTAL QUIZ CONVERSION:{" "}
//           {((orderCountToday / quizToday) * 100).toFixed(2) + "%"}{" "}
//           {/* {orderCountToday} */}
//               <div className="quiz-data-row">
//                 <div className="quiz-data-column"> TOTAL SALES:</div>{" "}
//                 <div className="quiz-data-column">
//                   {" "}
//                   {shopifyLoading ? (
//                     <ClipLoader size={6} />
//                   ) : (
//                     parseFloat(totalSalesToday).toFixed(2)
//                   )}
//                 </div>
//               </div>
//               <div className="quiz-data-row">
//                 <div className="button-column">
//                   {" "}
//                   {!shopifyLoading ? (
//                     <Link
//                       to={{
//                         pathname: "/orders",
//                         state: {
//                           ordersToday: ordersToday
//                         }
//                       }}
//                     >
//                       <button id="list-view-btn">ORDERS</button>
//                     </Link>
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               </div>
//     )
// }

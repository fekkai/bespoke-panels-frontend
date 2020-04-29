import React from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function DailyData(props) {
  const today = new Date();

  return (
    <div>
      <div className="quiz-data-row">
        {/* <div className="quiz-data-column">LAUNCH 03-20-20</div> */}
      </div>
      {/* {new Date().toString()} */}
      <div className="quiz-data-row">
        <div className="quiz-data-column">
          <b>
            {props.date === "today"
              ? "TODAY -" +
                " " +
                (new Date().getMonth() + 1).toString() +
                "/" +
                new Date().getDate().toString() +
                "/" +
                new Date().getFullYear().toString()
              : (new Date().getMonth() + 1).toString() +
                "/" +
                (new Date().getDate() - 1).toString() +
                "/" +
                new Date().getFullYear().toString()}
          </b>
        </div>
      </div>
      <div className="quiz-data-row">
        <div className="quiz-data-column">QUIZ COUNT:</div>
        <div className="quiz-data-column">
          {props.shopifyLoading ? <ClipLoader size={6} /> : props.quizCount}
          {/* {console.log(quizCount)} */}
        </div>{" "}
      </div>
      <div className="quiz-data-row">
        <div className="quiz-data-column">COMPLETED:</div>{" "}
        <div className="quiz-data-column">
          {props.shopifyLoading ? (
            <ClipLoader size={6} />
          ) : (
            props.completeQuizCount +
            "(" +
            ((props.completeQuizCount / props.quizCount) * 100).toFixed(2) +
            "%)"
          )}{" "}
        </div>
      </div>
      <div className="quiz-data-row">
        <div className="quiz-data-column">DROPPED:</div>{" "}
        <div className="quiz-data-column">
          {props.shopifyLoading ? (
            <ClipLoader size={6} />
          ) : (
            props.abandonedQuizCount +
            "(" +
            ((props.abandonedQuizCount / props.quizCount) * 100).toFixed(2) +
            "%)"
          )}{" "}
        </div>
      </div>
      <div className="quiz-data-row">
        <div className="quiz-data-column">COMPLETED QUIZ CONVERSION: </div>
        <div className="quiz-data-column">
          {" "}
          {props.shopifyLoading ? (
            <ClipLoader size={6} />
          ) : (
            ((props.orderCount / props.completeQuizCount) * 100).toFixed(2) +
            "%"
          )}{" "}
        </div>
      </div>
      <div className="quiz-data-row">
        <div className="quiz-data-column"> ORDER COUNT:</div>{" "}
        <div className="quiz-data-column">
          {props.shopifyLoading ? <ClipLoader size={6} /> : props.orderCount}
        </div>
      </div>
      {/* <br /> */}
      {/* TOTAL QUIZ CONVERSION:{" "}
              {((orderCount / quizCount) * 100).toFixed(2) + "%"}{" "}
             {/* {orderCount} */}
      <div className="quiz-data-row">
        <div className="quiz-data-column"> TOTAL SALES:</div>{" "}
        <div className="quiz-data-column">
          {" "}
          {props.shopifyLoading ? (
            <ClipLoader size={6} />
          ) : (
            parseFloat(props.totalSales).toFixed(2)
          )}
        </div>
      </div>
      <div className="quiz-data-row">
        <div className="button-column">
          {" "}
          {!props.shopifyLoading ? (
            <Link
              to={{
                pathname: "/orders",
                state: {
                  orders: props.orders
                }
              }}
            >
              <button id="list-view-btn">ORDERS</button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

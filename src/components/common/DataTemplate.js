import React from "react";
import { ClipLoader } from "react-spinners";
import "../../styles/Table.scss";

export default function DataTemplate(props) {
  return (
    <div>
      <br />
      <span>
        {Object.keys(props.data).map(e => {
          return (
            <div className="quiz-data-row">
              <div className="quiz-data-column">{e}:</div>
              <div className="quiz-data-column">
                {!localStorage.getItem(props.storageItem) ? 
                (
                  // props.loading ? (
                    <ClipLoader size={6} />
                  // ) : e !== "KLAVIYO EMAILS CAPTURED" ||
                  //   e !== "TOTAL QUIZ COUNT" ||
                  //   e !== "COMPLETE" ||
                  //   e !== "DROPPED" ? (
                  //   props.data[e] + `${props.data[e] / props.data["DROPPED"]}`
                  ) : (
                    props.data[e]
                  // )
                // ) : (
                //   props.data[e]
                )
                }{" "}
              </div>
            </div>
          );
        })}
      </span>
    </div>
  );
}

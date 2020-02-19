import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";



import { makeStyles } from "@material-ui/core/styles";
import "../../styles/Row.scss";

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
    padding: 0
  },
  title: {
    fontSize: 15,
    color: `#000000`,
    fontFamily: "urwdin-regular",
    padding: 0
  },
  pos: {
    marginBottom: 12
  }
});

//convert function - readable date format
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export const Row = ({
  date,
  dueDate,
  name,
  email,
  locale,
  thickness,
  texture,
  condition,
  hairGoals,
  frontSelfie
}) => {
  dueDate = new Date(date)
    .addDays(2)
    .toLocaleString("en-US", { timeZone: "America/New_York" })
    .split(",")[0];

  const classes = useStyles();

  // hover img zoom
  // const modal = $("#modal");
  // $(function() {
  //   var currentMousePos = { x: -1, y: -1 };
  //   $(document).mousemove(function(event) {
  //     currentMousePos.x = event.pageX;
  //     currentMousePos.y = event.pageY;
  //     if ($("#modal").css("display") != "none") {
  //       $("#modal").css({
  //         top: currentMousePos.y - 100,
  //         left: currentMousePos.x + 50
  //       });
  //     }
  //   });
  //   $(".image").on("mouseover", function() {
  //     var image = $(this).find("img");
  //     var modal = $("#modal");
  //     $(modal).html(image.clone());
  //     $(modal).css({
  //       top: currentMousePos.y,
  //       left: currentMousePos.x + 12
  //     });
  //     $(modal).show();
  //   });
  //   $(".image").on("mouseleave", function() {
  //     $(modal).hide();
  //   });
  // });

  return (
    <div>
      <Card
        // className={classes.card}
        style={{
          overflowX: "hidden",
          overflowY: "auto",
          marginBottom: `${5}px`
        }}
      >
        <div className="card-content">
          <div className="locale-name" color="textSecondary">
            {new Date(locale).toLocaleString("en-US", {
              timeZone: "America/New_York"
            })}
          </div>
          <div className="locale-name" color="textSecondary">
            {name ? name : "n/a"}
          </div>
          <div className="image">
            {frontSelfie ? (
              <img id="selfie" alt={frontSelfie} src={frontSelfie} />
            ) : (
              "n/a"
            )}
            <div id="modal"></div>
          </div>
          <div
            className="user-attributes"
            style={{
              flex: 0.8
            }}
            color="textSecondary"
          >
            {" "}
            {/* {thickness
              ? thickness === 1
                ? "finest"
                : "" || thickness === 2
                ? "finer"
                : "" || thickness === 3
                ? "fine"
                : "" || thickness === 4
                ? "medium"
                : "" || thickness === 5
                ? "thick"
                : "" || thickness === 6
                ? "thicker"
                : "" || thickness === 7
                ? "thickest"
                : ""
              : ""}
               */}
            {!thickness ? "n/a" : thickness}
          </div>
          <div
            className="user-attributes"
            style={{
              flex: 0.6
            }}
            color="textSecondary"
          >
            {texture
              ? texture === 1
                ? "straight"
                : "" || texture === 2
                ? "wavy"
                : "" || texture === 3
                ? "curly"
                : "" || texture === 4
                ? "coily"
                : ""
              : "n/a"}
          </div>
          <div
            className="user-attributes"
            style={{
              flex: 1,
              lineHeight: "24px"
            }}
            color="textSecondary"
          >
            {!condition
              ? "n/a"
              : condition === "none"
              ? "none"
              : condition.map(e => {
                  return (
                    <div key={e}>
                      {e} <br />
                    </div>
                  );
                })}
          </div>
          <div
            className="user-attributes"
            style={{
              flex: 1,
              lineHeight: "24px"
            }}
            color="textSecondary"
          >
            {!hairGoals ? "n/a" : hairGoals ? hairGoals.join(", ") : ""}
          </div>

          <br />
          {/* {shampooSkeletonKey
              ? shampooSkeletonKey === "volume1"
                ? "Full Blown (Lightest Weight)"
                : "" || shampooSkeletonKey === "colorprotect1"
                ? "Technician Color (Medium Moisture)"
                : "" || shampooSkeletonKey === "moisture1"
                ? "Brilliant Shine (Medium Moisture)"
                : "" || shampooSkeletonKey === "repair1"
                ? "Super Strength (Strong Moisture)"
                : "" || shampooSkeletonKey === "smooth1"
                ? "Smoothing 'Essential Shea' (Heavy)"
                : ""
              : "" + " "} */}
          {/* <Typography
            style={{
              width: `${20}%`
            }}
            className={classes.title}
            color="textSecondary"
          >
            {" "}
            {status}
            <br />
          </Typography> */}
        </div>
      </Card>
    </div>
  );
};

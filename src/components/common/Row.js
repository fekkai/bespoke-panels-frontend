import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import $ from "jquery";
import Typography from "@material-ui/core/Typography";
import ReactImageMagnify from "react-image-magnify";

import { makeStyles } from "@material-ui/core/styles";
import "../../styles/Row.scss";

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 15,
    color: `#000000`,
    fontFamily: "urwdin-regular"
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
  orderId,
  userCode,
  customerName,
  locale,
  thickness,
  texture,
  condition,
  hairGoals,
  frontSelfie,
  shampooSkeletonKey,
  shampooFormula
}) => {
  dueDate = new Date(date)
    .addDays(2)
    .toLocaleString("en-US", { timeZone: "America/New_York" })
    .split(",")[0];

  const classes = useStyles();

  const modal = $("#modal");
  $(function() {
    var currentMousePos = { x: -1, y: -1 };
    $(document).mousemove(function(event) {
      currentMousePos.x = event.pageX;
      currentMousePos.y = event.pageY;
      if ($("#modal").css("display") != "none") {
        $("#modal").css({
          top: currentMousePos.y - 100,
          left: currentMousePos.x + 50
        });
      }
    });
    $(".image").on("mouseover", function() {
      var image = $(this).find("img");
      var modal = $("#modal");
      $(modal).html(image.clone());
      $(modal).css({
        top: currentMousePos.y,
        left: currentMousePos.x + 12
      });
      $(modal).show();
    });
    $(".image").on("mouseleave", function() {
      $(modal).hide();
    });
  });

  return (
    <div>
      <Card
        className={classes.card}
        style={{
          overflowX: "hidden",
          overflowY: "auto",
          marginBottom: `${5}px`
        }}
      >
        <CardContent
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 0
          }}
        >
          <p
            className={classes.title}
            color="textSecondary"
            style={{
              fontSize: "15x",
              flex: 0.7,
              padding: "0.2rem 0.4em"
            }}
          >
            {new Date(locale).toLocaleString("en-US", {
              timeZone: "America/New_York"
            })}
          </p>
          <p
            style={{
              fontSize: "15px",
              flex: 0.7,
              padding: "0.2rem 0.4em"
            }}
            className={classes.title}
            color="textSecondary"
          >
            {/* {userCode} */}
          </p>
          <div
            className="image"
            style={{
              fontSize: "15px",

              display: "flex",
              flex: 1,
              justifyContent: "center"
            }}
          >
            {frontSelfie ? (
              <img
                style={{
                  width: "50%",
                  borderRadius: "17px"
                }}
                src={frontSelfie}
              />
            ) : (
              "n/a"
            )}
            <div id="modal"></div>
          </div>
          <p
            style={{
              fontSize: "15px",
              textAlign: "center",
              flex: 0.8,
              padding: "0.2rem 0.4em"
            }}
            className={classes.title}
            color="textSecondary"
          >
            {" "}
            {thickness
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
          </p>
          <p
            style={{
              fontSize: "15px",
              textAlign: "center",
              flex: 0.6,
              padding: "0.2rem 0.4em"
            }}
            className={classes.title}
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
          </p>
          <p
            style={{
              fontSize: "15px",
              textAlign: "center",
              flex: 1,
              padding: "0.2rem 0.4em",
              lineHeight: "24px"
            }}
            className={classes.title}
            color="textSecondary"
          >
            {condition === "none"
              ? "none"
              : condition.map(e => {
                  return (
                    <div>
                      {e} <br />
                    </div>
                  );
                })}
          </p>
          <p
            style={{
              fontSize: "15px",
              textAlign: "center",
              flex: 1,
              padding: "0.2rem 0.4em",
              lineHeight: "24px"
            }}
            className={classes.title}
            color="textSecondary"
          >
            {hairGoals ? hairGoals.join(", ") : ""}
          </p>

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
        </CardContent>
        {/* <CardActions></CardActions> */}
      </Card>
    </div>
  );
};

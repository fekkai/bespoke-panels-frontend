import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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
  hairGoals,
  shampooSkeletonKey,
  shampooFormula
}) => {
  dueDate = new Date(date)
    .addDays(2)
    .toLocaleString("en-US", { timeZone: "America/New_York" })
    .split(",")[0];

  const classes = useStyles();

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
            padding: "0"
          }}
        >
          <p
            className={classes.title}
            color="textSecondary"
            style={{
              flex: 1,
              padding: "0.2rem 0.4em"
            }}
          >
            {
              // new Date(dueDate)
              //   .toLocaleString("en-US", {
              //     timeZone: "America/New_York"
              //   })
              //   .split(",")[0]
              locale
            }
          </p>
          <p
            style={{
              flex: 2,
              padding: "0.2rem 0.4em"
            }}
            className={classes.title}
            color="textSecondary"
          >
            {userCode}
          </p>
          <p
            style={{
              flex: 2,
              padding: "0.2rem 0.4em"
            }}
            className={classes.title}
            color="textSecondary"
          >
            {" "}
            {customerName}
          </p>
          <p
            style={{
              textAlign: "left",
              flex: 4,
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
            {", "}
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
              : "N/A"}
            <br />
            GOAL: {hairGoals}
            <br />
            {shampooSkeletonKey
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
              : "" + " "}
          </p>
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
        <CardActions></CardActions>
      </Card>
    </div>
  );
};

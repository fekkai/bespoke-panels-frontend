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
  status,
  product1,
  product2,
  product3
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
            justifyContent: "space-between",
            padding: "0"
          }}
        >
          <Typography
            className={classes.title}
            color="textSecondary"
            style={{
              width: `${20}%`
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
          </Typography>
          <Typography
            style={{
              width: `${20}%`
            }}
            className={classes.title}
            color="textSecondary"
          >
            {userCode}
          </Typography>
          <Typography
            style={{
              width: `${20}%`
            }}
            className={classes.title}
            color="textSecondary"
          >
            {" "}
            {customerName}
          </Typography>
          <Typography
            style={{
              width: `${20}%`
            }}
            className={classes.title}
            color="textSecondary"
          >
            {" "}
            {/* {`${product1}, ${product2}, ${product3}`} */}
            <br />
          </Typography>
          <Typography
            style={{
              width: `${20}%`
            }}
            className={classes.title}
            color="textSecondary"
          >
            {" "}
            {status}
            <br />
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
};

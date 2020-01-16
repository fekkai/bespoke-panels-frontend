import React from "react";

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export const Row = ({
  date,
  dueDate,
  orderId,
  customerName,
  status,
  product1,
  product2,
  product3
}) => {
  dueDate = new Date(date)
    .addDays(2)
    .toLocaleString("en-US", { timeZone: "America/New_York" })
    .split(",")[0];

  return (
    <div className="row">
      <div>
        {
          new Date(dueDate)
            .toLocaleString("en-US", {
              timeZone: "America/New_York"
            })
            .split(",")[0]
        }
      </div>
      <div>{orderId}</div>
      <div>{customerName}</div>
      <div>{`${product1}, ${product2}, ${product3}`}</div>
      <div>{status}</div>
    </div>
  );
};

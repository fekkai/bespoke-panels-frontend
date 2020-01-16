import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default class Row {

  state = {};

    // console.log(this.props.rowData);
  

  createData = (
    date,
    dueDate,
    orderId,
    customerName,
    status,
    product1,
    product2,
    product3
  ) => {
    return {
      date,
      dueDate,
      orderId,
      customerName,
      status,
      product1,
      product2,
      product3
    };
  };

  createRows = () => {
    const rows = [
      this.createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
      this.createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
      this.createData("Eclair", 262, 16.0, 24, 6.0),
      this.createData("Cupcake", 305, 3.7, 67, 4.3),
      this.createData("Gingerbread", 356, 16.0, 49, 3.9)
    ];
    return rows;
  };

  render() {
    return (
      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>DUE DATE</TableCell>
              <TableCell align="right">ORDER ID</TableCell>
              <TableCell align="right">NAME</TableCell>
              <TableCell align="right">PRODUCT</TableCell>
              <TableCell align="right">STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map(row => ( */}
            {/* <TableRow key={row.name}> */}
            {/* <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell> */}
            {/* </TableRow> */}
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

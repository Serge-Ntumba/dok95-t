// import React, { useState } from "react";
import classes from "./Table.module.css";

const Table = ({ data }) => {
  //   const [receivedData, setReceivedData] = useState(data);

  const getDaysInMonth = new Date(2021, 5, 0).getDate();

  //the days in the header
  const daysInMonth = [
    ...Array.from({ length: getDaysInMonth }, (_, i) => (
      <th key={Math.random()}>{i + 1}</th>
    )),
  ];
  // to output the full name from the data
  let HourlyTime;
  const getFullNmame = data.map((user) => {
    HourlyTime = user.Days.map((d) => {
      const minutes = parseTime(d.End) - parseTime(d.Start);
      return <span>{(minutes / 60).toFixed(2)}</span>;
    });

    return <span key={user.id}>{user.Fullname}</span>;
  });

  // Here we are getting the time in mimnute
  function parseTime(s) {
    const c = s.split("-");
    return parseInt(c[0]) * 60 + parseInt(c[1]);
  }

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Users</th>
          {daysInMonth}
          <th>Monthly total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{getFullNmame}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;

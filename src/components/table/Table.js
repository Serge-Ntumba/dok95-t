import React from "react";
import TableBase from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const headRows = [
  "User",
  ...Array(31)
    .fill(1)
    .map((_, index) => index + 1),
  "Monthly total",
];

const calcTime = (start, end) => {
  const [startHours, startMinutes] = start.split("-");
  const [endHours, endMinutes] = end.split("-");

  const hours = endHours - startHours;
  const minutes = endMinutes - startMinutes;

  const finalMinutes = hours * 60 + minutes;
  const finalHours = Math.trunc(finalMinutes / 60);
  const result = `${finalHours}-${finalMinutes - finalHours * 60}`;

  return result;
};

const calcTotal = (days) => {
  const { hours, minutes } = days.reduce(
    (acc, cur) => {
      const [hours, minutes] = cur.split("-");
      acc.hours += Number(hours);
      acc.minutes += Number(minutes);
      return acc;
    },
    { hours: 0, minutes: 0 }
  );

  const finalHours = Math.trunc(minutes / 60);
  return `${hours + finalHours}-${minutes - finalHours * 60}`;
};

const showTime = (time) => {
  if (time[0] === "0" && time[2] === "0") {
    return 0;
  }

  return time;
};

const transformDays = (days) => {
  const daysMap = days.reduce((acc, cur) => {
    const [, , day] = cur.Date.split("-");
    acc[day] = cur;
    return acc;
  }, {});

  const list = Array(31)
    .fill(1)
    .map((_, index) => index + 1);
  return list.map((el) => {
    return (
      daysMap[String(el).padStart(2, "0")] ?? {
        Date: 0,
        Start: "0-0",
        End: "0-0",
      }
    );
  });
};

const Table = ({ data }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <TableBase sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headRows.map((row) => (
                <TableCell key={row}>{row}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.Fullname}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.Fullname}
                </TableCell>
                {transformDays(row.Days).map((day, i) => (
                  <TableCell key={i} align="right">
                    {showTime(calcTime(day.Start, day.End))}
                  </TableCell>
                ))}
                <TableCell>
                  {calcTotal(
                    transformDays(row.Days).map((day) =>
                      calcTime(day.Start, day.End)
                    )
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableBase>
      </TableContainer>
    </>
  );
};

export default Table;

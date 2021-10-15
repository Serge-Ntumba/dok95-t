import React, { useState, useMemo } from "react";
import TableBase from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import ShowModal from "../modal/Modal";

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
  const [isOpen, setIsOpen] = useState(false);
  const [searched, setSearched] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const isOpenHandler = () => {
    setIsOpen(true);
  };
  const isCloseHandler = () => {
    setIsOpen(false);
  };

  const filteredRows = useMemo(() => data
    .filter((row) => row.Fullname.toLowerCase().includes(searched.toLowerCase())), [data, searched])

  const rows = useMemo(
    () => {
      const result = filteredRows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

      if (order) {
        return result.sort((a, b) => {
          if (a.Fullname === b.Fullname) return 0;

          if (order === 'asc') {
            return a.Fullname > b.Fullname ? 1 : -1;
          } else {
            return a.Fullname < b.Fullname ? 1 : -1;
          }
        })
      }

      return result;
    },
    [filteredRows, order, page, rowsPerPage]
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {isOpen ? (
        <ShowModal
          setOpenModal={isOpenHandler}
          setCloseModal={isCloseHandler}
        />
      ) : (
        <Paper>
          <Input
            value={searched}
            placeholder="Search"
            onChange={(e) => {
              setSearched(e.target.value);
              setPage(0);
            }}
          />
          <TableContainer component={Paper}>
            <TableBase sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={true}
                      direction={order}
                      onClick={() => setOrder((prev) => prev === 'asc' ? 'desc' : 'asc')}
                    >
                      <button onClick={isOpenHandler}>{headRows[0]}</button>
                    </TableSortLabel>
                  </TableCell>
                  {headRows.slice(1).map((row) => (
                    <TableCell key={row}>
                      <button onClick={isOpenHandler}>{row}</button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRows.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
};

export default Table;

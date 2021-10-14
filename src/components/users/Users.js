import React from "react";

const Users = ({ data }) => {
  let startTimeAndEndTime;
  const getFullNmame = data.map((user) => {
    // getTimePerUser(user);
    // console.log(user.Days.length);
    handleDateStartEnd(user.Days);
    return <div key={user.id}>{user.Fullname}</div>;
  });

  function handleDateStartEnd(d) {
    startTimeAndEndTime = d.map((t) => {
      return <div>{(t.Start, t.End)}</div>;
      //   console.log(t.Date);
    });
    // console.log(d);
  }

  return (
    <>
      <div>{getFullNmame}</div>
      <div>{startTimeAndEndTime}</div>
    </>
  );
};

export default Users;

// import React, { useState, useEffect } from "react";

import data from "./data/data.json";
import Table from "./components/table/Table";
// import Users from "./components/users/Users";

function App() {
  // for (const i of data) {
  //   console.log(i.Days);
  // }

  // const [data, setData] = useState({});
  return (
    <div className="App">
      <Table data={data} />
      {/* <Users data={data} /> */}
    </div>
  );
}

export default App;

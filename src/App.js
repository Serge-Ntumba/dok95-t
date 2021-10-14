import data from "./data/data.json";
import Table from "./components/table/Table";

function App() {
  return (
    <div className="App">
      <Table data={data} />
    </div>
  );
}

export default App;

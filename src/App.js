import './App.css';
import DimCustomerLevelsTable from './Data/DimCustomerLevelsTable';
import FactShowTable from './Data/FactShow';

function App() {
  return (
    <div className="App">
      <h1>FactShow</h1>
      {/* <DimCustomerLevelsTable /> */}
      <FactShowTable />
    </div>
  );
}

export default App;

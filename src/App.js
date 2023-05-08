import './App.css';
import CalibersList from './Data/CalibersList';
import DimCustomerLevelsTable from './Data/DimCustomerLevelsTable';

function App() {
  return (
    <div className="App">
      <h1>Calibers</h1>
      <CalibersList />
      <DimCustomerLevelsTable />
    </div>
  );
}

export default App;

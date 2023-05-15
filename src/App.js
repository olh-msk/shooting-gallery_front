import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Data/LoginPage';
import FactShowTable from './Data/FactShowTable';
import DimCustomerLevelsGiagram from './Data/DimCustomerLevelsDiagram';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/factshow" element={<FactShowTable />} />
        <Route
          path="/customerLevelsDiagram"
          element={<DimCustomerLevelsGiagram />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

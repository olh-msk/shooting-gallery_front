import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Data/LoginPage';
import FactShowTable from './Data/FactShowTable';
import DimCustomerLevelsGiagram from './Data/DimCustomerLevelsDiagram';
import CaliberTypeQuantity from './Data/CiliberTypeQuantity';
import IncomeDiffDiagram from './Data/IncomeDiffDiagram';

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
        <Route path="/caliberDiagram" element={<CaliberTypeQuantity />} />
        <Route path="/incomeDiffDiagram" element={<IncomeDiffDiagram />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

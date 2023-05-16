import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Data/LoginPage';
import FactShowTable from './Data/FactShowTable';
import DimCustomerLevelsGiagram from './Data/DimCustomerLevelsDiagram';
import CaliberTypeQuantity from './Data/CiliberTypeQuantity';
import IncomeDiffDiagram from './Data/IncomeDiffDiagram';
import OltpMetadata from './Data/OltpMetadata';
import Dimensions from './Data/Dimensions';
import TaskTables from './Data/TaskTables';

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
        <Route path="/oltpMeta" element={<OltpMetadata />} />
        <Route path="/dimensions" element={<Dimensions />} />
        <Route path="/taskTables" element={<TaskTables />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

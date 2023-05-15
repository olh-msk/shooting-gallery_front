import { DataGrid } from '@material-ui/data-grid';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const TotalIncomeDiagram = ({ data }) => {
  // Group data by CustomerLevelName and sum TotalIncome for each group
  const groupedData = Object.values(
    data.reduce((acc, { CustomerLevelName, TotalIncome }) => {
      acc[CustomerLevelName] = acc[CustomerLevelName] || {
        CustomerLevelName,
        TotalIncome: 0,
      };
      acc[CustomerLevelName].TotalIncome += TotalIncome;
      return acc;
    }, {})
  );

  // Define columns for the DataGrid
  const columns = [
    { field: 'CustomerLevelName', headerName: 'Customer Level', width: 200 },
    { field: 'TotalIncome', headerName: 'Total Income', width: 200 },
  ];

  return (
    <div>
      <DataGrid rows={groupedData} columns={columns} />
      <BarChart width={600} height={300} data={groupedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="CustomerLevelName" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="TotalIncome" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default TotalIncomeDiagram;

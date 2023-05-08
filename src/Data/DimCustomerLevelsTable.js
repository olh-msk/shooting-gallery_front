import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const handleSort =
  (customerLevels, setCustomerLevels, setSort) => (field, direction) => {
    const sortedCustomerLevels = [...customerLevels].sort((a, b) => {
      const sortDirection = direction === 'asc' ? 1 : -1;
      return (
        sortDirection * (a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0)
      );
    });
    setCustomerLevels(sortedCustomerLevels);
    setSort({ field, direction });
  };

export default function DimCustomerLevelsTable() {
  const [customerLevels, setCustomerLevels] = useState([]);
  const [sort, setSort] = useState({
    field: 'customerLevelKey',
    direction: 'asc',
  });

  const fetchData = async () => {
    const response = await fetch(`https://localhost:44300/DimCustomerLevel`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchData().then((data) => setCustomerLevels(data));
  }, []);

  const columns = useMemo(
    () => [
      {
        field: 'customerLevelKey',
        headerName: 'Customer Level Key',
        sortable: true,
        width: 200,
        minWidth: 150,
        sortDirection:
          sort.field === 'customerLevelKey' ? sort.direction : false,
      },
      {
        field: 'customerLevelId',
        headerName: 'Customer Level ID',
        sortable: true,
        width: 200,
        minWidth: 150,
        sortDirection:
          sort.field === 'customerLevelId' ? sort.direction : false,
      },
      {
        field: 'levelName',
        headerName: 'Level Name',
        sortable: true,
        width: 300,
        minWidth: 200,
        sortDirection: sort.field === 'levelName' ? sort.direction : false,
      },
    ],
    [sort.field, sort.direction]
  );

  const getRowId = (row) => row.customerLevelKey;

  const handleSortMemoized = useCallback(
    handleSort(customerLevels, setCustomerLevels, setSort),
    [customerLevels, setCustomerLevels, setSort]
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={customerLevels}
        columns={columns}
        sortModel={[
          { field: sort.field || 'customerLevelKey', sort: sort.direction },
        ]}
        onSortModelChange={(model) => {
          const { field, sort: direction } = model[0] || {};
          handleSortMemoized(field, direction);
        }}
        getRowId={getRowId}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Typography,
} from '@material-ui/core';
import { getDimCustomerLevels } from '../api';

export default function DimCustomerLevelsTable() {
  const [customerLevels, setCustomerLevels] = useState([]);
  const [sort, setSort] = useState({ column: null, direction: 'asc' });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDimCustomerLevels();
      setCustomerLevels(data);
    };
    fetchData();
  }, []);

  const handleSort = (columnName) => {
    if (sort.column === columnName) {
      setSort({
        ...sort,
        direction: sort.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSort({ column: columnName, direction: 'asc' });
    }
  };

  const sortedCustomerLevels = customerLevels.slice().sort((a, b) => {
    const direction = sort.direction === 'asc' ? 1 : -1;
    const columnA = a[sort.column];
    const columnB = b[sort.column];
    if (columnA < columnB) {
      return -1 * direction;
    }
    if (columnA > columnB) {
      return 1 * direction;
    }
    return 0;
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={sort.column === 'CustomerLevelKey'}
              direction={sort.direction}
              onClick={() => handleSort('CustomerLevelKey')}
            >
              Customer Level Key
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sort.column === 'CustomerLevelId'}
              direction={sort.direction}
              onClick={() => handleSort('CustomerLevelId')}
            >
              Customer Level ID
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sort.column === 'LevelName'}
              direction={sort.direction}
              onClick={() => handleSort('LevelName')}
            >
              Level Name
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedCustomerLevels.map((level) => (
          <TableRow key={level.CustomerLevelKey}>
            <TableCell>{level.CustomerLevelKey}</TableCell>
            <TableCell>{level.CustomerLevelId}</TableCell>
            <TableCell>{level.LevelName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

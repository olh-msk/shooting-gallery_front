import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import PageBar from './PageBar';

export default function TaskTables() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const resultDimLevel = await axios.get(`https://localhost:44300/FactShow`);
    setData(resultDimLevel.data);
  };

  return (
    <>
      <PageBar />
      <Typography
        variant="h6"
        component="h2"
        align="center"
        fontWeight={'bold'}
        marginTop={'10px'}
      >
        OLTP Metadata
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Record ID</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Table Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Table Rows</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.rows}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

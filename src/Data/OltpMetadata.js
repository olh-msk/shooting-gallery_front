import React, { useEffect, useState, useRef } from 'react';
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
  Button,
} from '@mui/material';
import PageBar from './PageBar';
import jsPDF from 'jspdf';

export default function OltpMetadata() {
  const [data, setData] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const resultDimLevel = await axios.get(`https://localhost:44300/OltpMeta`);
    setData(resultDimLevel.data);
  };

  const dowloadPdf = () => {
    const doc = new jsPDF();
    doc.text('Testing dowload', 20, 10);

    doc.save('tabletest');
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
        <Table ref={tableRef}>
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
      <Button variant="contained" onClick={dowloadPdf}>
        Download PDF
      </Button>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
} from '@mui/material';

const FactShowTable = () => {
  const [factShows, setFactShows] = useState([]);
  const [originalFactShows, setOriginalFactShows] = useState([]);
  const [filters, setFilters] = useState({
    GalleryName: '',
    CaliberType: '',
    CustomerLevelName: '',
  });

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleGetDataClick = async () => {
    const result = await axios.get(`https://localhost:44300/FactShow`);
    setFactShows(result.data);
    console.log(factShows);
    setOriginalFactShows(result.data);
  };

  const handleFilterClick = () => {
    if (
      filters.GalleryName ||
      filters.CaliberType ||
      filters.CustomerLevelName
    ) {
      const filteredData = originalFactShows.filter(
        (factShow) =>
          (!filters.GalleryName ||
            factShow.GalleryName.includes(filters.GalleryName)) &&
          (!filters.CaliberType ||
            factShow.CaliberType.includes(filters.CaliberType)) &&
          (!filters.CustomerLevelName ||
            factShow.CustomerLevelName.includes(filters.CustomerLevelName))
      );
      setFactShows(filteredData);
    } else {
      setFactShows(originalFactShows);
    }
  };

  useEffect(() => {
    setFactShows(originalFactShows);
  }, [originalFactShows]);

  return (
    <>
      <TextField
        name="GalleryName"
        value={filters.GalleryName}
        onChange={handleChange}
        label="Gallery Name"
      />
      <TextField
        name="CaliberType"
        value={filters.CaliberType}
        onChange={handleChange}
        label="Caliber Type"
      />
      <TextField
        name="CustomerLevelName"
        value={filters.CustomerLevelName}
        onChange={handleChange}
        label="Customer Level Name"
      />
      <Button variant="contained" onClick={handleGetDataClick}>
        Get Data
      </Button>
      <Button variant="contained" onClick={handleFilterClick}>
        Filter Data
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Session Key</TableCell>
            <TableCell>Gallery Name</TableCell>
            <TableCell>Caliber Type</TableCell>
            <TableCell>Customer Level Name</TableCell>
            <TableCell>Period Start Day</TableCell>
            <TableCell>Period End Day</TableCell>
            <TableCell>Total Income</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Income Difference</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {factShows.map((factShow) => (
            <TableRow key={factShow.SessionKey}>
              <TableCell>{factShow.SessionKey}</TableCell>
              <TableCell>{factShow.GalleryName}</TableCell>
              <TableCell>{factShow.CaliberType}</TableCell>
              <TableCell>{factShow.CustomerLevelName}</TableCell>
              <TableCell>{factShow.PeriodStartDay}</TableCell>
              <TableCell>{factShow.PeriodEndDay}</TableCell>
              <TableCell>{factShow.TotalIncome}</TableCell>
              <TableCell>{factShow.Quantity}</TableCell>
              <TableCell>{factShow.IncomeDifference}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default FactShowTable;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FactShowTable = () => {
  const [factShows, setFactShows] = useState([]);
  const [originalFactShows, setOriginalFactShows] = useState([]);
  const [filters, setFilters] = useState({
    galleryName: '',
    caliberType: '',
    customerLevelName: '',
  });

  const navigate = useNavigate();

  const [galleryOptions, setGalleryOptions] = useState([]);
  const [calibersOptions, setCalibersOptions] = useState([]);
  const [levelOptions, setLevelOptions] = useState([]);

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleGoToCustomerLevelsDiagram = (event) => {
    event.preventDefault();
    navigate('/customerLevelsDiagram');
  };

  const handleGoToCaliberDiagram = (event) => {
    event.preventDefault();
    navigate('/caliberDiagram');
  };

  const handleGoToIncomeDiffDiagram = (event) => {
    event.preventDefault();
    navigate('/incomeDiffDiagram');
  };

  const handleGetDataClick = async () => {
    const result = await axios.get(`https://localhost:44300/FactShow`);
    setFactShows(result.data);
    setOriginalFactShows(result.data);

    // Populate the gallery name options
    const galleryNames = Array.from(
      new Set(result.data.map((factShow) => factShow.galleryName))
    );
    setGalleryOptions(galleryNames);

    // Populate the calibers options
    const calibers = Array.from(
      new Set(result.data.map((factShow) => factShow.caliberType))
    );
    setCalibersOptions(calibers);

    // Populate the calibers options
    const levels = Array.from(
      new Set(result.data.map((factShow) => factShow.customerLevelName))
    );
    setLevelOptions(levels);
  };

  const handleFilterClick = () => {
    if (
      filters.galleryName ||
      filters.caliberType ||
      filters.customerLevelName
    ) {
      const filteredData = originalFactShows.filter(
        (factShow) =>
          (!filters.galleryName ||
            factShow.galleryName
              .toLowerCase()
              .includes(filters.galleryName.toLowerCase())) &&
          (!filters.caliberType ||
            factShow.caliberType
              .toLowerCase()
              .includes(filters.caliberType.toLowerCase())) &&
          (!filters.customerLevelName ||
            factShow.customerLevelName
              .toLowerCase()
              .includes(filters.customerLevelName.toLowerCase()))
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
      <Select
        name="galleryName"
        value={filters.galleryName}
        onChange={handleChange}
        label="Gallery Name"
        displayEmpty
      >
        <MenuItem value="">
          <em>All Gallery Names</em>
        </MenuItem>
        {galleryOptions.map((name) => (
          <MenuItem value={name} key={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
      <Select
        name="caliberType"
        value={filters.caliberType}
        onChange={handleChange}
        label="Caliber Type"
        displayEmpty
      >
        <MenuItem value="">
          <em>All Caliber Types</em>
        </MenuItem>
        {calibersOptions.map((name) => (
          <MenuItem value={name} key={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
      <Select
        name="customerLevelName"
        value={filters.customerLevelName}
        onChange={handleChange}
        label="Customer Level Name"
        displayEmpty
      >
        <MenuItem value="">
          <em>All Customer Level Names</em>
        </MenuItem>
        {levelOptions.map((name) => (
          <MenuItem value={name} key={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" onClick={handleGetDataClick}>
        Get Data
      </Button>
      <Button variant="contained" onClick={handleFilterClick}>
        Filter Data
      </Button>
      <Button variant="contained" onClick={handleGoToCustomerLevelsDiagram}>
        Go to customer level diagram
      </Button>
      <Button variant="contained" onClick={handleGoToCaliberDiagram}>
        Go to calibers diagram
      </Button>
      <Button variant="contained" onClick={handleGoToIncomeDiffDiagram}>
        Go to income difference
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
            <TableRow key={factShow.sessionKey}>
              <TableCell>{factShow.sessionKey}</TableCell>
              <TableCell>{factShow.galleryName}</TableCell>
              <TableCell>{factShow.caliberType}</TableCell>
              <TableCell>{factShow.customerLevelName}</TableCell>
              <TableCell>{factShow.periodStartDay}</TableCell>
              <TableCell>{factShow.periodEndDay}</TableCell>
              <TableCell>{factShow.totalIncome}</TableCell>
              <TableCell>{factShow.quantity}</TableCell>
              <TableCell>{factShow.incomeDifference}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default FactShowTable;

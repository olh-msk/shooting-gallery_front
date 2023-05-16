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
  Paper,
  Typography,
} from '@mui/material';

import MetaResponse from './MetaResponse';
import PageBar from './PageBar';

const FactShowTable = () => {
  const [factShows, setFactShows] = useState([]);
  const [originalFactShows, setOriginalFactShows] = useState([]);
  const [filters, setFilters] = useState({
    galleryName: '',
    caliberType: '',
    customerLevelName: '',
    periodStartDay: '',
    periodEndDay: '',
  });

  const [metaResponse, setMetaResponse] = useState(null);

  const [galleryOptions, setGalleryOptions] = useState([]);
  const [calibersOptions, setCalibersOptions] = useState([]);
  const [levelOptions, setLevelOptions] = useState([]);
  const [periodStartOptions, setPeriodStartOptions] = useState([]);
  const [periodEndOptions, setPeriodEndOptions] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const populateOptions = (data) => {
    // Populate the gallery name options
    const galleryNames = Array.from(
      new Set(data.map((factShow) => factShow.galleryName))
    );
    setGalleryOptions(galleryNames);

    // Populate the calibers options
    const calibers = Array.from(
      new Set(data.map((factShow) => factShow.caliberType))
    );
    setCalibersOptions(calibers);

    // Populate the customer level options
    const levels = Array.from(
      new Set(data.map((factShow) => factShow.customerLevelName))
    );
    setLevelOptions(levels);

    // Populate the period start options
    const periodsStart = Array.from(
      new Set(data.map((factShow) => factShow.periodStartDay))
    );
    setPeriodStartOptions(periodsStart);

    // Populate the period end options
    const periodsEnd = Array.from(
      new Set(data.map((factShow) => factShow.periodEndDay))
    );
    setPeriodEndOptions(periodsEnd);
  };

  const getData = async () => {
    try {
      const result = await axios.get('https://localhost:44300/FactShow');
      console.log(result.data); // Handle the response data here

      setFactShows(result.data);
      setOriginalFactShows(result.data);

      populateOptions(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetDataClick = async () => {
    try {
      await axios.post('https://localhost:44300/InsertWarehouseFirst');

      const result = await axios.get(`https://localhost:44300/FactShow`);

      const metaDataResponse = await axios.get(
        'https://localhost:44300/LoadHistory'
      );
      setMetaResponse(metaDataResponse.data);

      setFactShows(result.data);
      setOriginalFactShows(result.data);

      populateOptions(result.data);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error inserting warehouse:', error);
    }
  };

  const handleIncrementalLoad = async () => {
    try {
      await axios.post('https://localhost:44300/InsertWarehouseIncremental');

      const result = await axios.get(`https://localhost:44300/FactShow`);

      const metaDataResponse = await axios.get(
        'https://localhost:44300/LoadHistory'
      );
      setMetaResponse(metaDataResponse.data);

      setFactShows(result.data);
      setOriginalFactShows(result.data);

      populateOptions(result.data);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error inserting warehouse:', error);
    }
  };

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleClearClick = async () => {
    try {
      await axios.post('https://localhost:44300/ClearWarehouse');
      // Optionally, you can handle the response or perform additional actions after the request is successful
      const result = await axios.get('https://localhost:44300/FactShow');
      setFactShows(result.data);
      setOriginalFactShows(result.data);

      setMetaResponse(null);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error clearing database:', error);
    }
  };

  const handleFilterClick = () => {
    if (
      filters.galleryName ||
      filters.caliberType ||
      filters.customerLevelName ||
      filters.periodStartDay ||
      filters.periodEndDay
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
              .includes(filters.customerLevelName.toLowerCase())) &&
          (!filters.periodStartDay ||
            factShow.periodStartDay
              .toLowerCase()
              .includes(filters.periodStartDay.toLowerCase())) &&
          (!filters.periodEndDay ||
            factShow.periodEndDay
              .toLowerCase()
              .includes(filters.periodEndDay.toLowerCase()))
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
      <PageBar />
      <div
        style={{
          display: 'flex',
          marginBottom: '20px',
          marginTop: '30px',
        }}
      >
        <Select
          name="galleryName"
          value={filters.galleryName}
          onChange={handleChange}
          label="Gallery Name"
          displayEmpty
          style={{ marginRight: '10px' }}
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
          style={{ marginRight: '10px' }}
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
          style={{ marginRight: '10px' }}
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
        <Select
          name="periodStartDay"
          value={filters.periodStartDay}
          onChange={handleChange}
          label="Period Start Day"
          displayEmpty
          style={{ marginRight: '10px' }}
        >
          <MenuItem value="">
            <em>All Period Start Days</em>
          </MenuItem>
          {periodStartOptions.map((name) => (
            <MenuItem value={name} key={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <Select
          name="periodEndDay"
          value={filters.periodEndDay}
          onChange={handleChange}
          label="Period End Day"
          displayEmpty
          style={{ marginRight: '10px' }}
        >
          <MenuItem value="">
            <em>All Period End Days</em>
          </MenuItem>
          {periodEndOptions.map((name) => (
            <MenuItem value={name} key={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </div>
      {/* Button section 1 */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={handleGetDataClick}
          style={{
            marginRight: '10px',
            backgroundColor: '#00cccc',
            color: '#000000',
            fontSize: '15px',
            fontWeight: 'bold',
          }}
        >
          First load
        </Button>
        <Button
          variant="contained"
          onClick={handleIncrementalLoad}
          style={{
            marginRight: '10px',
            backgroundColor: '#00cccc',
            color: '#000000',
            fontSize: '15px',
            fontWeight: 'bold',
          }}
        >
          Incremental load
        </Button>
        <Button
          variant="contained"
          onClick={handleFilterClick}
          style={{
            marginRight: '10px',
            backgroundColor: '#00cccc',
            color: '#000000',
            fontSize: '15px',
            fontWeight: 'bold',
          }}
        >
          Filter Data
        </Button>
        <Button
          variant="contained"
          onClick={handleClearClick}
          style={{
            marginRight: '10px',
            backgroundColor: '#00cccc',
            color: '#000000',
            fontSize: '15px',
            fontWeight: 'bold',
          }}
        >
          Clear Data
        </Button>
      </div>
      <div>{metaResponse && <MetaResponse response={metaResponse} />}</div>
      <Paper style={{ marginBottom: '20px' }}>
        <Typography
          variant="h6"
          component="h2"
          align="center"
          fontWeight={'bold'}
          marginTop={'10px'}
        >
          FactSession Table
        </Typography>
        <Table style={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Session Key</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Gallery Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Caliber Type</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                Customer Level Name
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                Period Start Day
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                Period End Day
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Total Income</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                Income Difference
              </TableCell>
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
      </Paper>
    </>
  );
};

export default FactShowTable;

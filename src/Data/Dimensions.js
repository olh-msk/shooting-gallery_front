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
  Box,
  Typography,
} from '@mui/material';
import PageBar from './PageBar';

export default function Dimensions() {
  const [dataDimLevel, setDataDimLevel] = useState([]);
  const [dataDimGuns, setDataDimGuns] = useState([]);
  const [dataDimGal, setDataDimGal] = useState([]);
  const [dataDimDate, setDataDimDate] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const resultDimLevel = await axios.get(
      `https://localhost:44300/DimCustomerLevel`
    );
    setDataDimLevel(resultDimLevel.data);

    const resultDimGuns = await axios.get(`https://localhost:44300/DimGun`);
    setDataDimGuns(resultDimGuns.data);

    const resultDimGal = await axios.get(`https://localhost:44300/DimGallery`);
    setDataDimGal(resultDimGal.data);

    const resultDimDate = await axios.get(`https://localhost:44300/DimDate`);
    setDataDimDate(resultDimDate.data);
  };

  return (
    <>
      <PageBar />
      <Box mb={15}>
        <Typography
          variant="h6"
          component="h2"
          align="center"
          fontWeight={'bold'}
        >
          DimCustomerLevel Table
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>
                  Customer Level Key
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>
                  Customer Level ID
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Level Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataDimLevel.map((item) => (
                <TableRow key={item.customerLevelKey}>
                  <TableCell>{item.customerLevelKey}</TableCell>
                  <TableCell>{item.customerLevelId}</TableCell>
                  <TableCell>{item.levelName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box mb={15}>
        <Typography
          variant="h6"
          component="h2"
          align="center"
          fontWeight={'bold'}
        >
          DimGallery Table
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>
                  Shooting Gallery Key
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>
                  Shooting Gallery ID
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>
                  Gallery Name
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>
                  Gallery Address
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>City Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataDimGal.map((item) => (
                <TableRow key={item.shootingGalleryKey}>
                  <TableCell>{item.shootingGalleryKey}</TableCell>
                  <TableCell>{item.shootingGalleryId}</TableCell>
                  <TableCell>{item.galleryName}</TableCell>
                  <TableCell>{item.galleryAddress}</TableCell>
                  <TableCell>{item.cityName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box mb={15}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          align="center"
          style={{ fontWeight: 'bold' }}
        >
          DimGun Table
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Gun Key</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Gun ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>
                  Manufacturer Name
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>
                  Caliber Type Name
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Gun Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>
                  Price per Hour
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataDimGuns.map((item) => (
                <TableRow key={item.gunKey}>
                  <TableCell>{item.gunKey}</TableCell>
                  <TableCell>{item.gunId}</TableCell>
                  <TableCell>{item.manufacturerName}</TableCell>
                  <TableCell>{item.caliberTypeName}</TableCell>
                  <TableCell>{item.gunName}</TableCell>
                  <TableCell>{item.pricePerHour}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box mb={15}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          align="center"
          style={{ fontWeight: 'bold' }}
        >
          DimDate Table
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Date Key</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Day</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Month</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataDimDate.map((item) => (
                <TableRow key={item.dateKey}>
                  <TableCell>{item.dateKey}</TableCell>
                  <TableCell>{item.day}</TableCell>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{item.year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

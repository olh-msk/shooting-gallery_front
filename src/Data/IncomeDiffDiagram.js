import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function IncomeDiffDiagram() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://localhost:44300/FactShow?fields=periodStartDay,periodEndDay,galleryName,incomeDifference`
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  const chartData = data.reduce((acc, curr) => {
    const { periodStartDay, periodEndDay, galleryName, incomeDifference } =
      curr;

    const foundStart = acc.find((item) => item.dateRange === periodStartDay);
    const foundEnd = acc.find((item) => item.dateRange === periodEndDay);

    if (foundStart) {
      foundStart[galleryName] =
        (foundStart[galleryName] || 0) + incomeDifference;
    } else {
      const newEntryStart = {
        dateRange: periodStartDay,
        [galleryName]: incomeDifference,
      };
      acc.push(newEntryStart);
    }

    if (foundEnd && periodEndDay !== periodStartDay) {
      foundEnd[galleryName] = (foundEnd[galleryName] || 0) + incomeDifference;
    } else {
      const newEntryEnd = {
        dateRange: periodEndDay,
        [galleryName]: incomeDifference,
      };
      if (periodEndDay !== periodStartDay) {
        acc.push(newEntryEnd);
      }
    }

    return acc;
  }, []);

  chartData.sort((a, b) => new Date(a.dateRange) - new Date(b.dateRange));

  const handleGoToTable = (event) => {
    event.preventDefault();
    navigate('/factshow');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        style={{
          padding: '16px',
          textAlign: 'center',
          color: '#333',
          width: '80%',
        }}
      >
        <BarChart
          width={1000}
          height={500}
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateRange" tickCount={chartData.length} />
          <YAxis
            label={{
              value: 'Income Difference',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip />
          <Legend />
          {chartData.some((dataPoint) => dataPoint['Target Range']) && (
            <Bar dataKey="Target Range" fill="#FF0000" />
          )}
          {chartData.some((dataPoint) => dataPoint['Guns & Ammo']) && (
            <Bar dataKey="Guns & Ammo" fill="#00FF00" />
          )}
          {chartData.some((dataPoint) => dataPoint['Shooting Sports']) && (
            <Bar dataKey="Shooting Sports" fill="#FFD700" />
          )}
        </BarChart>
      </Paper>

      <Button variant="contained" onClick={handleGoToTable}>
        Go to table
      </Button>
    </div>
  );
}

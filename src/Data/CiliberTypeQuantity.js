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

export default function CaliberTypeQuantity() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`https://localhost:44300/FactShow`);
      setData(result.data);
    };
    fetchData();
  }, []);

  const chartData = data.reduce((acc, curr) => {
    const { periodStartDay, periodEndDay, caliberType, quantity } = curr;

    const foundStart = acc.find((item) => item.dateRange === periodStartDay);
    const foundEnd = acc.find((item) => item.dateRange === periodEndDay);

    if (foundStart) {
      foundStart[caliberType] = (foundStart[caliberType] || 0) + quantity;
    } else {
      const newEntryStart = {
        dateRange: periodStartDay,
        [caliberType]: quantity,
      };
      acc.push(newEntryStart);
    }

    if (foundEnd && periodEndDay !== periodStartDay) {
      foundEnd[caliberType] = (foundEnd[caliberType] || 0) + quantity;
    } else {
      const newEntryEnd = {
        dateRange: periodEndDay,
        [caliberType]: quantity,
      };
      if (periodEndDay !== periodStartDay) {
        acc.push(newEntryEnd);
      }
    }

    return acc;
  }, []);

  // Sort chart data by date range in ascending order
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
              value: 'Quantity',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip />
          <Legend />
          {chartData.some((dataPoint) => dataPoint['9mm']) && (
            <Bar dataKey="9mm" fill="#FF0000" />
          )}
          {chartData.some((dataPoint) => dataPoint['.45 ACP']) && (
            <Bar dataKey=".45 ACP" fill="#00FF00" />
          )}
          {chartData.some((dataPoint) => dataPoint['5.56mm']) && (
            <Bar dataKey="5.56mm" fill="#FFD700" />
          )}
        </BarChart>
      </Paper>

      <Button variant="contained" onClick={handleGoToTable}>
        Go to table
      </Button>
    </div>
  );
}

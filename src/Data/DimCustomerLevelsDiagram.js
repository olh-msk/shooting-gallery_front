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

export default function Chart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`https://localhost:44300/FactShow`);
      setData(result.data);
    };
    fetchData();
  }, []);

  const chartData = data.reduce((acc, curr) => {
    const found = acc.find(
      (item) => item.customerLevelName === curr.customerLevelName
    );
    if (found) {
      found.totalIncome += curr.totalIncome;
    } else {
      acc.push({
        CustomerLevelName: curr.customerLevelName,
        TotalIncome: curr.totalIncome,
      });
    }
    return acc;
  }, []);

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
          width={800}
          height={400}
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="CustomerLevelName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="TotalIncome" fill="#8884d8" />
        </BarChart>
      </Paper>
    </div>
  );
}

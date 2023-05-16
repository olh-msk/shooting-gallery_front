import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Paper from '@mui/material/Paper';
import PageBar from './PageBar';

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
    const { periodStartDay, periodEndDay, customerLevelName, totalIncome } =
      curr;

    const foundStart = acc.find((item) => item.dateRange === periodStartDay);
    const foundEnd = acc.find((item) => item.dateRange === periodEndDay);

    if (foundStart) {
      foundStart[customerLevelName] =
        (foundStart[customerLevelName] || 0) + totalIncome;
    } else {
      const newEntryStart = {
        dateRange: periodStartDay,
        [customerLevelName]: totalIncome,
      };
      acc.push(newEntryStart);
    }

    if (foundEnd && periodEndDay !== periodStartDay) {
      foundEnd[customerLevelName] =
        (foundEnd[customerLevelName] || 0) + totalIncome;
    } else {
      const newEntryEnd = {
        dateRange: periodEndDay,
        [customerLevelName]: totalIncome,
      };
      if (periodEndDay !== periodStartDay) {
        acc.push(newEntryEnd);
      }
    }

    return acc;
  }, []);

  // Sort chart data by date range in ascending order
  chartData.sort((a, b) => new Date(a.dateRange) - new Date(b.dateRange));

  return (
    <>
      <PageBar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Paper
          style={{
            padding: '16px',
            textAlign: 'center',
            color: '#333',
            width: '50%',
          }}
        >
          <LineChart
            width={1000}
            height={500}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dateRange" tickCount={chartData.length} />
            <YAxis
              label={{
                value: 'Total Income',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip />
            <Legend />
            {chartData.some((dataPoint) => dataPoint.Bronze) && (
              <Line
                type="monotone"
                dataKey="Bronze"
                stroke="#CD7F32"
                strokeWidth={3}
              />
            )}
            {chartData.some((dataPoint) => dataPoint.Silver) && (
              <Line
                type="monotone"
                dataKey="Silver"
                stroke="silver"
                strokeWidth={3}
              />
            )}
            {chartData.some((dataPoint) => dataPoint.Gold) && (
              <Line
                type="monotone"
                dataKey="Gold"
                stroke="gold"
                strokeWidth={3}
              />
            )}
          </LineChart>
        </Paper>
      </div>
    </>
  );
}

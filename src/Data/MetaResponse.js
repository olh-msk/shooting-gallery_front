import React from 'react';
import { Typography } from '@mui/material';

const MetaResponse = ({ response }) => {
  // Destructure the response object
  const {
    lastLoadDate,
    loadedRecordsCount,
    loadedDimensionsCount,
    loadedAttributesCount,
  } = response;

  return (
    <div
      style={{
        background: '#f5f5f5',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="body1"
        style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
      >
        Data Load Summary
      </Typography>
      <Typography
        variant="body1"
        style={{ fontSize: '16px', marginBottom: '5px' }}
      >
        Last Load Date: <span style={{ color: 'blue' }}>{lastLoadDate}</span>
      </Typography>
      <Typography
        variant="body1"
        style={{ fontSize: '16px', marginBottom: '5px' }}
      >
        Loaded Records Count:{' '}
        <span style={{ color: 'green' }}>{loadedRecordsCount}</span>
      </Typography>
      <Typography
        variant="body1"
        style={{ fontSize: '16px', marginBottom: '5px' }}
      >
        Loaded Dimensions Count:{' '}
        <span style={{ color: 'orange' }}>{loadedDimensionsCount}</span>
      </Typography>
      <Typography
        variant="body1"
        style={{ fontSize: '16px', marginBottom: '5px' }}
      >
        Loaded Attributes Count:{' '}
        <span style={{ color: 'purple' }}>{loadedAttributesCount}</span>
      </Typography>
    </div>
  );
};

export default MetaResponse;

import React, { useState, useEffect } from 'react';
import { getCalibers } from '../api';

function CalibersList() {
  const [calibers, setCalibers] = useState([]);

  useEffect(() => {
    async function fetchCalibers() {
      const data = await getCalibers();
      console.log(data);
      setCalibers(data);
    }

    fetchCalibers();
  }, []);

  return (
    <ul>
      {calibers.map((caliber) => (
        <li key={caliber.caliberId}>{caliber.caliberTypeName}</li>
      ))}
    </ul>
  );
}

export default CalibersList;

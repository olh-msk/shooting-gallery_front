import axios from 'axios';

const API_URL = 'https://localhost:44300'; // Replace with your API URL

async function getCalibers() {
  const response = await axios.get(`${API_URL}/Calibers`);
  return response.data;
}

export { getCalibers };

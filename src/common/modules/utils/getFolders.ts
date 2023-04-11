import axios from 'axios';

export default async function getFolders() {
  try {
    const response = axios.get('api/folders');
    const collections = await response;
    return collections.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
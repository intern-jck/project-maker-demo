import axios from 'axios';

export default async function getCollections() {
  try {
    const response = axios.get('api/collections');
    const collections = await response;
    return collections.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
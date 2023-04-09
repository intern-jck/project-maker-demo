import axios from 'axios';

export default async function getProjects(collectionId: string = '') {
  try {
    const response = axios.get(`/api/projects?collectionId=${collectionId}`);
    const _projects = await response;
    return _projects.data;
  } catch (error) {
    console.error(error)
    return error;
  }
};

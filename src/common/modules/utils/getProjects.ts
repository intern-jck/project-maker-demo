import axios from 'axios';

export default async function getProjects(folderId: string = '') {
  try {
    const response = axios.get(`/api/projects?folderId=${folderId}`);
    const _projects = await response;
    return _projects.data;
  } catch (error) {
    console.error(error)
    return error;
  }
};

import axios from 'axios';

export default async function getProject(projectId: string) {
  try {
    const response = axios.get(`/api/projects/${projectId}`);
    const _project = await response;
    return _project.data;
  } catch (error) {
    console.error(error)
    return error;
  }
};

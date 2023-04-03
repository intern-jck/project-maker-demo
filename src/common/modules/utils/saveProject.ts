import axios from 'axios';
import { ProjectType } from '@/common/types';

export default async function saveProject(projectData: ProjectType) {
  try {
    const response = await axios.put('/api/projects', { doc: projectData });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
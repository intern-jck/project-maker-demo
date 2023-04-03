import axios from 'axios';
import type { CollectionType } from '@/common/types';

export default async function getProjects(collection: CollectionType) {
  try {
    if (collection.name) {
      const response = axios.get(`/api/projects/collection?name=${collection.name}`);
      const _projects = await response;
      return _projects.data;
    }
    const response = axios.get(`/api/projects/`);
    const _projects = await response;
    return _projects.data;
  } catch (error) {
    console.log(error)
    return error;
  }
};

import { useState, useEffect } from 'react';
import useSWR from 'swr';
// import Image from 'next/image';
import Menu from '@/common/components/Menu';
import Dashboard from '@/common/components/Dashboard';
import Form from '@/common/components/Form';
import { fetcher } from '@/common/modules/utils';
import axios from 'axios';

import type ProjectType from '@/common/types/ProjectType';

export default function Home() {

  const { data, error } = useSWR<ProjectType[]>('/api/projects', fetcher);
  const [currentProjectId, setCurrentProjectId] = useState('');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(data);
  }, [data]);

  async function createProject(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      const response = await axios.post('/api/projects', { name: 'test' });
      const projects = await getProjects();
      setProjects(projects);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  async function getProjects() {
    try {
      const response = axios.get('/api/projects');
      const projects = await response;
      console.log('get', projects.data)
      return projects.data;
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  async function getProject(event: React.SyntheticEvent) {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('data-proj-id');
    setCurrentProjectId(id);
  };

  async function saveProject(projectData) {
    console.log('saving', projectData)

    try {
      const response = await axios.put('/api/projects', { doc: projectData });
      const data = await response.data;
      const projects = await getProjects();
      setProjects(projects);
      // return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  async function deleteProject(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log('delete')
    const id = event.currentTarget.getAttribute('data-project-id');

    try {
      const response = await axios.delete(`/api/projects?id=${id}`);
      const data = await response.data;
      console.log('update', data);
      const projects = await getProjects();
      setProjects(projects);
      setCurrentProjectId('')
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <>
      <div className='menu-div'>
        <Menu
          createHandler={createProject}
          downloadHandler={deleteProject}
        />

      </div>

      <div className='project-div'>
        <Dashboard projects={projects ? projects : []} clickHandler={getProject} />
        {
          currentProjectId ?
            <Form id={currentProjectId} saveHandler={saveProject} deleteHandler={deleteProject} />
            : null
        }
      </div>
    </>
  )
}

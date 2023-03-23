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
    console.log('create')
    // const response = await fetch.post('api/projects');
    // axios
    //   .post('/api/projects', { name: 'test' })
    //   .then((data) => {
    //     console.log(data)
    //     // setProjects(data)
    //     const newProjects = await getProjects();
    //   })
    //   .catch((error) => (console.log('create', error)));

    const response = await axios.post('/api/projects', { name: 'test' });
    const projects = await getProjects();
    console.log('create', projects)
    setProjects(projects);
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

  function getProject(event: React.SyntheticEvent) {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('data-proj-id');
    console.log(id)
    setCurrentProjectId(id);
  };

  function updateProject() {

  };

  function deleteProject(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log('delete')
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
            <Form id={currentProjectId} />
            : null
        }
      </div>
    </>
  )
}

import { useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import Menu from '@/common/components/Menu';
import Dashboard from '@/common/components/Dashboard';
import Form from '@/common/components/Form';
import { fetcher } from '@/common/modules/utils';

import type ProjectType from '@/common/types/ProjectType';

export default function Home() {
  const { data, error } = useSWR<ProjectType[]>('/api/projects', fetcher);
  const [currentProjectId, setCurrentProjectId] = useState('');

  async function createProject(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log('create')
    const response = await fetch.post('api/projects');
  };

  function getProject(event: React.SyntheticEvent) {
    event.preventDefault();
    const id = event.target.getAttribute('data-proj-id');
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
      <Menu
        createHandler={createProject}
        downloadHandler={deleteProject}
      />

      <div className='project-panel'>
        <Dashboard projects={data ? data : []} clickHandler={getProject} />
        {
          currentProjectId ?
            <Form id={currentProjectId} />
            : null
        }
      </div>
    </>
  )
}


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

  function createProject(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log('create')
  };

  function deleteProject(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log('delete')
  };

  function getProject(event: React.SyntheticEvent) {
    event.preventDefault();
    // const {target} = event;
    const id = event.target.getAttribute('data-proj-id');
    console.log(id)
    setCurrentProjectId(id);
  };

  return (
    <>
      <Menu
        createHandler={createProject}
        downloadHandler={deleteProject}
      />

      <div className='project-panel'>

        <div className='dashboard'>
          <Dashboard projects={data ? data : []} clickHandler={getProject} />
        </div>
        <div className='form'>
          {
            currentProjectId ?
              <Form id={currentProjectId} />
              : null
          }
        </div>
      </div>
    </>
  )
}


import useSWR from 'swr';
import Image from 'next/image';
import Menu from '@/common/components/Menu';
import Dashboard from '@/common/components/Dashboard';
import type ProjectType from '@/common/types/ProjectType';

async function fetcher(url: string) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('fetcher', error)
    return error;
  }
}

export default function Home() {
  const { data, error } = useSWR<ProjectType[]>('/api/projects', fetcher);

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
    console.log('getProject')
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
        </div>
      </div>
    </>
  )
}


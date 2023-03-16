import Image from 'next/image';
import Menu from '@/common/components/Menu';
import Dashboard from '@/common/components/Dashboard';

export default function Home() {

  function createProject(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log('create')
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

        <div className='dashboard'>
          <Dashboard />
        </div>

        <div className='form'>
        </div>

      </div>

    </>
  )
}

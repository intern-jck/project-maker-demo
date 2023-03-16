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
    <div className='container'>

      <div className='menu'>
        <Menu
          createHandler={createProject}
          downloadHandler={deleteProject}
        />
      </div>

      <div className='project-panel'>

        <div className='dashboard'>
          <Dashboard />
        </div>

        <div className='form'>
        </div>

      </div>

    </div>
  )
}

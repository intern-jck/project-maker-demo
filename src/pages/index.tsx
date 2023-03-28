import { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Menu from '@/common/components/Menu';
import Dashboard from '@/common/components/Dashboard';
import Form from '@/common/components/Form';
import { fetcher } from '@/common/modules/utils';
import {
  createProject,
  getProjects,
  getProject,
  saveProject,
  deleteProject,
  downloadProjects
} from '@/common/modules/utils/projects';

import type ProjectType from '@/common/types/ProjectType';

export default function Home() {

  // Need to add types...
  const { data, error } = useSWR<ProjectType[]>('/api/projects', fetcher);
  const [currentProjectId, setCurrentProjectId] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState<string>('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      // This data is category data
      getCategories()
        .then((data) => {
          console.log('got cats', data)
          setCategories(data);
        })
        .catch((error) => (console.log(error)));
      // This data is from SWR
      setProjects(data); // lookup error
    }
  }, [data]);



  return (
    <>
      <div className='menu-div'>
        <Menu
          category={category}
          categories={categories}
          addHandler={addCategory}
          changeHandler={updateCategory}
          createHandler={createProject}
          downloadHandler={downloadProjects}
          deleteHandler={deleteCategory}
        />
      </div>

      <div className='project-div'>
        {
          projects.length > 0 ?
            <Dashboard
              category={category}
              projects={projects ? projects : []}
              clickHandler={getProject}
            />
            : <></>
        }
        {
          currentProjectId ?
            <Form
              id={currentProjectId}
              saveHandler={saveProject}
              deleteHandler={deleteProject}
            />
            : <></>
        }
      </div>
    </>
  )
}

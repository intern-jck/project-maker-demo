import { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Menu from '@/common/components/Menu';
import Dashboard from '@/common/components/Dashboard';
import Form from '@/common/components/Form';
import { fetcher } from '@/common/modules/utils';
import type ProjectType from '@/common/types/ProjectType';

export default function Home() {

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

  async function createProject(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      const response = await axios.post('/api/projects', { name: 'test' });
      const projects = await getProjects();
      setProjects(projects);
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  async function getProjects() {
    try {
      const response = axios.get('/api/projects');
      const projects = await response;
      return projects.data;
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  async function getProject(event: React.SyntheticEvent) {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('data-proj-id');
    setCurrentProjectId(id); // lookup error
  };

  async function saveProject(projectData: ProjectType) {
    try {
      const response = await axios.put('/api/projects', { doc: projectData });
      const data = await response.data;
      const projects = await getProjects();
      setProjects(projects);
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  async function deleteProject(event: React.SyntheticEvent) {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('data-project-id');
    try {
      const response = await axios.delete(`/api/projects?id=${id}`);
      const data = await response.data;
      const projects = await getProjects();
      setProjects(projects);
      setCurrentProjectId('')
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  async function downloadProjects() {
    try {
      const projects = await getProjects();
      const projectData = {
        [currentCategory]: projects,
      };
      const filename = `${currentCategory}-proj-json`;
      const json = JSON.stringify(projectData, null, 2);
      const blob = new Blob([json], { type: 'application/json' })
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = filename + '.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObectURL(href);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function addCategory(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    console.log('add cat', category)
    // return;
    try {
      const response = await axios.post('/api/categories', { category: category });
      const categories = await getCategories();
      setCategories(categories);
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  // Could probably be merged with updateTextInput?
  function updateCategory(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { value } = event.currentTarget;
    setCategory(value);
  };

  async function getCategories() {
    try {
      const response = axios.get('api/categories');
      const categories = await response;
      return categories.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function deleteCategory(event: React.SyntheticEvent) {
    const { name, value } = event.currentTarget;
    const id = event.currentTarget.getAttribute('data-project-id');
    console.log('deleteing', name, id)
    try {
      const response = axios.delete(`api/categories?id=${id}`);
      // const categories = await response;
      const categories = await getCategories();
      setCategories(categories);
      setCategory('')
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

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

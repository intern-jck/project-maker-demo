import { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Menu from '@/common/components/Menu';
import Dashboard from '@/common/components/Dashboard';
import Form from '@/common/components/Form';
import { fetcher } from '@/common/modules/utils';
import type ProjectType from '@/common/types/ProjectType';
import type CollectionType from '@/common/types/CollectionType';

export default function Home() {

  // Gets initial data
  const { data, error } = useSWR<ProjectType[]>('/api/projects', fetcher);
  const [currentProjectId, setCurrentProjectId] = useState<string>();
  const [projects, setProjects] = useState<ProjectType[]>();
  const [collection, setCollection] = useState<string>('');
  const [collections, setCollections] = useState<Array<CollectionType>>([]);
  const [currentCollection, setCurrentCollection] = useState<string>();

  useEffect(() => {
    if (data) {
      getCollections()
        .then((collectionData) => {
          setCollections(collectionData);
        })
        .catch((error) => (console.log(error)));
      setProjects(data);
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
        [currentCollection]: projects,
      };
      const filename = `${currentCollection}-proj-json`;
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

  async function addCollection(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    console.log('add cat', collection)
    // return;
    try {
      const response = await axios.post('/api/collections', { name: collection });
      const collections = await getCollections();
      setCollections(collections);
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  // Could probably be merged with updateTextInput?
  function updateCollection(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { value } = event.currentTarget;
    console.log(value)
    setCollection(value);
  };

  async function getCollections() {
    try {
      const response = axios.get('api/collections');
      const collections = await response;
      return collections.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function deleteCollection(event: React.SyntheticEvent) {
    const { name, value } = event.currentTarget;
    const id = event.currentTarget.getAttribute('data-project-id');
    console.log('deleteing', name, id)
    try {
      const response = axios.delete(`api/collections?id=${id}`);
      // const collections = await response;
      const collections = await getCollections();
      setCollections(collections);
      setCollection('')
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  return (
    <>
      <div className='menu-div'>
        {
          // collections ?
          <Menu
            collection={collection}
            collections={collections}
            addHandler={addCollection}
            changeHandler={updateCollection}
            deleteHandler={deleteCollection}
          />
          // : <></>
        }
      </div>

      <div className='project-div'>
        {
          projects ?
            <Dashboard
              collection={collection}
              projects={projects ? projects : []}
              clickHandler={getProject}
              createHandler={createProject}
              downloadHandler={downloadProjects}
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

import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { fetcher, getProjects, getCollections, getCollectionNames, saveProject } from '@/common/modules/utils';

import Collections from '@/common/components/Collections';
import ProjectList from '@/common/components/ProjectList';
import Form from '@/common/components/Form';

import { ProjectType, CollectionType } from '@/common/types';

const defaultCollection: CollectionType = {
  _id: '0',
  name: '',
  projects: []
};

export default function Home() {

  // Get initial project data
  const { data, error } = useSWR<CollectionType[]>('/api/collections', fetcher);

  // const [newCollection, setNewCollection] = useState<string>('');

  const [collectionNames, setCollectionNames] = useState<string[]>([]);
  const [currentCollection, setCurrentCollection] = useState<CollectionType>(defaultCollection);
  const [collections, setCollections] = useState<CollectionType[]>();

  // const [currentProjectId, setCurrentProjectId] = useState('');
  // const [projects, setProjects] = useState<ProjectType[]>();
  // const [currentProject, setCurrentProject] = useState<ProjectType>();

  useEffect(() => {
    if (data) {
      console.log(data)
      setCollections(data);

      // const names = getCollectionNames(data);
      // console.log(names)
      // setCollectionNames(names);

      // getProjects(currentCollection)
      //   .then((_projects) => {
      //     setProjects(_projects);
      //   })
      //   .catch((error) => (console.error(error)));

    }
  }, [data, currentCollection]);

  // ____COLLECTIONS____
  // CRUD Functions to handle Collections
  async function createCollection(newCollectionName: string) {
    console.log('creating', newCollectionName)
    // if (newCollectionName) {
    return;
    try {
      const response = await axios.post('/api/collections', { name: newCollectionName });
      const collections = await getCollections();
      const names = getCollectionNames(collections);
      // setCollectionNames(names);
      // setNewCollection('');
      // setCollections(collections);
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
    // }
  };

  async function deleteCollection(event: React.MouseEvent<HTMLButtonElement>) {
    const id = currentCollection._id;
    if (currentCollection._id !== '0') {
      try {
        const response = await axios.delete(`api/collections?id=${id}`);
        const collections = await getCollections();
        setCurrentCollection(defaultCollection);
        // const names = getCollectionNames(collections);
        // setCollectionNames(names);
        // setCollections(collections);
        return true;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  };

  // Helpers, State Update Handlers, etc...
  // function updateNewCollection(event: React.ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = event.currentTarget;
  //   setNewCollection(value);
  // };

  function updateCurrentCollection(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.currentTarget;

    if (value) {
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].name === value) {
          console.log('selecting', collections[i].name)
          setCurrentCollection(collections[i]);
          return;
        }
      }
    }
    setCurrentCollection(defaultCollection);
    return;
  };

  // ____PROJECTS____
  // CRUD Functions to handle Projects
  async function createProject(event: React.SyntheticEvent) {
    try {
      const response = await axios.post('/api/projects', { name: 'default name', collection_name: currentCollection.name });
      const _projects = await getProjects(currentCollection);
      setProjects(_projects);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  async function getProject(event: React.MouseEvent<HTMLButtonElement>) {
    const id = event.currentTarget.getAttribute('data-folder-id');
    if (id) {
      setCurrentProjectId(id);
    }
  };

  async function deleteProject(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    const id = event.currentTarget.getAttribute('data-project-id');
    try {
      const response = await axios.delete(`/api/projects?id=${id}`);
      const _projects = await getProjects(currentCollection);
      setProjects(_projects);
      setCurrentProjectId('')
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  async function saveProjectHandler(event: React.MouseEvent<HTMLButtonElement>) {
    try {
      if (currentProject) {
        const response = await saveProject(currentProject);
        const _projects = await getProjects(currentCollection);
        setProjects(_projects);
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  return (
    <div className='project-div'>
      <div className='project-dashboard'>
        {
          collections ?
            <Collections
              // newCollection={newCollection}
              // updateNewCollectionHandler={updateNewCollection}
              collectionNames={getCollectionNames(collections)}
              currentCollection={currentCollection}
              createCollectionHandler={createCollection}
              updateCurrentCollectionHandler={updateCurrentCollection}
              deleteCollectionHandler={deleteCollection}
            />
            : <></>
        }

        {/* {
          projects ?
            <ProjectList
              collectionName={currentCollection.name}
              projects={projects}
              createProjectHandler={createProject}
              selectProjectHandler={getProject}
            />
            : <></>
        } */}

      </div>

      <div className='project-form'>
        {/* {
          currentProjectId ?
            <Form
              id={currentProjectId}
              collectionNames={collectionNames}
              saveProjectHandler={saveProject}
              deleteProjectHandler={deleteProject}
            />
            : <></>
        } */}
      </div>
    </div>
  )
}

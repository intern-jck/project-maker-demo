import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';

import Collections from '@/common/components/Collections';
import Projects from '@/common/components/Projects';
// import ProjectForm from '@/common/components/ProjectForm';

import { fetcher, getCollections } from '@/common/modules/utils';
import { CollectionType, ProjectType } from '@/common/types';

const defaultCollection: CollectionType = {
  _id: '',
  name: '',
  projects: [],
};

export default function Home() {

  const { data, error } = useSWR<CollectionType[]>('/api/collections', fetcher);

  const [currentCollection, setCurrentCollection] = useState<CollectionType>(defaultCollection);
  const [collections, setCollections] = useState<CollectionType[]>();
  // const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    if (data) {
      console.log('collections:', data);
      setCollections(data);
    }
  }, [data]);

  // COLLECTIONS FUNCTIONS
  // Move all this into Collections component?
  async function createCollection(collectionName: string) {
    try {
      const response = await axios.post('/api/collections', { name: collectionName });
      await updateCollections();
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  async function selectCollection(collectionId: string) {
    try {
      if (collectionId === '') {
        setCurrentCollection(defaultCollection);
        return true;
      }
      const response = await axios.get(`/api/collections/${collectionId}`);
      const _collection: CollectionType = response.data;
      setCurrentCollection(_collection);
      // const _projects = await getCollectionProjects(collectionId);
      // setProjects(_projects);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  async function updateCollections() {
    try {
      const _collections = await getCollections();
      setCollections(_collections);
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  async function deleteCollection(collectionId: string) {
    try {
      const response = await axios.delete(`/api/collections?id=${collectionId}`);
      await updateCollections();
      await selectCollection('')
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  // async function getCollectionProjects(collectionId: string) {
  //   try {
  //     const response = await axios.get(`/api/projects?collectionId=${collectionId}`);
  //     const _projects = await response.data;
  //     console.log('collection projects: ', _projects)
  //     return _projects;
  //   } catch (error) {
  //     console.error(error);
  //     return error;
  //   }
  // };

  return (
    <div className='project-div'>
      <div className='project-dashboard'>
        <>
          {
            collections ?
              <Collections
                currentCollection={currentCollection}
                collections={collections}
                createCollection={createCollection}
                selectCollection={selectCollection}
                deleteCollection={deleteCollection}
              />
              : <></>
          }
        </>
        <>
          {
            collections ?
              <Projects
                currentCollection={currentCollection}
              // projects={projects}
              // createProject={createProject}
              />
              : <></>
          }
        </>
      </div>

      <div className='project-form'>
        {/* {
          currentProjectId ?
            <ProjectForm
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
};

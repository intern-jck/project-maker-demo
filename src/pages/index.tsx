import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { fetcher, getProjects, getCollections, getCollectionNames, saveProject } from '@/common/modules/utils';

import Collections from '@/common/components/Collections';
// import ProjectList from '@/common/components/ProjectList';
// import Form from '@/common/components/Form';

import { ProjectType, CollectionType } from '@/common/types';

const defaultCollection: CollectionType = {
  _id: '0',
  name: '',
  projects: []
};

export default function Home() {

  // Get initial project data
  const { data, error } = useSWR<CollectionType[]>('/api/collections', fetcher);

  const [currentCollection, setCurrentCollection] = useState<CollectionType>(defaultCollection);
  const [collections, setCollections] = useState<CollectionType[]>();

  useEffect(() => {
    if (data) {
      console.log('app render', data)
      setCollections(data);
    }
  }, [data]);


  async function createCollection(collectionName: string) {
    console.log('creating', collectionName)
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
    console.log('selecting', collectionId)
    try {
      if (collectionId === 'ALL') {
        // const _projects = await getProjects();
        // console.log(_projects)
        setCurrentCollection({});
        return true;
      }
      const response = await axios.get(`/api/collections/${collectionId}`);
      const _collection = response.data;
      console.log('selected', _collection)
      setCurrentCollection({ ..._collection });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  async function updateCollections() {
    try {
      const collections = await getCollections();
      setCollections(collections);
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  async function deleteCollection(collectionId: string) {
    try {
      console.log('deleteing', collectionId)
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  return (
    <div className='project-div'>
      <div className='project-dashboard'>
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

        <>
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
        </>

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

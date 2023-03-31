import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { fetcher } from '@/common/modules/utils';
import Dashboard from '@/common/components/Dashboard';
import Form from '@/common/components/Form';
import type ProjectType from '@/common/types/ProjectType';
import type CollectionType from '@/common/types/CollectionType';

export default function Home() {

  // Get initial project data
  const { data, error } = useSWR<CollectionType[]>('/api/collections', fetcher);

  const [newCollection, setNewCollection] = useState<string>('');
  const [collectionNames, setCollectionNames] = useState<string[]>([]);
  const [currentCollection, setCurrentCollection] = useState<CollectionType>({});
  const [collections, setCollections] = useState<CollectionType[]>([]);

  // const [currentProjectId, setCurrentProjectId] = useState<string>();
  // const [project, setProject] = useState({ });
  // const [projects, setProjects] = useState<ProjectType[]>();

  useEffect(() => {
    if (data) {
      // console.log('app load', data)
      const names = getCollectionNames(collections);
      setCollectionNames(names);
      setCollections(data);
    }
  }, [data]);

  // Functions to handle Collections
  async function createCollection(event: React.MouseEvent<HTMLButtonElement>) {
    if (newCollection) {
      try {
        const response = await axios.post('/api/collections', { name: newCollection });
        const collections = await getCollections();
        const names = getCollectionNames(collections);
        setCollectionNames(names);
        setNewCollection('');
        return true;
      } catch (error) {
        console.error(error);
        return error;
      }
    }
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
  };

  function getCollectionNames(collections: Array<CollectionType>) {
    const names = collections.map((collection: CollectionType) => (collection.name))
    console.log(names);
    setCollectionNames(names);
    return names;
  }


  async function updateNewCollection(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setNewCollection(value);
  }

  async function updateCurrentCollection(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.currentTarget;
    console.log('selecting', value, collections)

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].name === value) {
        setCurrentCollection(collections[i]);
      }
    }
  };

  async function deleteCollection(event: React.MouseEvent<HTMLButtonElement>) {
    const id = currentCollection._id;
    console.log('deleteing', id)
    if (currentCollection._id) {
      try {
        const response = await axios.delete(`api/collections?id=${id}`);
        const collections = await getCollections();
        const names = getCollectionNames(collections);
        setCollectionNames(names);
        setCollections(collections);
        setCurrentCollection({});
        return true;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  }

  return (
    <div className='project-div'>
      {
        <Dashboard
          newCollection={newCollection}
          collectionNames={collectionNames}
          currentCollection={currentCollection}
          createCollectionHandler={createCollection}
          updateNewCollectionHandler={updateNewCollection}
          updateCurrentCollectionHandler={updateCurrentCollection}
          deleteCollectionHandler={deleteCollection}

        // projects={projects ? projects : []}
        />
      }
      {
        // currentProjectId ?
        // <Form
        // id={currentProjectId}
        // saveProjectHandler={saveProject}
        // deleteProjectHandler={deleteProject}
        // />
        // : <></>
      }
    </div>
  )
}

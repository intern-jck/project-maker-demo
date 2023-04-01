import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { fetcher } from '@/common/modules/utils';
import Dashboard from '@/common/components/Dashboard';
import Form from '@/common/components/Form';
import type ProjectType from '@/common/types/ProjectType';
import type CollectionType from '@/common/types/CollectionType';

const defaultCollection: CollectionType = {
  _id: 0,
  name: '',
  projects: []
}

export default function Home() {

  // Get initial project data
  const { data, error } = useSWR<CollectionType[]>('/api/collections', fetcher);
  const [newCollection, setNewCollection] = useState<string>('');
  const [collectionNames, setCollectionNames] = useState<string[]>([]);
  const [currentCollection, setCurrentCollection] = useState<CollectionType>(defaultCollection);
  const [collections, setCollections] = useState<CollectionType[]>([]);

  // const [currentProjectId, setCurrentProjectId] = useState<string>();
  // const [project, setProject] = useState({ });
  // const [projects, setProjects] = useState<ProjectType[]>();

  useEffect(() => {
    if (data) {
      const names = getCollectionNames(data);
      setCollectionNames(names);
      setCollections(data);
    }
  }, [data]);


  // CRUD Functions to handle Collections
  async function createCollection(event: React.MouseEvent<HTMLButtonElement>) {
    if (newCollection) {
      try {
        const response = await axios.post('/api/collections', { name: newCollection });
        const collections = await getCollections();
        console.log('created', newCollection)

        const names = getCollectionNames(collections);
        setCollectionNames(names);

        setNewCollection('');
        setCollections(collections);
        // console.log('created', newCollection, names, collections)
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
      console.log('got', collections.data)
      return collections.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  async function deleteCollection(event: React.MouseEvent<HTMLButtonElement>) {
    const id = currentCollection._id;
    console.log('deleteing', id)

    if (currentCollection._id) {
      try {
        const response = await axios.delete(`api/collections?id=${id}`);
        console.log(response)
        const collections = await getCollections();
        console.log('deleted', id, collections)
        setCurrentCollection(defaultCollection);
        const names = getCollectionNames(collections);
        console.log(names)
        setCollectionNames(names);
        // setCollections(collections);
        return true;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  };

  // Helpers, State Update Handlers, Etc...

  function updateNewCollection(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setNewCollection(value);
  };

  function getCollectionNames(collections: Array<CollectionType>) {
    const names = collections.map((collection: CollectionType) => (collection.name))
    return names;
  };

  function updateCurrentCollection(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.currentTarget;

    console.log('updating', value, collectionNames)

    if (value) {
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].name === value) {
          console.log('current collection:', collections[i].name)
          setCurrentCollection(collections[i]);
          return;
        }
      }
    }

    setCurrentCollection(defaultCollection);
    console.log('deafult collection:', defaultCollection)
    return;

  };


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

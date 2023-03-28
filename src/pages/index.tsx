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
import type CollectionType from '@/common/types/CollectionType';


const defaultCollection: CollectionType = {
  name: 
}


export default function Home() {

  // Need to add types...
  const { data, error } = useSWR<ProjectType[]>('/api/projects', fetcher);
  const [currentProjectId, setCurrentProjectId] = useState<string>();
  const [projects, setProjects] = useState<ProjectType[]>();
  const [collection, setCollection] = useState<CollectionType>();
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

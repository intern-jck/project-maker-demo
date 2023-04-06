import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';

import Collections from '@/common/components/Collections';
import Projects from '@/common/components/Projects';
import Form from '@/common/components/Form';

import { fetcher, getCollections, getProjects, } from '@/common/modules/utils';
import { CollectionType, ProjectType } from '@/common/types';

const defaultCollection: CollectionType = {
  _id: '',
  name: '',
  projects: [],
};

export default function Home({ }) {

  // const { data, error } = useSWR<CollectionType[]>('/api/collections', fetcher);

  const [currentCollection, setCurrentCollection] = useState<CollectionType>(defaultCollection);
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectType>();
  const [projects, setProjects] = useState<ProjectType[]>([]);



  useEffect(() => {
    getCollections()
      .then((collectionData) => {
        setCollections(collectionData);
      })
      .catch(error => console.error(error));

    getProjects()
      .then((projectsData) => {
        setProjects(projectsData)
      })
      .catch(error => console.error(error))
  }, []);


  // do i need async for all this?
  async function createCollection(collectionName: string) {
    try {
      const response = await axios.post('/api/collections', { name: collectionName });
      // await updateCollections();
      console.log(response.data)

      await updateCollections();
      // setCurrentCollection(defaultCollection);
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  function selectCollection(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    const { value } = event.currentTarget;
    console.log('selected', value)
    if (value) {
      for (let collection of collections) {
        if (collection._id === value) {
          setCurrentCollection(collection)
        }
      }
      getProjects(value)
        .then((projectsData) => {
          console.log(projectsData)
          setProjects(projectsData)
        })
        .catch(error => console.error(error))
      return;
    }
    setCurrentCollection(defaultCollection);
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

  async function deleteCollection(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;

    if (!currentCollection._id) {
      console.log('no collection selected')
      return false;
    }

    try {
      console.log('delete', name)
      const response = await axios.delete(`/api/collections?id=${currentCollection._id}`);
      // await updateCollections();

      const _collections = await getCollections();
      setCollections(_collections);
      setCurrentCollection(defaultCollection)
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  async function selectProject(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { value } = event.currentTarget;

    if (value) {
      console.log('selected', value);
      try {
        const response = await axios.get(`api/projects/${value}`);
        const _project: ProjectType = await response.data;
        console.log('selected', _project)
        setCurrentProject(_project);
      } catch (error) {
        console.error(error);
        return error;
      }
    }
  };

  return (
    <div className='project-div'>
      <div className='project-dashboard'>
        <>
          {
            collections ?
              <Collections
                currentCollection={currentCollection}
                collections={collections}
                selectCollection={selectCollection}
                createCollection={createCollection}
                deleteCollection={deleteCollection}
              />
              : <></>
          }
        </>

        <>
          {
            projects.length ?
              <Projects
                currentCollection={currentCollection}
                projects={projects}
                selectProject={selectProject}
              />
              : <></>
          }
        </>
      </div>

      <div className='project-form'>
        {
          currentProject ?
            <Form
              id={currentProject._id}
              // collections={collections}
              projectData={currentProject}
              saveProjectHandler={saveProject}
              deleteProjectHandler={deleteProject}
            />
            : <></>
        }
      </div>
    </div>
  )
};

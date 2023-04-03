import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { fetcher, getProjects, getCollections, getCollectionNames, saveProject } from '@/common/modules/utils';

import Collections from '@/common/components/Collections';
import ProjectList from '@/common/components/ProjectList';
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

  const [currentProject, setCurrentProject] = useState<ProjectType>();
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    if (data) {
      setCollections(data);
      getProjects()
        .then((projects) => {
          setProjects(projects)
        })
        .catch((error) => (console.error(error)))
    }
  }, [data]);

  // COLLECTIONS FUNCTIONS
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
      if (collectionId === 'ALL') {
        console.log('selected all')
        setCurrentCollection({});
        const _projects = await getProjects();
        setProjects(_projects);
        return true;
      }

      console.log('selected', collectionId)
      const response = await axios.get(`/api/collections/${collectionId}`);
      const _collection = response.data;
      setCurrentCollection({ ..._collection });

      const _projects = await getProjects(collectionId);
      setProjects(_projects);
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
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };


  // PROJECTS FUNCTIONS
  async function createProject(collection: CollectionType) {
    try {

      console.log('creating project in collection', currentCollection);
      const response = await axios.post('/api/projects', { name: 'default name', collection_id: collection._id });
      const newProject = await response.data;
      console.log('created project', newProject);
      // setCurrentProject(newProject);
      const _projects = await getProjects();
      setProjects(_projects);
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };


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
          {
            projects ?
              <ProjectList
                currentCollection={currentCollection}
                createProject={createProject}
                projects={projects}
              // selectProjectHandler={getProject}
              />
              : <></>
          }
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

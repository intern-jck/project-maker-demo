import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';

import Collections from '@/common/components/Collections';
import Projects from '@/common/components/Projects';
import Form from '@/common/components/Form';

import { fetcher, getCollections } from '@/common/modules/utils';
import { CollectionType, ProjectType } from '@/common/types';

const defaultCollection: CollectionType = {
  _id: '',
  name: '',
  projects: [],
};

const formDefaults: ProjectType = {
  _id: '',
  link: '',
  collection_name: '',
  collection_id: '',

  name: '',
  date: {
    start_month: '',
    start_year: '',
    end_month: '',
    end_year: '',
  },

  client: '',
  client_url: '',
  short: '',
  info: '',

  tech: [],
  photos: [],
  github_url: '',
};

export default function Home({ }) {

  // const { data, error } = useSWR<CollectionType[]>('/api/collections', fetcher);

  const [currentCollection, setCurrentCollection] = useState<CollectionType>(defaultCollection);
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectType>();

  useEffect(() => {
    getCollections()
      .then((collectionData) => {
        setCollections(collectionData);
        setCurrentCollection(defaultCollection);
      })
      .catch(error => console.error(error));
  }, []);

  // do i need async for all this?
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

  function selectCollection(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.currentTarget;
    console.log('selected', value)

    if (value) {
      for (let collection of collections) {
        if (collection._id === value) {
          setCurrentCollection(collection)
        }
      }
      return;
    }

    console.log('selected', 'ALL');
    setCurrentCollection(defaultCollection);
    return;
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
      const response = await axios.delete(`/api/collections?id=${currentCollection._id}`);
      const _collections = await getCollections();
      setCollections(_collections);
      setCurrentCollection(defaultCollection)
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  // async function downloadCollection() {
  //   try {
  //     const projects = await getProjects();
  //     const collectionName = currentCollection.name;
  //     const projectData = {
  //       [collectionName]: projects,
  //     };
  //     const filename = `${collectionName}`;
  //     const json = JSON.stringify(projectData, null, 2);
  //     const blob = new Blob([json], { type: 'application/json' })
  //     const href: string = URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = href;
  //     link.download = filename + '.json';
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     URL.revokeObectURL(href);
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // };

  function selectProject(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { value } = event.currentTarget;
    axios.get(`api/projects/${value}`)
      .then((response) => {
        const _project = response.data;
        console.log(_project);
        setCurrentProject(_project);
      })
      .catch(error => console.error(error));
  };

  async function deleteProject(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    // const id = event.currentTarget.getAttribute('data-project-id');
    const { id } = event.currentTarget;
    // console.log(id)
    // return;

    try {
      const response = await axios.delete(`/api/projects?id=${id}`);
      // const data = await response.data;
      // const projects = await getProjects();
      // setProjects(projects);
      setCurrentProject({})
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };


  function createProject(event: React.MouseEvent<HTMLButtonElement>) {
    // const { name } = event.currentTarget;

    axios.post('/api/projects', { name: 'default name', collection_id: currentCollection._id })
      .then((response) => {
        const _project = response.data;
        console.log('created', _project)
        setCurrentProject(_project);
      })
      .catch(error => console.error(error));
    // try {
    //   const response = await axios.post('/api/projects', { name: 'default name', collection_id: currentCollection._id });
    //   const newProject = await response.data;
    //   console.log('created project', newProject);
    //   await updateProjects(currentCollection._id);
    //   return true;
    // } catch (error) {
    //   console.log(error);
    //   return error;
    // }
  };

  async function updateProjects(collectionId: string) {
    try {
      const _projects = await getProjects(currentCollection._id);
      // setProjects(_projects);
      return true;
    } catch (error) {
      console.error(error);
      return error;
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
            // projects.length ?
            <Projects
              currentCollection={currentCollection}
              selectProject={selectProject}
              createProject={createProject}
            // projects={projects}
            />
            // : <></>
          }
        </>
      </div>

      <div className='project-form'>
        {/* {
          currentProject ?
            <Form
              id={currentProject._id}
              // collections={collections}
              // projectData={currentProject}
              // saveProjectHandler={saveProject}
              project={currentProject}
              deleteProjectHandler={deleteProject}
            />
            : <></>
        } */}
      </div>
    </div>
  )
};

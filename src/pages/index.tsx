import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';

import Collections from '@/common/components/Collections';
import Projects from '@/common/components/Projects';
import ProjectForm from '@/common/components/ProjectForm';

import { fetcher, getProjects, getCollections } from '@/common/modules/utils';
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

  const { data, error } = useSWR<CollectionType[]>('/api/collections', fetcher);

  const [currentCollection, setCurrentCollection] = useState<CollectionType>(defaultCollection);
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectType>();
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {

    if (data) {
      console.log('render', data)
      setCollections(data);

      getProjects(currentCollection._id)
        .then((projectsData) => {
          console.log('render', projectsData)
          setProjects(projectsData);
        })
        .catch(error => console.error(error));
    }

  }, [data]);

  // COLLECTIONS CRUDS
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

    // console.log('selected', value ? value : 'ALL');

    let _collection = defaultCollection;

    if (value) {
      for (let collection of collections) {
        if (collection._id === value) {
          _collection = collection;
        }
      }
    }

    // console.log(_collection)
    setCurrentCollection(_collection);
    getProjects(_collection._id)
      .then((projectsData) => {
        // console.log('collection projects: ', projectsData)
        setProjects(projectsData)
      })
      .catch(error => console.error(error));

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

  async function downloadCollection() {
    try {
      const projects = await getProjects();
      const collectionName = currentCollection.name;
      const projectData = {
        [collectionName]: projects,
      };
      const filename = `${collectionName}`;
      const json = JSON.stringify(projectData, null, 2);
      const blob = new Blob([json], { type: 'application/json' })
      const href: string = URL.createObjectURL(blob);
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
  };

  // PROJECTS CRUDS
  async function createProject(event: React.MouseEvent<HTMLButtonElement>) {

    // Create random project name as default
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let randomName = '';
    for (let i = 0; i < 8; i++) {
      randomName += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    try {
      await axios.post('/api/projects', { name: `proj-${randomName}`, collection_id: currentCollection._id, collection_name: currentCollection.name });
      await updateProjects(currentCollection._id);
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  function selectProject(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { value } = event.currentTarget;
    axios.get(`api/projects/${value}`)
      .then((response) => {
        const _project = response.data;
        setCurrentProject(_project);
      })
      .catch(error => console.error(error));
  };

  async function deleteProject(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { id } = event.currentTarget;
    console.log('deleting', id)
    try {
      const response = await axios.delete(`/api/projects?id=${id}`);
      await updateProjects(currentCollection._id);
      // reset current project
      setCurrentProject(undefined); // better way to do this?
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  async function updateProjects(collectionId: string) {
    try {
      const _projects = await getProjects(currentCollection._id);
      setProjects(_projects);
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  async function saveProject(projectData: ProjectType) {
    try {
      const response = await axios.put('/api/projects', { doc: projectData });
      const data = await response.data;
      console.log('saving', data)
      // const _projects = await getProjects();
      // setProjects(_projects);
      await updateProjects(currentCollection._id);
      return true;
    } catch (error) {
      console.log(error);
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
            projects ?
              <Projects
                currentCollection={currentCollection}
                selectProject={selectProject}
                createProject={createProject}
                projects={projects}
              />
              : <></>
          }
        </>
      </div>

      <div className='project-form'>
        {
          currentProject ?
            <ProjectForm
              id={currentProject._id}
              // collections={collections}
              project={currentProject}
              saveProject={saveProject}
              deleteProjectHandler={deleteProject}
            />
            : <></>
        }
      </div>
    </div>
  )
};

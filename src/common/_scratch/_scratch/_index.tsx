
import axios from 'axios';
import useSWR from 'swr';

import Collections from '@/common/_scratch/Folders';
import Projects from '@/common/components/Projects/Projects';
import ProjectForm from '@/common/components/ProjectForm/ProjectForm';

import { fetcher, getProjects, getCollections } from '@/common/modules/utils';
import { CollectionType, ProjectType } from '@/common/types';


const defaultCollection: CollectionType = {
  _id: '',
  name: '',
  projects: [],
};

const formDefault: ProjectType = {
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

const { data, error } = useSWR<CollectionType[]>('/api/collections', fetcher);

const [currentCollection, setCurrentCollection] = useState<CollectionType>(defaultCollection);
const [collections, setCollections] = useState<CollectionType[]>([]);
const [currentProject, setCurrentProject] = useState<ProjectType>();
const [projects, setProjects] = useState<ProjectType[]>([]);

useEffect(() => {
  if (data) {
    setCollections(data);
    getProjects('')
      .then((projectsData) => {
        setProjects(projectsData);
      })
      .catch(error => console.error(error));
  }
}, [data]);

// COLLECTIONS CRUDS
async function createCollection(collectionName: string) {
  try {
    if (collections.length >= COLLECTION_LIMIT) {
      window.alert('Collection limit reached!');
      return false;
    }
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
  let _collection = defaultCollection;
  if (value) {
    for (let collection of collections) {
      if (collection._id === value) {
        _collection = collection;
      }
    }
  }

  setCurrentCollection(_collection);
  getProjects(_collection._id)
    .then((projectsData) => {
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
    return false;
  }

  try {
    const response = await axios.delete(`/api/collections?id=${currentCollection._id}`);
    const _collections = await getCollections();
    const _projects = await getProjects(defaultCollection._id);
    setCurrentCollection(defaultCollection)
    setCollections(_collections);
    setProjects(_projects);
    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
};

async function downloadProjects(event: React.MouseEvent<HTMLButtonElement>) {
  // Somewhat hacky, but works.
  try {
    // Get all the projects for the current collection,
    const projects = await getProjects(currentCollection._id);
    const collectionName = currentCollection.name;
    const projectData = {
      [collectionName]: projects,
    };

    // then create the json file,
    const filename = `project-maker-${collectionName ? collectionName : 'all'}`;
    const json = JSON.stringify(projectData, null, 2);

    // then create blob to download from json file,
    const blob = new Blob([json], { type: 'application/json' })
    const href: string = URL.createObjectURL(blob);

    // then create anchor link with href and click to download, 
    // then remove link from DOM.
    const link = document.createElement('a');
    link.href = href;
    link.download = filename + '.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  } catch (error) {
    console.error(error);
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
    if (projects.length >= PROJECT_LIMIT) {
      window.alert('Project limit reached!');
      return false;
    }
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
    // const _projects = await getProjects();
    // setProjects(_projects);
    await updateProjects(currentCollection._id);
    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
};

function closeProject(event: React.MouseEvent<HTMLButtonElement>) {
  event.preventDefault();
  setCurrentProject(undefined); // better way to do this?
};

async function deleteProject(event: React.MouseEvent<HTMLButtonElement>) {
  event.preventDefault();
  const { id } = event.currentTarget;
  try {
    const response = await axios.delete(`/api/projects?id=${id}`);
    await updateProjects(currentCollection._id);
    // reset current project
    setCurrentProject(undefined); // better way to do this?
    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
};
  
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
          projects={projects}
          createProject={createProject}
          selectProject={selectProject}
          downloadProjects={downloadProjects}
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
        collections={collections}
        project={currentProject}
        saveProject={saveProject}
        deleteProject={deleteProject}
        closeProject={closeProject}
      />
      : <></>
  }
</div>
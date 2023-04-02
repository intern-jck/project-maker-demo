
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

// Could probably be merged with updateTextInput?
function updateNewCollection(event: React.ChangeEvent<HTMLInputElement>) {
  event.preventDefault();
  const { value } = event.currentTarget;
  setNewCollection(value);
};

async function deleteCollection(event: React.MouseEvent<HTMLButtonElement>) {
  // const { name, value } = event.currentTarget;
  const id = event.currentTarget.getAttribute('data-project-id');
  console.log('deleteing', id)
  try {
    const response = axios.delete(`api/collections?id=${id}`);
    const collections = await getCollections();
    setCollections(collections);
    setNewCollection('');
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

async function selectCollection(event: React.MouseEvent<HTMLButtonElement>) {
  // const { name, value } = event.currentTarget;
  const id = event.currentTarget.getAttribute('data-folder-id');
  console.log('selecting', id)
  try {
    const response = await axios.get(`api/collections/${id}`);
    const collection = await response.data;
    setCurrentCollection(collection);
    const projects = await getProjects();
    setProjects(projects);
    setCurrentProjectId('');
    return true;
  } catch (error) {
    console.log(error);
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

// Functions to handle Projects
async function createProject(event: React.SyntheticEvent) {
  event.preventDefault();
  console.log(currentCollection.name)
  try {
    const response = await axios.post('/api/projects', { name: 'default name', collection_name: currentCollection.name });
    const projects = await getProjects();
    setProjects(projects);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

async function getProjects() {
  if (currentCollection) {
    try {
      const response = axios.get(`/api/projects?collection=${currentCollection.name}`);
      const projects = await response;
      return projects.data;
    } catch (error) {
      console.log(error)
      return error;
    }
  }
  try {
    const response = axios.get(`/api/projects`);
    const projects = await response;
    return projects.data;
  } catch (error) {
    console.log(error)
    return error;
  }

};

async function getProject(event: React.SyntheticEvent) {
  event.preventDefault();
  const id = event.currentTarget.getAttribute('data-proj-id');
  setCurrentProjectId(id); // lookup error
};

async function saveProject(projectData: ProjectType) {
  try {
    const response = await axios.put('/api/projects', { doc: projectData });
    const data = await response.data;
    const projects = await getProjects();
    setProjects(projects);
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

async function deleteProject(event: React.SyntheticEvent) {
  event.preventDefault();
  const id = event.currentTarget.getAttribute('data-project-id');
  try {
    const response = await axios.delete(`/api/projects?id=${id}`);
    const data = await response.data;
    const projects = await getProjects();
    setProjects(projects);
    setCurrentProjectId('')
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

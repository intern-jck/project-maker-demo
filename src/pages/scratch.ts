
// Functions to handle Projects
async function createProject(event: React.SyntheticEvent) {
  event.preventDefault();
  console.log(currentCollection.name)

  // try {
  //   const response = await axios.post('/api/projects', { name: 'default name', collection_name: currentCollection.name });
  //   const projects = await getProjects();
  //   setProjects(projects);
  //   return response;
  // } catch (error) {
  //   console.log(error);
  //   return error;
  // }

};

// async function getProjects() {

//   if (currentCollection) {
//     try {
//       const response = axios.get(`/api/projects?collection=${currentCollection.name}`);
//       const projects = await response;
//       return projects.data;
//     } catch (error) {
//       console.log(error)
//       return error;
//     }
//   }

//   try {
//     const response = axios.get(`/api/projects`);
//     const projects = await response;
//     return projects.data;
//   } catch (error) {
//     console.log(error)
//     return error;
//   }

// };

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



// function changeHandlerTest(event: React.ChangeEvent<HTMLSelectElement>) {
//   const { name, value } = event.currentTarget;
//   console.log(name, value);
// }
// function clickHandlerTest(event: React.MouseEvent<HTMLButtonElement>) {
//   const { name, value } = event.currentTarget;
//   console.log(name, value);
// }


newCollection: string,

  createCollectionHandler: Function,

    updateNewCollectionHandler: React.ChangeEventHandler,
      // updateCurrentCollectionHandler: React.ChangeEventHandler
      deleteCollectionHandler: React.MouseEventHandler,


        // newCollection,
        collectionNames,
        currentCollection,
        createCollectionHandler,
        updateNewCollectionHandler,
        // updateCurrentCollectionHandler,
        deleteCollectionHandler,




        function setNewCollectionHandler(event: React.ChangeEvent<HTMLInputElement>) {
          const { name, value } = event.currentTarget;
          setNewCollection(value);
        };

const updateNewCollection = useCallback(newCollection) => {
  // const { name, value } = event.currentTarget;
  setNewCollection(newCollection);
}, [newCollection]);

function createNewCollection(event: React.MouseEvent<HTMLButtonElement>) {
  if (newCollection) {
    createCollectionHandler(newCollection);
  }
}




/// index.ts


// const [currentProjectId, setCurrentProjectId] = useState('');
// const [projects, setProjects] = useState<ProjectType[]>();
// const [currentProject, setCurrentProject] = useState<ProjectType>();
// const names = getCollectionNames(data);
// console.log(names)
// setCollectionNames(names);

// getProjects(currentCollection)
//   .then((_projects) => {
//     setProjects(_projects);
//   })
//   .catch((error) => (console.error(error)));
// newCollection={newCollection}
// updateNewCollectionHandler={updateNewCollection}
// createCollectionHandler={createCollection}
// updateCurrentCollectionHandler={updateCurrentCollection}
// deleteCollectionHandler={deleteCollection}

async function deleteCollection(event: React.MouseEvent<HTMLButtonElement>) {
  const id = currentCollection._id;
  if (currentCollection._id !== '0') {
    try {
      const response = await axios.delete(`api/collections?id=${id}`);
      const collections = await getCollections();
      setCurrentCollection(defaultCollection);
      // const names = getCollectionNames(collections);
      // setCollectionNames(names);
      // setCollections(collections);
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

// Helpers, State Update Handlers, etc...
// function updateNewCollection(event: React.ChangeEvent<HTMLInputElement>) {
//   const { name, value } = event.currentTarget;
//   setNewCollection(value);
// };

function updateCurrentCollection(event: React.ChangeEvent<HTMLSelectElement>) {
  const { name, value } = event.currentTarget;

  if (value) {
    for (let i = 0; i < collections.length; i++) {
      if (collections[i].name === value) {
        console.log('selecting', collections[i].name)
        setCurrentCollection(collections[i]);
        return;
      }
    }
  }
  setCurrentCollection(defaultCollection);
  return;
};

// ____PROJECTS____
// CRUD Functions to handle Projects


async function getProject(event: React.MouseEvent<HTMLButtonElement>) {
  const id = event.currentTarget.getAttribute('data-folder-id');
  if (id) {
    setCurrentProjectId(id);
  }
};

async function deleteProject(event: React.MouseEvent<HTMLButtonElement>) {
  event.preventDefault();
  const { name, value } = event.currentTarget;
  const id = event.currentTarget.getAttribute('data-project-id');
  try {
    const response = await axios.delete(`/api/projects?id=${id}`);
    const _projects = await getProjects(currentCollection);
    setProjects(_projects);
    setCurrentProjectId('')
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

async function saveProjectHandler(event: React.MouseEvent<HTMLButtonElement>) {
  try {
    if (currentProject) {
      const response = await saveProject(currentProject);
      const _projects = await getProjects(currentCollection);
      setProjects(_projects);
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

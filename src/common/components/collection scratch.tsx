// COLLECTIONS FUNCTIONS
// Move all this into Collections component?


async function selectCollection(collectionId: string) {
  try {

    if (collectionId === '') {
      setCurrentCollection(defaultCollection);
      return true;
    }

    const response = await axios.get(`/api/collections/${collectionId}`);
    const _collection: CollectionType = response.data;
    setCurrentCollection(_collection);

    // const _projects = await getProjects(collectionId);
    // setProjects(_projects);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};






// const [currentCollection, setCurrentCollection] = useState<string>('');
// const [collections, setCollections] = useState<CollectionType[]>();
// const [projects, setProjects] = useState<ProjectType[]>([]);

// useEffect(() => {
//   if (data) {
//     // console.log('collections:', data);
//     setCollections(data);
//   }
//   // getProjects()
//   //   .then((_projects) => (console.log(_projects)))
//   //   .catch((error) => (console.error(error)));
// }, [data]);

// async function getCollectionProjects(collectionId: string) {
//   try {
//     const response = await axios.get(`/api/projects?collectionId=${collectionId}`);
//     const _projects = await response.data;
//     console.log('collection projects: ', _projects)
//     return _projects;
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// };


function setNewCollectionHandler(event: React.ChangeEvent<HTMLInputElement>) {
  event.preventDefault();
  const { name, value } = event.currentTarget;
  setNewCollection(value);
};

function createCollectionHandler(event: React.MouseEvent<HTMLButtonElement>) {
  event.preventDefault();
  const { name, value } = event.currentTarget;
  createCollection(newCollection);
  setNewCollection('')
};

function deleteCollectionHandler(event: React.MouseEvent<HTMLButtonElement>) {
  event.preventDefault();
  deleteCollection(currentCollection._id);
};






  // const [collections, setCollections] = useState<CollectionType[]>([]);

  // useEffect(() => {
  //   // if (data) {
  //   //   console.log('collections:', data);
  //   //   setCollections(data);
  //   // }
  // }, []);

  // function selectCollectionHandler(event: React.ChangeEvent<HTMLSelectElement>) {
  //   event.preventDefault();
  //   const { value } = event.currentTarget;
  //   console.log('selecting', value);

  //   if (value) {
  //     for (let collection of collections) {
  //       if (collection._id === value) {
  //         selectCollection(collection)
  //       }
  //     }
  //     return;
  //   }
  //   selectCollection(defaultCollection);
  // };
































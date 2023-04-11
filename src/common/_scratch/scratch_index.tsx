
  // COLLECTIONS CRUDS



  // async function downloadProjects(event: React.MouseEvent<HTMLButtonElement>) {
  //   // Somewhat hacky, but works.
  //   try {
  //     // Get all the projects for the current collection,
  //     const projects = await getProjects(currentCollection._id);
  //     const collectionName = currentCollection.name;
  //     const projectData = {
  //       [collectionName]: projects,
  //     };

  //     // then create the json file,
  //     const filename = `project-maker-${collectionName ? collectionName : 'all'}`;
  //     const json = JSON.stringify(projectData, null, 2);

  //     // then create blob to download from json file,
  //     const blob = new Blob([json], { type: 'application/json' })
  //     const href: string = URL.createObjectURL(blob);

  //     // then create anchor link with href and click to download, 
  //     // then remove link from DOM.
  //     const link = document.createElement('a');
  //     link.href = href;
  //     link.download = filename + '.json';
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     URL.revokeObjectURL(href);
  //   } catch (error) {
  //     console.error(error);
  //     return error;
  //   }
  // };


  // function selectProject(event: React.MouseEvent<HTMLButtonElement>) {
  //   event.preventDefault();
  //   const { value } = event.currentTarget;
  //   axios.get(`api/projects/${value}`)
  //     .then((response) => {
  //       const _project = response.data;
  //       setCurrentProject(_project);
  //     })
  //     .catch(error => console.error(error));
  // };


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



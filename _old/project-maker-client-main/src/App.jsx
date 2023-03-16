import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Form from './components/Form/Form.jsx';
import './App.scss';

import { atlasApi } from './mongo-api'

const App = () => {
  const [projects, setProjects] = useState();
  const [currentProject, setCurrentProject] = useState();
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    getProjects();
  }, []);

  // CRUD OPS FOR MONGO DB
  function createProject() {
    atlasApi.createProject()
      .then((data) => {
        getProjects();
      })
      .catch((error) => (console.log('create error', error)));
  };

  function getProjects() {
    atlasApi.getProjects()
      .then((data) => {
        setProjects(data);
        setCurrentProject(data[0]);
        // console.log(data[0])
      })
      .catch((error) => (console.log('get projects', error)));
  };

  function getProject(id) {
    atlasApi.getProject(id)
      .then((data) => {
        setCurrentProject(data);
      })
      .catch((error) => (console.log('get project', error)));
  };

  function updateProject(formData) {
    atlasApi.updateProject(formData)
      .then((data) => {
        getProjects();
      })
      .catch((error) => (console.log('update error', error)));
  };

  function deleteProject(id) {
    atlasApi.deleteProject(id)
      .then((data) => {
        getProjects();
        setCurrentProject(null);
      })
      .catch((error) => (console.log('delete error', error)));
  };

  // SITE OPS
  function selectProject(event) {
    const projId = event.target.getAttribute('data-proj-id');
    console.log('getting', projId)
    if (projId) {
      getProject(projId);
    }
  };

  function downloadProjects() {
    atlasApi.getProjectsJson()
      .then((data) => {
        console.log(data);
        const projectData = {
          [currentCategory]: data,
        };
        const filename = `${currentCategory}-proj-json`;
        const json = JSON.stringify(projectData, null, 2);
        const blob = new Blob([json], { type: 'application/json' })
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = filename + '.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObectURL(href);
      })
      .catch((error) => (console.log('download error:', error)));
  };

  return (
    <>
      <Navbar
        createHandler={createProject}
        downloadHandler={downloadProjects}
      />
      <div id='project-maker-app'>
        {
          projects ?
            <Dashboard
              projects={projects}
              clickHandler={selectProject}
            /> :
            null
        }
        {
          currentProject ?
            <Form
              project={currentProject}
              submitHandler={updateProject}
              deleteHandler={deleteProject}
            /> :
            null
        }
      </div>
    </>
  );
};

export default App;

import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import {Dashboard} from '@/common/components/Dashboard';
import {ProjectForm} from '@/common/components/ProjectForm';
import {Projects} from '@/common/components/Projects';

import {FolderType, ProjectType} from '@/common/types';
import {defaultFolder, defaultProject } from '@/common/defaults';
// import { fetcher, getProject, getProjects, getFolders, putProject } from '@/common/modules/utils';
import { fetcher } from '@/common/modules/utils';

const FOLDER_LIMIT = 5;
const PROJECT_LIMIT = 20;

export default function Home({ }) {

  const { data, error, mutate } = useSWR<FolderType[]>('/api/folders', fetcher);

  const [ currentFolder, setCurrentFolder ] = useState<FolderType>(defaultFolder);
  const [ folders, setFolders ] = useState<Array<FolderType>>(data);
  const [ currentProject, setCurrentProject ] = useState<ProjectType | undefined>();
  const [ projects, setProjects ] = useState<Array<ProjectType>>([]);

  // useEffect(() => {
  //     if (data) {
  //       setFolders(data);
  //       getProjects('')
  //         .then((projectsData) => {
  //           setProjects(projectsData);
  //         })
  //         .catch(error => console.error(error));
  //     }
  //   }, [data]);

  // FOLDERS FUNCTIONS
  async function getFolders() {
    try {
      // const _collections = await getFolders();
      // setFolders(_collections);
      const response = await axios.get('api/folders');
      const _collections = await response.data;
      mutate(_collections);
      return true;
    } catch (error) {
      console.error('getFolders:', error);
      return error;
    }
  };

  async function createFolder(folderName: string) {
    try {
      if (folders.length >= FOLDER_LIMIT) {
        window.alert('Folder limit reached!');
        return false;
      }
      const response = await axios.post('/api/folders', { name: folderName });
      await getFolders();
      return true;
    } catch (error) {
      console.error('create folder', error);
      return error;
    }
  };

  async function selectFolder(folderId:string) {
    let _folder = defaultFolder;
    if (folderId) {
      for (let folder of data) {
        if (folder._id === folderId) {
          _folder = folder;
        }
      }
    }
    setCurrentFolder(_folder);
    try {
      await getProjects(folderId);
      return true;
    } catch(error) {
      console.error('select folder', error);
      return false;
    }
  };

  async function deleteFolder(folderId: string) {

    console.log('delete folder', folderId);

    if (!currentFolder._id) {
      return false;
    }

    try {
      const response = await axios.delete(`/api/folders?id=${folderId}`);
      await getFolders();
      setCurrentFolder(defaultFolder)
      // const _projects = await getProjects(defaultFolder._id);
      // setFolders(_folders);
      // setProjects(_projects);
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  // PROJECTS FUNCTIONS
  async function getProjects(folderId: string) {
    try {
      const response = axios.get(`/api/projects?folderId=${folderId}`);
      const _projects = await response;
      return _projects.data;
    } catch (error) {
      console.error(error)
      return error;
    }
    // try {
    //   const _projects = await getProjects(folderId);
    //   setProjects(_projects);
    //   console.log('update projects', _projects)
    //   return true;
    // } catch (error) {
    //   console.error(error);
    //   return error;
    // }
  };

  async function createProject() {

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
      const body = {
        name: `proj-${randomName}`, 
        folder_id: currentFolder._id, 
        folder_name: currentFolder.name
      }
      await axios.post('/api/projects', body);
      await getProjects(currentFolder._id);
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  async function selectProject(projectId: string) {

    try {
      const response = await axios.get(`/api/projects/${projectId}`);
      const _project = await response.data;
      setCurrentProject(_project);
      return true;
    } catch (error) {
      console.error(error)
      return error;
    }

    // try {
    //   const _project = await getProject(projectId);
    //   setCurrentProject(_project);
    //   return true;
    // } catch(error) {
    //   console.error(error);
    //   return false;
    // }
  };
  
  async function saveProject(projectData: ProjectType) {
    try {
      const response = await axios.put('/api/projects', { doc: projectData });
      await getProjects(currentFolder._id);
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  async function deleteProject(projectId: string) {
    try {
      const response = await axios.delete(`/api/projects?id=${projectId}`);
      await getProjects(currentFolder._id);
      setCurrentProject(undefined); // better way to do this?
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  function closeProject() {
    setCurrentProject(undefined);
  };

  return (
    <>
      <div className={'side-panel'}>
        {
          data ?
          <Dashboard
            currentFolder={currentFolder}
            folders={data}
            createFolder={createFolder}
            selectFolder={selectFolder}
            deleteFolder={deleteFolder}
            createProject={createProject}
          />
          : <></>
        }
        {
          projects.length ?
          <Projects
            currentFolder={currentFolder}
            projects={projects}
            selectProject={selectProject}
          />
          : <></>
        }
      </div>

      <div className={'project-panel'}>
        {
          currentProject ?
          <ProjectForm 
            folders={folders}
            project={currentProject}
            saveProject={saveProject}
            deleteProject={deleteProject}
            closeProject={closeProject}
          />
          : <></>
        }


      </div>

    </>
  )
};

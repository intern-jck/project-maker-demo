import { useState } from 'react';
import axios from 'axios';

import {Dashboard} from '@/common/components/Dashboard';
import {ProjectForm} from '@/common/components/ProjectForm';
import {Projects} from '@/common/components/Projects';

import {FolderType, ProjectType} from '@/common/types';
import {defaultFolder } from '@/common/defaults';
import { useFolders, useProjects } from '@/common/hooks';

const FOLDER_LIMIT = 5;
const PROJECT_LIMIT = 20;

export default function Home({ }) {

  const { folders, foldersError, foldersLoading, mutateFolders } = useFolders();
  const { projects, projectsError, projectsLoading, mutateProjects } = useProjects();

  const [ currentFolder, setCurrentFolder ] = useState<FolderType>(defaultFolder);
  const [ currentProject, setCurrentProject ] = useState<ProjectType | undefined>();

  // FOLDERS FUNCTIONS
  async function getFolders() {
    try {
      const response = await axios.get('api/folders');
      const _folders = await response.data;
      mutateFolders(_folders);
      return true;
    } catch (error) {
      console.error('getFolders:', error);
      return error;
    }
  };

  async function createFolder(folderName: string) {
    try {
      if (folders && folders.length >= FOLDER_LIMIT) {
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

    if (folderId && folders) {
      for (let folder of folders) {
        if (folder._id === folderId) {
          _folder = folder;
        }
      }
    };

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
    if (!currentFolder._id) {
      return false;
    }
    try {
      const response = await axios.delete(`/api/folders?id=${folderId}`);
      await getFolders();
      setCurrentFolder(defaultFolder)
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  // PROJECTS FUNCTIONS
  async function getProjects(folderId: string) {
    try {
      const response = await axios.get(`/api/projects?folderId=${folderId}`);
      const _projects = await response.data;
      mutateProjects(_projects);
      return true;
    } catch (error) {
      console.error(error)
      return error;
    }
  };

  async function createProject() {

    // Create random project name as default
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let randomName = '';
    for (let i = 0; i < 8; i++) {
      randomName += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    try {
      if (projects && projects.length >= PROJECT_LIMIT) {
        window.alert('Project limit reached!');
        return false;
      }
      const body = {
        name: `project-${randomName}`, 
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

  if (foldersError) return <div>Failed to fetch folders.</div>
  if (projectsError) return <div>Failed to fetch projjects.</div>
  if (foldersLoading) return <h2>Loading folders...</h2>
  if (projectsLoading) return <h2>Loading projects...</h2>

  return (
    <>
      <div className={'side-panel'}>
        {
          folders ?
          <Dashboard
            currentFolder={currentFolder}
            folders={folders}
            createFolder={createFolder}
            selectFolder={selectFolder}
            deleteFolder={deleteFolder}
            createProject={createProject}
          />
          : <></>
        }
        {
          projects ?
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
            folders={folders ? folders : []}
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

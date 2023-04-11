import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import {Dashboard} from '@/common/components/Dashboard';
import {ProjectForm} from '@/common/components/ProjectForm';
import {Projects} from '@/common/components/Projects';

import {FolderType, ProjectType} from '@/common/types';
import {defaultFolder, defaultProject } from '@/common/defaults';
import { fetcher, getProject, getProjects, getFolders } from '@/common/modules/utils';

const FOLDER_LIMIT = 5;
const PROJECT_LIMIT = 20;

export default function Home({ }) {

  const { data, error } = useSWR<FolderType[]>('/api/folders', fetcher);

  const [ currentFolder, setCurrentFolder ] = useState<FolderType>(defaultFolder);
  const [ folders, setFolders ] = useState<Array<FolderType>>([]);
  const [ currentProject, setCurrentProject ] = useState<ProjectType | undefined>();
  const [ projects, setProjects ] = useState<Array<ProjectType>>([]);

  useEffect(() => {
      if (data) {
        setFolders(data);
        getProjects('')
          .then((projectsData) => {
            setProjects(projectsData);
          })
          .catch(error => console.error(error));
      }
    }, [data]);

  // FOLDERS FUNCTIONS

  async function updateFolders() {
    try {
      const _collections = await getFolders();
      setFolders(_collections);
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  async function createFolder(folderName: string) {
    try {
      if (folders.length >= FOLDER_LIMIT) {
        window.alert('Folder limit reached!');
        return false;
      }
      console.log('create new folder');
      const response = await axios.post('/api/folders', { name: folderName });
      await updateFolders();
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  async function selectFolder(folderId:string) {
    console.log('select folder', folderId);

    let _folder = defaultFolder;
    if (folderId) {
      for (let folder of folders) {
        if (folder._id === folderId) {
          _folder = folder;
        }
      }
    }

    setCurrentFolder(_folder);
    try {
      await updateProjects(folderId);
      return true;
    } catch(error) {
      console.error(error);
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
      const _folders = await getFolders();
      const _projects = await getProjects(defaultFolder._id);
      setCurrentFolder(defaultFolder)
      setFolders(_folders);
      setProjects(_projects);
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  // PROJECTS FUNCTIONS
  async function updateProjects(folderId: string) {
    try {
      const _projects = await getProjects(folderId);
      setProjects(_projects);
      console.log('update projects', _projects)
      return true;
    } catch (error) {
      console.error(error);
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
      await updateProjects(currentFolder._id);
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  async function selectProject(projectId: string) {
    console.log('select project', projectId);
    // setCurrentProject(value)
    try {
      const _project = await getProject(projectId);
      console.log('selected project', _project)
      setCurrentProject(_project);
      return true;
    } catch(error) {
      console.error(error);
      return false;
    }

  };

  async function deleteProject(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { id } = event.currentTarget;
    try {
      const response = await axios.delete(`/api/projects?id=${id}`);
      await updateProjects(currentFolder._id);
      // reset current project
      setCurrentProject(undefined); // better way to do this?
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

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
        <ProjectForm 
          project={currentProject}
        />
      </div>

    </>
  )
};

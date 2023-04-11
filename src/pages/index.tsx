import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import {Dashboard} from '@/common/components/Dashboard';
import {ProjectForm} from '@/common/components/ProjectForm';
import {Projects} from '@/common/components/Projects';

import {FolderType, ProjectType} from '@/common/types';
import {defaultFolder, defaultProject } from '@/common/defaults';
import { fetcher, getProjects, getFolders } from '@/common/modules/utils';

const FOLDER_LIMIT = 10;
const PROJECT_LIMIT = 20;

export default function Home({ }) {

  const { data, error } = useSWR<FolderType[]>('/api/folders', fetcher);

  const [ currentFolder, setCurrentFolder ] = useState<FolderType>(defaultFolder);
  const [ folders, setFolders ] = useState<Array<FolderType>>([]);
  const [ currentProject, setCurrentProject ] = useState<ProjectType>(defaultProject);
  const [ projects, setProjects ] = useState<Array<ProjectType>>([]);

  useEffect(() => {
    console.log('render')
      if (data) {
        console.log(data)
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

  function selectProject(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const {name, value} = event.currentTarget;
    console.log('select project', name, value);
    // setCurrentProject(value)
  };

  async function downloadProjects(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log('download projects');
    // call to api
    // create blob and download all projects
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
            createProject={createProject}
            downloadProjects={downloadProjects}
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
        <ProjectForm />
      </div>

    </>
  )
};

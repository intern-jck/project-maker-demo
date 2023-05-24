import { useState, useEffect } from 'react';
import axios from 'axios';

import { FolderList, ProjectList, ProjectForm } from '@/common/components';

import { FolderType, ProjectType } from '@/common/types';
import { defaultFolder } from '@/common/defaults';
import { useFolders, useProjects } from '@/common/hooks';

import { CgChevronRight } from  'react-icons/cg';

const FOLDER_LIMIT = 5;
const PROJECT_LIMIT = 20;

export default function Home({}) {
  
  const { folderData, foldersError, foldersLoading, mutateFolders } = useFolders();
  const { projectsData, projectsError, projectsLoading, mutateProjects } = useProjects();

  const [ currentFolder, setCurrentFolder ] = useState<FolderType>(defaultFolder);
  const [ currentProject, setCurrentProject ] = useState<ProjectType | undefined>();

  const [ showDashboard, setShowDashboard ] = useState<Boolean>(false);

  const [ projects, setProjects ] = useState<Array<ProjectType>>();

  useEffect(() => {
    if (projectsData) {
      setProjects(projectsData)
    }
  }, [projectsData]);

  // Dashboard

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
      if (folderData && folderData.length >= FOLDER_LIMIT) {
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

    if (folderId && folderData) {
      for (let folder of folderData) {
        if (folder._id === folderId) {
          _folder = folder;
        }
      }
    };

    setCurrentFolder(_folder);

    try {
      const _projects = await getProjects(folderId);
      console.log(_projects)
      setProjects(_projects);

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
      const _projects = await getProjects(defaultFolder._id);      
      setProjects(_projects);
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
      return _projects;
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
      if (projectsData && projectsData.length >= PROJECT_LIMIT) {
        window.alert('Project limit reached!');
        return false;
      }
      const body = {
        name: `project-${randomName}`,
        folder_id: currentFolder._id,
        folder_name: currentFolder.name
      }
      await axios.post('/api/projects', body);
      const _projects = await getProjects(currentFolder._id);
      setProjects(_projects);
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
      setShowDashboard(false);
      return true;
    } catch (error) {
      console.error(error)
      return error;
    }
  };

  function toggleDashboard(event: React.MouseEvent<HTMLButtonElement>) {
    setShowDashboard(!showDashboard);
  };


  // Project Form

  // PROJECT FORM FUNCTIONS
  async function saveProject(projectData: ProjectType) {
    try {
      const response = await axios.put('/api/projects', { doc: projectData });
      const _projects = await getProjects(currentFolder._id);
      setProjects(_projects);
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  async function deleteProject(projectId: string) {
    try {
      const response = await axios.delete(`/api/projects?id=${projectId}`);
      const _projects = await getProjects(currentFolder._id);
      setProjects(_projects);
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
      <div className={`dashboard`} >

        <div className={`ham-button ${showDashboard ? 'button-open' : 'button-closed'}`}>
          <button onClick={toggleDashboard}>
            <CgChevronRight />
          </button>
        </div>

        <div id={'dashboard-content'} className={`dashboard-content  ${showDashboard ? 'show-dashboard' : ''}`}>
          {
            folderData ? (
              <FolderList
                currentFolder={currentFolder}
                folders={folderData}
                createFolder={createFolder}
                selectFolder={selectFolder}
                deleteFolder={deleteFolder}
                createProject={createProject}
              />
            ) : (
              <></>
            )
          }

          {
            projects ? (
              <ProjectList
                projects={projects}
                selectProject={selectProject}
              />
            ) : (
              <></>
            )
          }
        </div>
      </div>

      <div className={'project-panel'}>
        {
          currentProject ?
          <ProjectForm 
            folders={folderData ? folderData : []}
            project={currentProject}
            saveProject={saveProject}
            deleteProject={deleteProject}
            closeProject={closeProject}
          />
          : <></>
        }
      </div>
    </>
  );
}

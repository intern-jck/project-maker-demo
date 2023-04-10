import { useState } from 'react';
import { TextInput, SelectInput } from '@/common/components/Inputs';
import { CgAddR, CgTrash } from 'react-icons/cg';
import { GoFileMedia, GoDesktopDownload } from "react-icons/go";

import type { FolderType, ProjectType } from '@/common/types';

import { defaultFolder, defaultProject } from '@/common/defaults';

import styles from '@/styles/components/Dashboard.module.scss';

import Projects from './Projects';

export default function DashboardComponent() {

  const [ newFolder, setNewFolder ] = useState<string>('');
  const [ currentFolder, setCurrentFolder ] = useState<FolderType>(defaultFolder);
  const [ folders, setFolders ] = useState<Array<FolderType>>([]);
  const [ projects, setProjects ] = useState<Array<ProjectType>>([defaultProject]);
  
  function updateNewFolder(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const {name, value} = event.currentTarget;
    console.log(name, value);
    setNewFolder(value);
  };

  async function createNewFolder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('create new folder');
    // call to api
  };

  async function deleteProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('delete folder');
    // call to api
  };

  function selectFolder(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    console.log('select folder');
    const {name, value} = event.currentTarget;
    // setCurrentFolder(value)
  };

  async function createProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('create project');
    // call to api
  };

  async function downloadProjects(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log('download projects');
    // call to api
    // create blob and download all projects
  };
  
  return (
    <div className={styles.dashboard}>

      <div className={styles.dashboardMenu}>
        <form className={styles.newFolderForm} onSubmit={createNewFolder}>
          <TextInput 
              inputName={'new-folder-input'}
              value={newFolder} 
              changeHandler={updateNewFolder}
          />
          <button type={'submit'}>
            <CgAddR />
          </button>
        </form>
        <form className={styles.selectFolderForm} onSubmit={deleteProject}>
          <SelectInput
            inputName={'folders-select'}
            value={currentFolder._id}
            options={folders.map((folder) => ({name: folder.name, value: folder._id}))}
            changeHandler={selectFolder}
          />
          <button type={'submit'}>
            <CgTrash />
          </button>
        </form>
        <form className={styles.createProjectForm} onSubmit={createProject}>
          FOLDER: FOLDER_NAME
          <button type={'submit'}>
            <GoFileMedia />
          </button>
          <button name='download-projects' onClick={downloadProjects}>
            <GoDesktopDownload />
          </button>
        </form>
      </div>

    {
      projects.length ?
      <Projects 
        projects={projects}
      />
      : <></>
    }

    </div>
  );
};

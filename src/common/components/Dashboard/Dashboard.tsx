import { useState } from 'react';
import { TextInput, SelectInput } from '@/common/components/Inputs';
import { CgAddR, CgTrash } from 'react-icons/cg';
import { GoFileMedia, GoDesktopDownload } from "react-icons/go";

import type { FolderType, ProjectType } from '@/common/types';
import { defaultFolder, defaultProject } from '@/common/defaults';

import styles from '@/styles/components/Dashboard.module.scss';

type Props = {
  currentFolder: FolderType,
  folders: FolderType[],
  createProject: React.FormEventHandler,
  downloadProjects: React.MouseEventHandler,
}

export default function DashboardComponent({
  currentFolder,
  folders,
  createProject,
  downloadProjects
}: Props) {

  const [ newFolder, setNewFolder ] = useState<string>('');
  
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

  function selectFolder(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    console.log('select folder');
    const {name, value} = event.currentTarget;
    // setCurrentFolder(value)
  };

  async function deleteFolder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('delete folder');
    // call to api
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
        <form className={styles.selectFolderForm} onSubmit={deleteFolder}>
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

    </div>
  );
};

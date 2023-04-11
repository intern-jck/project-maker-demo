import { useState } from 'react';
import { TextInput, SelectInput } from '@/common/components/Inputs';
import { CgAddR, CgTrash } from 'react-icons/cg';
import { GoFileMedia, GoDesktopDownload } from "react-icons/go";
import type { FolderType } from '@/common/types';
import styles from '@/styles/components/Dashboard.module.scss';

type Props = {
  currentFolder: FolderType,
  folders: FolderType[],
  createFolder: Function,
  selectFolder: Function,
  createProject: Function,
  deleteFolder: Function,
  downloadProjects: React.MouseEventHandler,
}

export default function DashboardComponent({
  currentFolder,
  folders,
  createFolder,
  selectFolder,
  deleteFolder,
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

  function createFolderHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createFolder(newFolder);
  };

  function selectFolderHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    const {name, value} = event.currentTarget;
    selectFolder(value);
  };

  function deleteFolderHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    deleteFolder(currentFolder._id);
  };

  function createProjectHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('create project');
    createProject();
  };


  function formatOptions() {

  };

  return (
    <div className={styles.dashboard}>

      <div className={styles.dashboardMenu}>
        <form className={styles.newFolderForm} onSubmit={createFolderHandler}>
          <TextInput 
              inputName={'new-folder-input'}
              value={newFolder} 
              changeHandler={updateNewFolder}
          />
          <button type={'submit'}>
            <CgAddR />
          </button>
        </form>
        <form className={styles.selectFolderForm} onSubmit={deleteFolderHandler}>
          <SelectInput
            inputName={'folders-select'}
            value={currentFolder._id}
            options={folders}
            changeHandler={selectFolderHandler}
          />
          <button type={'submit'}>
            <CgTrash />
          </button>
        </form>
        <form className={styles.createProjectForm} onSubmit={createProjectHandler}>
          FOLDER: {currentFolder.name}
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

import { useState } from 'react';
import { TextInput, FolderSelect } from '@/common/components/Inputs';
import { CgAddR, CgTrash } from 'react-icons/cg';
import type { FolderType } from '@/common/types';
import styles from '@/styles/components/Dashboard.module.scss';

type Props = {
  currentFolder: FolderType,
  folders: FolderType[],
  createFolder: Function,
  selectFolder: Function,
  deleteFolder: Function,
}

export default function DashboardComponent({
  currentFolder,
  folders,
  createFolder,
  selectFolder,
  deleteFolder,
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
    setNewFolder('');
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
          <FolderSelect
            inputName={'folders-select'}
            value={currentFolder._id}
            options={folders}
            changeHandler={selectFolderHandler}
          />
          <button type={'submit'}>
            <CgTrash />
          </button>
        </form>
      </div>

    </div>
  );
};

import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';

import {Dashboard} from '@/common/components/Dashboard';
import {FolderType} from '@/common/types';
import {defaultFolder } from '@/common/defaults';
import { fetcher } from '@/common/modules/utils';

const FOLDER_LIMIT = 5;

export default function Home({ }) {

  const { data, error } = useSWR<FolderType[]>('/api/folders', fetcher);

  const [ currentFolder, setCurrentFolder ] = useState<FolderType>(defaultFolder);
  const [ folders, setFolders ] = useState<Array<FolderType>>([]);

  useEffect(() => {
      if (data) {
        setFolders(data);
      }
    }, [data]);

  // FOLDERS FUNCTIONS
  async function updateFolders() {
    try {
      const response = await axios.get('api/folders');
      const _folders = await response.data;
      console.log('updated folders', _folders);
      setFolders(_folders);
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
      console.log('create folder', folderName);
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
  };

  async function deleteFolder(folderId: string) {

    if (!currentFolder._id) {
      return false;
    }

    try {
      const response = await axios.delete(`/api/folders?id=${folderId}`);
      console.log('deleted folder', folderId);
      await updateFolders();
      setCurrentFolder(defaultFolder)
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
          />
          : <></>
        }
      </div>

      <div className={'project-panel'}>
      </div>

    </>
  )
};

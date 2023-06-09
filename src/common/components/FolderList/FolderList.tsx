import { useState } from "react";
import axios from 'axios';

import { TextInput, FolderSelect } from "@/common/components/Inputs";
import { CgAddR, CgTrash } from "react-icons/cg";
import { GoFileMedia, GoDesktopDownload } from "react-icons/go";

import type { FolderType } from "@/common/types";
import styles from "./FolderList.module.scss";

type Props = {
  currentFolder: FolderType;
  folders: FolderType[];
  createFolder: Function;
  selectFolder: Function;
  createProject: Function;
  deleteFolder: Function;
};

export default function FolderListComponent({
  currentFolder,
  folders,
  createFolder,
  selectFolder,
  deleteFolder,
  createProject,
}: Props) {

  const [newFolder, setNewFolder] = useState<string>("");

  function updateNewFolder(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    console.log(name, value);
    setNewFolder(value);
  };

  function createFolderHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createFolder(newFolder);
    setNewFolder("");
  };

  function selectFolderHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    selectFolder(value);
  };

  function deleteFolderHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    deleteFolder(currentFolder._id);
  };

  function createProjectHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("create project");
    createProject();
  };

  async function downloadProjects(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log("download projects");
    // call to api
    // create blob and download all projects
    try {
      // Get all the projects for the current collection,
      const response = await axios.get(`/api/projects?folderId=${currentFolder._id}`);
      const _projects = await response.data;

      const collectionName = currentFolder.name;
      const projectData = {
        [collectionName]: _projects,
      };

      // then create the json file,
      const filename = `project-maker-${
        collectionName ? collectionName : "all"
      }`;
      const json = JSON.stringify(projectData, null, 2);

      // then create blob to download from json file,
      const blob = new Blob([json], { type: "application/json" });
      const href: string = URL.createObjectURL(blob);

      // then create anchor link with href and click to download,
      // then remove link from DOM.
      const link = document.createElement("a");
      link.href = href;
      link.download = filename + ".json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return (
    <div className={styles.folderList}>
      
      <form className={styles.newFolderForm} onSubmit={createFolderHandler}>
        <TextInput
          inputName={"new-folder"}
          value={newFolder}
          changeHandler={updateNewFolder}
        />
        <button type={"submit"}>
          <CgAddR />
        </button>
      </form>

      <form className={styles.selectFolderForm} onSubmit={deleteFolderHandler}>
        <FolderSelect
          inputName={"folders"}
          value={currentFolder._id}
          options={folders}
          changeHandler={selectFolderHandler}
        />
        <button type={"submit"}>
          <CgTrash />
        </button>
      </form>

      <form className={styles.createProjectForm} onSubmit={createProjectHandler}>
        <h1>
          FOLDER: <span>{currentFolder.name}</span>
        </h1>
        <button type={"submit"}>
          <GoFileMedia />
        </button>
        <button name="download-projects" onClick={downloadProjects}>
          <GoDesktopDownload />
        </button>
      </form>
    </div>
  );
}

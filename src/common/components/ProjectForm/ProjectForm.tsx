import { useState, useEffect } from 'react';
import { TextInput, TextArea, SelectInput, DateInput, PhotoInput, TagInput } from '../Inputs';
import { MdSave, MdDelete, MdClose } from "react-icons/md";
import type { ProjectType, FolderType } from '@/common/types';
import type DateType from '@/common/types/DateType';

import {defaultFolder, defaultProject } from '@/common/defaults';
import styles from '@/styles/components/ProjectForm.module.scss';

type Props = {
  folders: FolderType[],
  project: ProjectType,
  saveProject: Function,
  deleteProject: Function,
  closeProject: Function,
};

export default function ProjectForm({
  folders,
  project,
  saveProject,
  deleteProject,
  closeProject
}: Props) {

  console.log('Project Form', project)

  const [formData, setFormData] = useState<ProjectType>(defaultProject);
  const [newPhoto, setNewPhoto] = useState<string>('');
  const [newTag, setNewTag] = useState<string>('');

  useEffect(() => {
    setFormData(project);
  }, [project]);


  function saveProjectHandler(event: React.FormEvent<HTMLFormElement>) {

  };

  function deleteProjectHandler(event: React.MouseEvent<HTMLButtonElement>) {

  };

  function closeProjectHandler(event: React.MouseEvent<HTMLButtonElement>) {

  };
  
  function updateTextInput(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    const updatedInput = { [name]: value };
    setFormData((formData) => ({
      ...formData,
      ...updatedInput
    }));
  };

  function updateFolder(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.currentTarget;
    const updatedFolderName = { folder_name: name };
    const updatedFolderId = { folder_id: value };
    setFormData((formData) => ({
      ...formData,
      ...updatedFolderName,
      ...updatedFolderId
    }));
  };

  function updateDate(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.currentTarget;
    const currentDate = formData.date;
    if (currentDate) {
      currentDate[name as keyof DateType] = value;
    }

    setFormData((formData) => ({
      ...formData,
      ...currentDate,
    }));
  };

  // Could probably be merged with updateTextInput?
  function updatePhoto(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    setNewPhoto(value);
  };

  function addPhoto(event: React.MouseEvent<HTMLButtonElement>) {
    const { photos } = formData;
    if (newPhoto) {
      if (photos) {
        photos.push(newPhoto);
      }
      setNewPhoto('');
      setFormData((formData) => ({
        ...formData,
        photos: photos,
      }))
    }
  };

  function deletePhoto(event: React.MouseEvent<HTMLButtonElement>) {
    const index = event.currentTarget.getAttribute('data-photo-index');
    const { photos } = formData;
    if (index) {
      if (photos) {
        photos.splice(parseInt(index), 1);
      }
      setFormData((formData) => ({
        ...formData,
        photos: photos,
      }))
    }
  };

  // Could probably be merged with updateTextInput?
  function updateTag(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    setNewTag(value);
  };

  function addTag(event: React.MouseEvent<HTMLButtonElement>) {
    const { tech } = formData;
    if (newTag) {
      if (tech) {
        tech.push(newTag);
      }
      setNewPhoto('');
      setFormData((formData) => ({
        ...formData,
        tech: tech,
      }))
    }
  };

  function deleteTag(event: React.MouseEvent<HTMLButtonElement>) {
    const index = event.currentTarget.getAttribute('data-tag-index');
    const { tech } = formData;
    if (index) {
      if (tech) {
        tech.splice(parseInt(index), 1); // lookup error
      }
      setFormData((formData) => ({
        ...formData,
        tech: tech,
      }))
    };
  };


  return (
    <>

      {
        formData ?
          <form className={styles.projectForm} onSubmit={saveProjectHandler}>

            <div className={styles.formMenu}>
              <h1>NAME: <span>{formData.name}</span></h1>
              <h2>COLLECTION: <span>{formData.folder_name}</span></h2>
              <button type='submit'>
                <MdSave />
              </button>
              <button id={formData._id} onClick={deleteProjectHandler}>
                <MdDelete />
              </button>
              <button onClick={closeProjectHandler}>
                <MdClose />
              </button>
            </div>

            <div className={styles.formRow}>
              <div className={styles.stats}>

                <TextInput
                  inputName={'name'}
                  value={formData.name}
                  changeHandler={updateTextInput}
                />

                <SelectInput
                  inputName={'folders-select'}
                  value={formData.folder_id}
                  options={folders ? folders : []}
                  changeHandler={updateFolder}
                />

                <DateInput
                  className={styles.dateInput}
                  date={formData.date}
                  changeHandler={updateDate}
                />

                <TextInput
                  inputName={'client'}
                  value={formData.client}
                  changeHandler={updateTextInput}
                />
                <TextInput
                  inputName={'client_url'}
                  value={formData.client_url}
                  changeHandler={updateTextInput}
                />
                <TextInput
                  inputName={'github_url'}
                  value={formData.github_url}
                  changeHandler={updateTextInput}
                />
              </div>

              <div className={styles.description}>
                <TextInput
                  inputName={'short'}
                  value={formData.short}
                  changeHandler={updateTextInput}
                />
                <TextArea
                  inputName={'info'}
                  value={formData.info}
                  changeHandler={updateTextInput}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <PhotoInput
                className={styles.photoInput}
                inputName='photos'
                value={newPhoto}
                photos={formData.photos}
                changeHandler={updatePhoto}
                addHandler={addPhoto}
                deleteHandler={deletePhoto}
              />
              <TagInput
                className={styles.tagInput}
                inputName='tags'
                value={newTag}
                tags={formData.tech}
                changeHandler={updateTag}
                addHandler={addTag}
                deleteHandler={deleteTag}
              />
            </div>

          </form>
          : null
      }
    </>
  )
}

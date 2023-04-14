import { useState, useEffect } from 'react';
import { TextInput, TextArea, FolderSelect, DateInput, PhotoInput, TagInput } from '../Inputs';
import { MdSave, MdDelete, MdClose } from "react-icons/md";
import type { ProjectType, FolderType } from '@/common/types';
import type DateType from '@/common/types/DateType';
import styles from '@/styles/components/ProjectForm.module.scss';

type Props = {
  folders: FolderType[],
  project?: ProjectType,
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

  const [formData, setFormData] = useState<ProjectType>();
  const [newPhoto, setNewPhoto] = useState<string>('');
  const [newTag, setNewTag] = useState<string>('');

  useEffect(() => {
    if (project) {
      setFormData(project);
    }
  }, [project]);

  function saveProjectHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveProject(formData);
  };

  function deleteProjectHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log('delete', formData)
    deleteProject(formData ? formData._id : '');
  };

  function closeProjectHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    closeProject();
  };
  
  function updateTextInput(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    const updatedInput = { [name]: value };
    setFormData((formData) => ({
      ...formData,
      ...updatedInput
    }) as ProjectType);
  };

  function updateFolder(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.currentTarget;
    console.log('setting project folder to', name, value);

    for (let i in folders) {
      console.log(folders[i]);
      if (folders[i]._id === value) {
        const updatedFolderId = { folder_id: value };
        const updatedFolderName = { folder_name: folders[i].name };
        setFormData((formData) => ({
          ...formData,
          ...updatedFolderId,
          ...updatedFolderName,
        }) as ProjectType);
      }
    }

  };

  function updateDate(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.currentTarget;
    const currentDate = formData ? formData.date : undefined;

    if (currentDate) {
      currentDate[name as keyof DateType] = value;
    }

    setFormData((formData) => ({
      ...formData,
      ...currentDate,
    }) as ProjectType);
  };

  // Could probably be merged with updateTextInput?
  function updatePhoto(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    setNewPhoto(value);
  };

  function addPhoto(event: React.MouseEvent<HTMLButtonElement>) {
    const photos = formData ? formData.photos : undefined;
    if (newPhoto) {
      if (photos) {
        photos.push(newPhoto);
      }
      setNewPhoto('');
      setFormData((formData) => ({
        ...formData,
        photos: photos,
      }) as ProjectType)
    }
  };

  function deletePhoto(event: React.MouseEvent<HTMLButtonElement>) {
    const index = event.currentTarget.getAttribute('data-photo-index');
    const photos = formData ? formData.photos : undefined;

    if (index) {
      if (photos) {
        photos.splice(parseInt(index), 1);
      }
      setFormData((formData) => ({
        ...formData,
        photos: photos,
      }) as ProjectType)
    }
  };

  // Could probably be merged with updateTextInput?
  function updateTag(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    setNewTag(value);
  };

  function addTag(event: React.MouseEvent<HTMLButtonElement>) {
    const tech = formData ? formData.tech : undefined;

    if (newTag) {
      if (tech) {
        tech.push(newTag);
      }
      setNewTag('');
      setFormData((formData) => ({
        ...formData,
        tech: tech,
      }) as ProjectType)
    }
  };

  function deleteTag(event: React.MouseEvent<HTMLButtonElement>) {
    const index = event.currentTarget.getAttribute('data-tag-index');
    const tech = formData ? formData.tech : undefined;

    if (index) {
      if (tech) {
        tech.splice(parseInt(index), 1); // lookup error
      }
      setFormData((formData) => ({
        ...formData,
        tech: tech,
      }) as ProjectType)
    };
  };

  return (
    <>
      {
        formData ?
          <form className={styles.projectForm} onSubmit={saveProjectHandler}>

            <div className={styles.formMenu}>
              <h2 className={styles.formName}>NAME: <span>{formData.name}</span></h2>
              <h2 className={styles.formCollection}>COLLECTION: <span>{formData.folder_name}</span></h2>

              <button type='submit'>
                <MdSave />
              </button>
              <button onClick={deleteProjectHandler}>
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
                <FolderSelect
                  inputName={'folders'}
                  value={formData.folder_id}
                  options={folders}
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
                inputName='photo url'
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

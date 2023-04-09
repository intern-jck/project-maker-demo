import { useState, useEffect } from 'react';
import { TextInput, TextArea, SelectInput, DateInput, PhotoInput, TagInput } from './Inputs';
import { MdSave, MdDelete, MdClose } from "react-icons/md";

import type ProjectType from '@/common/types/ProjectType';
import type DateType from '@/common/types/DateType';

import styles from '@/styles/components/ProjectForm.module.scss';

type Props = {
  id: string,
  collectionNames: string[],
  project: ProjectType,
  saveProject: Function,
  deleteProject: React.MouseEventHandler,
  closeProject: React.MouseEventHandler,
};

export default function ProjectForm({
  id,
  collectionNames,
  project,
  saveProject,
  deleteProject,
  closeProject
}: Props) {

  // console.log('ProjectFrom', project)

  const [formData, setFormData] = useState<ProjectType>(project);
  const [newPhoto, setNewPhoto] = useState<string>('');
  const [newTag, setNewTag] = useState<string>('');

  useEffect(() => {
    setFormData(project);
  }, [project]);

  function updateTextInput(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    const updatedInput = { [name]: value };
    setFormData((formData) => ({
      ...formData,
      ...updatedInput
    }));
  };

  function updateCollection(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.currentTarget;
    console.log(name, value);
  };

  function updateDate(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.currentTarget;
    console.log(name, value)
    const currentDate = formData.date;
    currentDate[name as keyof DateType] = value;
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
      photos.push(newPhoto);
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
      photos.splice(parseInt(index), 1);
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
      tech.push(newTag);
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
      tech.splice(parseInt(index), 1); // lookup error
      setFormData((formData) => ({
        ...formData,
        tech: tech,
      }))
    };
  };

  // FUNCTIONS
  function saveProjectHandler(event: React.FormEvent) {
    event.preventDefault();
    saveProject(formData);
  };

  return (
    <>
      {
        formData ?
          <form id={styles.form} onSubmit={saveProjectHandler}>

            <div className={styles.formMenu}>
              <h1>NAME: <span>{formData.name}</span></h1>
              <h2>COLLECTION: <span>{formData.collection_name}</span></h2>

              <button type='submit'>
                <MdSave />
              </button>
              <button id={formData._id} onClick={deleteProject}>
                <MdDelete />
              </button>
              <button onClick={closeProject}>
                <MdClose />
              </button>
            </div>
            MdClose
            <div className={styles.formRow}>
              <TextInput
                name={'name'}
                value={formData.name}
                changeHandler={updateTextInput}
              />
              {/* <SelectInput
                name={'collections'}
                value={formData.collection_name}
                options={collectionNames}
                changeHandler={updateCollection}
              /> */}
              {/* <DateInput
                date={formData.date}
                changeHandler={updateDate}
              /> */}
            </div>


          </form>
          : null
      }
    </>
  )
}

import { useState, useEffect } from 'react';
import { TextInput, TextArea, SelectInput, DateInput, PhotoInput, TagInput } from './Inputs';
import { MdSave, MdDelete, MdClose } from "react-icons/md";

import type { ProjectType, CollectionType } from '@/common/types';
import type DateType from '@/common/types/DateType';

import styles from '@/styles/components/ProjectForm.module.scss';

type Props = {
  id: string,
  collections: CollectionType[],
  project: ProjectType,
  saveProject: Function,
  deleteProject: React.MouseEventHandler,
  closeProject: React.MouseEventHandler,
};

export default function ProjectForm({
  id,
  collections,
  project,
  saveProject,
  deleteProject,
  closeProject
}: Props) {

  console.log('Project Form', project.collection_name)

  const [formData, setFormData] = useState<ProjectType>();
  const [newPhoto, setNewPhoto] = useState<string>('');
  const [newTag, setNewTag] = useState<string>('');

  useEffect(() => {
    setFormData(project);
  }, [project]);

  function updateTextInput(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    const updatedInput = { [name]: value };

    // TODO: Google this error....
    setFormData((formData) => ({
      ...formData,
      ...updatedInput
    }));
  };

  function updateCollection(event: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.currentTarget;
    console.log('collection', name, value);
    console.log('current', formData.collection_id);
    const updatedCollectionName = { collection_name: name };
    const updatedCollectionId = { collection_id: value };

    setFormData((formData) => ({
      ...formData,
      ...updatedCollectionName,
      ...updatedCollectionId
    }));


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

            <div className={styles.formRow}>

              <TextInput
                className={styles.textInput}
                inputName={'name'}
                value={formData.name}
                changeHandler={updateTextInput}
              />

              {/* <SelectInput
                className={styles.selectInput}
                inputName={'collections'}
                value={formData.collection_name}
                options={collectionNames}
                changeHandler={updateCollection}
              /> */}

              <select
                className={styles.selectInput}
                name={'collection'}
                onChange={updateCollection}
                value={formData.collection_id}
              >
                <option key={0} value=''>collections</option>
                {
                  collections.map((collection, i) => (
                    <option key={i + 1} value={collection._id} >{collection.name}</option>
                  ))
                }
              </select>

              <DateInput
                className={styles.dateInput}
                date={formData.date}
                changeHandler={updateDate}
              />

            </div>

            <div className={styles.formRow}>

              <div className={styles.links}>
                <TextInput
                  className={styles.textInput}
                  inputName={'client'}
                  value={formData.client}
                  changeHandler={updateTextInput}
                />
                <TextInput
                  className={styles.textInput}
                  inputName={'client_url'}
                  value={formData.client_url}
                  changeHandler={updateTextInput}
                />
                <TextInput
                  className={styles.textInput}
                  inputName={'github_url'}
                  value={formData.github_url}
                  changeHandler={updateTextInput}
                />
              </div>

              <div className={styles.info}>
                <TextInput
                  className={styles.textInput}
                  inputName={'short'}
                  value={formData.short}
                  changeHandler={updateTextInput}
                />
                <TextArea
                  className={styles.textArea}
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

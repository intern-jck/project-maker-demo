import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { TextInput, TextArea, SelectInput, DateInput, PhotoInput, TagInput } from './Inputs';
import { MdSave, MdDelete } from "react-icons/md";
import { fetcher } from '@/common/modules/utils';
import type ProjectType from '@/common/types/ProjectType';
import type DateType from '@/common/types/DateType';
import styles from '@/styles/components/Form.module.scss';

type Props = {
  id: string,
  saveProjectHandler: Function,
  deleteProjectHandler: React.MouseEventHandler,
};

type UpdatedDateType = {
  name: string,
  value: string,
};

const formDefaults: ProjectType = {
  _id: '',
  link: '',

  name: '',
  collection_name: '',
  date: {
    start_month: '',
    start_year: '',
    end_month: '',
    end_year: '',
  },

  client: '',
  client_url: '',
  short: '',
  info: '',

  tech: [],
  photos: [],
  github_url: '',
};

export default function Form({ id, saveProjectHandler, deleteProjectHandler }: Props) {
  const { data, error } = useSWR<ProjectType>(`/api/projects/${id}`, fetcher);

  const [formData, setFormData] = useState<ProjectType>(formDefaults);
  const [newPhoto, setNewPhoto] = useState<string>('');
  const [newTag, setNewTag] = useState<string>('');

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  function updateTextInput(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    const updatedInput = { [name]: value };
    setFormData((formData) => ({
      ...formData,
      ...updatedInput
    }));
  };

  function updateDate(event: React.ChangeEvent<HTMLInputElement>) {
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

  function saveProject(event: React.FormEvent) {
    event.preventDefault();
    saveProjectHandler(formData);
  };

  return (
    <>
      {
        formData ?
          <form className={styles.form} onSubmit={saveProject}>

            <div className={styles.formMenu}>
              <h1>NAME: {formData.name}</h1>
              <h2>ID: {formData._id}</h2>
              <button type='submit'>
                <MdSave size={40} />
              </button>
              <button onClick={deleteProjectHandler} data-project-id={id}>
                <MdDelete size={40} />
              </button>
            </div>

            <div className={styles.formRow}>
              <TextInput
                name={'name'}
                value={formData.name}
                changeHandler={updateTextInput}
              />
              <TextInput
                name={'collection'}
                value={formData.collection_name}
                changeHandler={updateTextInput}
              />
              <DateInput
                date={formData.date}
                changeHandler={updateDate}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formCol}>
                <TextInput
                  name={'client'}
                  value={formData.client}
                  changeHandler={updateTextInput}
                />
                <TextInput
                  name={'client_url'}
                  value={formData.client_url}
                  changeHandler={updateTextInput}
                />
                <TextInput
                  name={'github_url'}
                  value={formData.github_url}
                  changeHandler={updateTextInput}
                />
              </div>
              <div className={styles.formCol}>
                <TextInput
                  name={'short'}
                  value={formData.short}
                  changeHandler={updateTextInput}
                />
                <TextArea
                  name={'info'}
                  value={formData.info}
                  changeHandler={updateTextInput}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              {/* <PhotoInput
                name='photos'
                value={newPhoto}
                photos={formData.photos}
                changeHandler={updatePhoto}
                addHandler={addPhoto}
                deleteHandler={deletePhoto}
              /> */}
              {/* <TagInput
                name='tags'
                value={newTag}
                tags={formData.tech}
                changeHandler={updateTag}
                addHandler={addTag}
                deleteHandler={deleteTag}
              /> */}
            </div>
          </form>
          : null
      }
    </>
  )
}

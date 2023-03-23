import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/common/modules/utils';
import { TextInput, TextArea, DateInput, PhotoInput, TagInput } from './Inputs';

import type ProjectType from '@/common/types/ProjectType';

import styles from '@/styles/components/Form.module.scss';

const TEST_PHOTO_URL = 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg';

type Props = {
  id: string,
  saveHandler: Function,
  deleteHandler: Function,

};

type DateType = {
  start_month: string | '',
  start_year: string | '',
  end_month: string | '',
  end_year: string | '',
}

const formDefaults: ProjectType = {
  _id: '',
  link: '',

  name: '',
  category: '',
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
}

export default function Form({ id, saveHandler }: Props) {

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
    // TODO format date to create a single string?
    // setFormData((formData) => ({
    //   ...formData,
    //   date: date,
    // }));
  };

  // Could probably be merged with updateTextInput?
  function updatePhoto(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    setNewPhoto(value);
  };

  function addPhoto(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
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
    event.preventDefault();
    const index = event.currentTarget.getAttribute('data-photo-index');
    const { photos } = formData;
    if (index) {
      photos.splice(index, 1);
      setFormData((formData) => ({
        ...formData,
        photos: photos,
      }))
    }

  };

  function updateTag(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    setNewTag(value);
  };

  function addTag(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    const { tech } = formData;
    console.log(tech)
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
    event.preventDefault();
    const index = event.currentTarget.getAttribute('data-tag-index');
    const { tech } = formData;
    console.log('delete tag', index)

    if (index) {
      tech.splice(index, 1);
      setFormData((formData) => ({
        ...formData,
        tech: tech,
      }))
    }

  };

  function updateProject(event: React.FormEvent) {
    event.preventDefault();
    console.log(formData);
    saveHandler(formData);
  }

  return (
    <>
      {
        formData ?
          <form className={styles.form} onSubmit={updateProject}>
            <button type='submit'>SAVE</button>

            <h2>PROJECT: {formData.name}</h2>

            <div className={styles.formRow}>
              <TextInput
                name={'name'}
                value={formData.name}
                changeHandler={updateTextInput}
              />
              <TextInput
                name={'category'}
                value={formData.category}
                changeHandler={updateTextInput}
              />
              <DateInput
                date={formData.date}
                dateHandler={updateDate}
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
              <PhotoInput
                name='photos'
                value={newPhoto}
                photos={formData.photos}
                changeHandler={updatePhoto}
                addHandler={addPhoto}
                deleteHandler={deletePhoto}
              />
              <TagInput
                name='tags'
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

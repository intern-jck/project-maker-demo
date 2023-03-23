import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/common/modules/utils';
import { TextInput, TextArea, DateInput, PhotoInput } from './Inputs';

import type ProjectType from '@/common/types/ProjectType';

import styles from '@/styles/components/Form.module.scss';

const TEST_PHOTO_URL = 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg';

type Props = {
  id: string
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

export default function Form({ id }: Props) {

  const { data, error } = useSWR<ProjectType>(`/api/projects/${id}`, fetcher);

  const [formData, setFormData] = useState<ProjectType>(formDefaults);
  const [newPhoto, setNewPhoto] = useState<string>('');

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
    console.log(name, value, formData.photos)
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
    console.log('delete photo')
  }

  return (
    <>
      {
        formData ?
          <form className={styles.form}>

            <h2>PROJECT: {formData.name}</h2>

            {/* <div className={styles.formRow}>
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

            </div> */}

            <div className={styles.formRow}>
              <PhotoInput
                name='photo-input'
                value={newPhoto}
                photos={formData.photos}
                changeHandler={updatePhoto}
                addHandler={addPhoto}
                deleteHandler={deletePhoto}
              />
            </div>

          </form>
          : null
      }
    </>
  )

}

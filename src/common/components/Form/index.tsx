import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/common/modules/utils';
import { TextInput, TextArea, DateInput } from './inputs';
import type ProjectType from '@/common/types/ProjectType';
import styles from '@/styles/Form.module.scss';

type Props = {
  id: string
};

export default function Form({ id }: Props) {

  const { data, error } = useSWR<ProjectType>(`/api/projects/${id}`, fetcher);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const formDefaults: ProjectType = {
    _id: data?._id,
    link: data?.link,

    name: data?.name,
    category: data?.category,
    date: {
      start_month: data?.date.start_month,
      start_year: data?.date.start_year,
      end_month: data?.date.end_month,
      end_year: data?.date.end_year,
    },

    client: data?.client,
    client_url: data?.client_url,
    short: data?.short,
    info: data?.info,

    tech: data?.tech,
    photos: data?.photos,
    github_url: data?.github_url,

  }

  const [formData, setFormData] = useState<ProjectType>(formDefaults);

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


  return (
    <>
      {
        formData ?
          <form className={styles.form}>
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
              TECH AND PHOTOS
            </div>

          </form>
          : null
      }
    </>
  )

}

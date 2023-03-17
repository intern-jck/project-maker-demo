import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/common/modules/utils';
import { TextInput } from './inputs';
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
    category: data?.category,
    name: data?.name,
    github_url: data?.github_url,
    link: data?.link,
    client: data?.client,
    client_url: data?.client_url,
    date: {
      start_month: data?.date.start_month,
      start_year: data?.date.start_year,
      end_month: data?.date.end_month,
      end_year: data?.date.end_year,
    },
    short: data?.short,
    info: data?.info,
    tech: data?.tech,
    photos: data?.photos,
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

  return (
    <>
      {
        formData ?
          <form className={styles.form}>
            FORM
            <TextInput
              name={'name'}
              value={formData.name}
              changeHandler={updateTextInput}
            />
          </form>
          : null
      }
    </>
  )
}


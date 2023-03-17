import useSWR from 'swr';
import { fetcher } from '@/common/modules/utils';
import type ProjectType from '@/common/types/ProjectType';
import { TextInput } from './inputs';
import styles from '@/styles/Form.module.scss';


type Props = {
  id: string
}
export default function Form({ id }: Props) {
  console.log('form', id)
  const { data, error } = useSWR<ProjectType[]>(`/api/projects/${id}`, fetcher);

  console.log(id, data)

  return (
    <form className={styles.form}>
      FORM
      <TextInput />
    </form>
  )
}


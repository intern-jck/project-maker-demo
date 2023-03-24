import { CgFolder } from 'react-icons/cg';
import styles from '@/styles/components/Folder.module.scss';

type Props = {
  id: string,
  name: string,
  clickHandler: React.MouseEventHandler
}

export default function Folder({ clickHandler, id, name }: Props) {
  return (
    <div className={styles.folder}>
      <button
        onClick={clickHandler}
        data-proj-id={id}
      >
        <CgFolder />
        <span>{name}</span>
      </button>
    </div>
  );

};

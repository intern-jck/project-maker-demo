import { CgFolder } from 'react-icons/cg';
import styles from '@/styles/Folder.module.scss';

type Props = {
  id: number,
  name: string,
  clickHandler: Function
}

export default function Folder({ clickHandler, id, name }: Props) {

  return (
    <div className={styles.Folder}>
      <button
        // onClick={clickHandler}
        data-proj-id={id}
      >
        <CgFolder
          className={styles.folderIcon}
        />
        <span>{name}</span>
      </button>
    </div>
  );

};

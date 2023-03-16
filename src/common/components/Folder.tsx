import { CgFolder } from 'react-icons/cg';
import styles from '@/styles/Folder.module.scss';

type Props = {
  id: number,
  name: string,
  clickHandler: React.MouseEventHandler<HTMLButtonElement>
}
// { clickHandler, id, name }: Props
export default function Folder() {

  return (
    <div className={styles.Folder}>
      <button
      // onClick={clickHandler}
      // data-proj-id={id}
      >
        <CgFolder
          className={styles.folderIcon}
        />
        {/* <span>{name}</span> */}
      </button>
    </div>
  );

};

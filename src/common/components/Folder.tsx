import { CgFolder } from 'react-icons/cg';
import styles from '@/styles/components/Folder.module.scss';

type Props = {
  id: string,
  name: string,
  clickHandler: React.MouseEventHandler
};

export default function Folder({ id, name, clickHandler }: Props) {
  return (
    <div className={styles.folder}>
      <button
        name={id}
        value={id}
        onClick={clickHandler}
      >
        <CgFolder />
        <span>{name}</span>
      </button>
    </div>
  );
};

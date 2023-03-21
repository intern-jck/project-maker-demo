import styles from '@/styles/components/Menu.module.scss';
import { GoFileMedia, GoDesktopDownload } from "react-icons/go";

type Props = {
  createHandler: React.MouseEventHandler<HTMLButtonElement>,
  downloadHandler: React.MouseEventHandler<HTMLButtonElement>
};

export default function Menu({ createHandler, downloadHandler }: Props) {

  return (
    <div className={styles.Menu}>
      <button onClick={createHandler} className='onclick'>
        {/* NEW */}
        <GoFileMedia size={30} />
      </button>
      <button onClick={downloadHandler} className='onclick'>
        {/* DOWNLOAD */}
        <GoDesktopDownload size={30} />
      </button>
    </div>
  );
};

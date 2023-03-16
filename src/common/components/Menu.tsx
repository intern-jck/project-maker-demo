import styles from '@/styles/Menu.module.scss';

type Props = {
  createHandler: React.MouseEventHandler<HTMLButtonElement>,
  downloadHandler: React.MouseEventHandler<HTMLButtonElement>
};

export default function Menu({ createHandler, downloadHandler }: Props) {

  return (
    <div className={styles.Menu}>
      <button onClick={createHandler} className='onclick'>
        NEW
      </button>
      <button onClick={downloadHandler} className='onclick'>
        DOWNLOAD
      </button>
    </div>
  );
};

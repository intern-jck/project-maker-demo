import Folder from './Folder';
import { GoFileMedia, GoDesktopDownload } from "react-icons/go";
import styles from '@/styles/components/Dashboard.module.scss';
import type ProjectType from '@/common/types/ProjectType';
import type CollectionType from '@/common/types/CollectionType';

type Props = {
  currentCollection: CollectionType,
  projects: ProjectType[],
  clickHandler: React.MouseEventHandler,
  createHandler: React.MouseEventHandler,
  downloadHandler: React.MouseEventHandler,
};

export default function Dashboard({
  currentCollection,
  projects,
  clickHandler,
  createHandler,
  downloadHandler,
}: Props) {
  return (
    <div className={styles.dashboard}>
      <div className={styles.controls}>
        <h2>{currentCollection.name}</h2>
        {/* New Project Button */}
        <button onClick={createHandler} className='onclick'>
          <GoFileMedia size={40} />
        </button>
        {/* Download Collection JSON */}
        <button onClick={downloadHandler} className='onclick'>
          <GoDesktopDownload size={40} />
        </button>
      </div>

      {/* Project Folder List */}
      {
        projects ?
          projects.map((project, i) => {
            return (
              <Folder
                key={project._id}
                id={project._id}
                clickHandler={clickHandler}
                name={project.name}
              />
            )
          })
          : null
      }
    </div>
  );
};

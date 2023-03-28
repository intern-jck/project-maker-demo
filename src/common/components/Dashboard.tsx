import { GoFileMedia, GoDesktopDownload } from "react-icons/go";
import Folder from './Folder';
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
        {/* Project Name */}
        <h2>{currentCollection.name}</h2>
        {/* New Project Button */}
        <button onClick={createHandler} className='onclick'>
          <GoFileMedia size={30} />
        </button>
        {/* Download Project Data Button */}
        <button onClick={downloadHandler} className='onclick'>
          <GoDesktopDownload size={30} />
        </button>
      </div>

      {/* Project Folder List */}
      {
        currentCollection && projects ?
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

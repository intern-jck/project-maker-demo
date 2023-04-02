import { GoFileMedia, GoDesktopDownload } from "react-icons/go";
import Folder from './Folder';
import type ProjectType from '@/common/types/ProjectType';
import styles from '@/styles/components/ProjectList.module.scss';

function clickHandlerTest(event: React.MouseEvent<HTMLButtonElement>) {
  const { name, value } = event.currentTarget;
  console.log(name, value);
};

type Props = {
  collectionName: string,
  projects: ProjectType[],
  createProjectHandler: React.MouseEventHandler,
  selectProjectHandler: React.MouseEventHandler
};

export default function ProjectList({
  collectionName,
  projects,
  createProjectHandler,
  selectProjectHandler,
}: Props) {

  return (
    <div className={styles.projectList}>

      {/* Create/Download Projects */}
      <div className={styles.projectControls}>
        <h2>{collectionName}</h2>
        <button
          onClick={createProjectHandler}>
          <GoFileMedia size={30} />
        </button>
        <button
          name={'download'}
          onClick={clickHandlerTest}>
          <GoDesktopDownload size={30} />
        </button>
      </div>

      {/* Project Folder List */}
      <div className={styles.projects}>
        {
          projects.length > 0 ?
            projects.map((project, i) => {
              return (
                <Folder
                  key={project._id}
                  id={project._id}
                  clickHandler={selectProjectHandler}
                  name={project.name}
                />
              )
            })
            : null
        }
      </div>
    </div>
  );
};

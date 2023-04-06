import { GoFileMedia, GoDesktopDownload } from "react-icons/go";
import Folder from './Folder';
import type { CollectionType, ProjectType } from '@/common/types';
import styles from '@/styles/components/Projects.module.scss';
import { clickHandlerTest } from '@/common/modules/utils';

type Props = {
  currentCollection: CollectionType,
  projects: ProjectType[],
  selectProject: React.MouseEventHandler,
  createProject: React.MouseEventHandler,
};

export default function Projects({
  currentCollection,
  projects,
  selectProject,
  createProject
}: Props) {

  return (
    <div className={styles.projects}>

      {/* Create/Download Projects */}
      <div className={styles.projectControls}>

        <h2>{currentCollection.name ? currentCollection.name : 'ALL'}</h2>

        {/* <div className={styles.buttons}> */}
        <button name='create-project' onClick={createProject}>
          <GoFileMedia />
        </button>
        <button name='download-projects' onClick={clickHandlerTest}>
          <GoDesktopDownload />
        </button>
        {/* </div> */}
      </div>

      {/* Project Folder List */}
      <div className={styles.projectsList}>
        {
          projects.length > 0 ?
            projects.map((project, i) => {
              return (
                <Folder
                  key={project._id}
                  id={project._id}
                  name={project.name}
                  clickHandler={selectProject}
                />
              )
            })
            : null
        }
      </div>

    </div>
  );
};
